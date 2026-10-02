/* FirmPilot Director OS — admin shell helpers (local only) */
(function (global) {
  "use strict";

  var PRIMARY = [
    { id: "dashboard", href: "index.html", label: "Dashboard", rootHref: "index.html" },
    { id: "first10", href: "first-10.html", label: "First 10", rootHref: "first-10.html" },
    { id: "accounts", href: "accounts.html", label: "Accounts", rootHref: "accounts.html" },
    { id: "conversions", href: "conversions.html", label: "Conversions", rootHref: "conversions.html" },
    { id: "meetings", href: "meetings.html", label: "Meetings", rootHref: "meetings.html" },
    { id: "reference", href: "reference.html", label: "Reference", rootHref: "reference.html" },
    { id: "setup", href: "setup.html", label: "Setup", rootHref: "setup.html" }
  ];

  var FUTURE = [
    { id: "access", href: "paid-media-os/access.html", label: "Access map", moduleHref: "access.html" },
    { id: "prestart", href: "paid-media-os/prestart.html", label: "Pre-Start", moduleHref: "prestart.html" },
    { id: "radar", href: "paid-media-os/radar.html", label: "Radar", moduleHref: "radar.html" },
    { id: "dossier", href: "paid-media-os/dossier.html", label: "Dossier", moduleHref: "dossier.html" },
    { id: "audit", href: "paid-media-os/audit.html", label: "Audit", moduleHref: "audit.html" },
    { id: "turnaround", href: "paid-media-os/turnaround.html", label: "Turnaround", moduleHref: "turnaround.html" },
    { id: "tracking", href: "paid-media-os/tracking.html", label: "Tracking", moduleHref: "tracking.html" },
    { id: "coaching", href: "paid-media-os/coaching.html", label: "Coaching", moduleHref: "coaching.html" },
    { id: "productization", href: "paid-media-os/productization.html", label: "Productization", moduleHref: "productization.html" },
    { id: "playbook", href: "paid-media-os/index.html", label: "Full playbook", moduleHref: "index.html" },
    { id: "meeting-full", href: "meeting-guide/", label: "Full meeting guide", moduleHref: "../meeting-guide/" }
  ];

  function pathDepth() {
    var path = (location.pathname || "").replace(/\\/g, "/");
    if (/\/paid-media-os(\/|$)/.test(path)) return "module";
    if (/\/meeting-guide(\/|$)/.test(path)) return "meeting";
    return "root";
  }

  function resolveHref(item, depth) {
    if (depth === "module") {
      if (item.moduleHref) return item.moduleHref;
      if (item.id === "meeting-full") return "../meeting-guide/";
      return "../" + (item.rootHref || item.href);
    }
    if (depth === "meeting") {
      if (item.id === "meeting-full") return "./";
      if (item.moduleHref && item.href.indexOf("paid-media-os/") === 0) {
        return "../" + item.href;
      }
      return "../" + (item.rootHref || item.href);
    }
    return item.rootHref || item.href;
  }

  function injectNav(activeId) {
    var el = document.getElementById("os-nav");
    if (!el) return;
    var depth = pathDepth();
    if (el.getAttribute("data-depth") === "root") depth = "root";
    if (el.getAttribute("data-depth") === "module") depth = "module";
    if (el.getAttribute("data-depth") === "meeting") depth = "meeting";

    var html = '<div class="brand">Private · Director</div><div class="nav-title">FirmPilot OS</div>';
    PRIMARY.forEach(function (item) {
      var href = resolveHref(item, depth);
      var cls = item.id === activeId ? ' class="active"' : "";
      html += '<a href="' + href + '"' + cls + ">" + item.label + "</a>";
    });

    var futureOpen = FUTURE.some(function (f) { return f.id === activeId; });
    html += '<details class="future-mods"' + (futureOpen ? " open" : "") + ">";
    html += "<summary>More</summary>";
    FUTURE.forEach(function (item) {
      var href = resolveHref(item, depth);
      var cls = item.id === activeId ? ' class="active quiet"' : ' class="quiet"';
      html += '<a href="' + href + '"' + cls + ">" + item.label + "</a>";
    });
    html += "</details>";

    el.innerHTML = html;
    bindMobileNav();
  }

  function bindMobileNav() {
    var nav = document.getElementById("os-nav");
    if (!nav) return;
    var btn = document.getElementById("navToggle");
    var backdrop = document.getElementById("navBackdrop");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.id = "navToggle";
      btn.className = "nav-toggle";
      btn.setAttribute("aria-label", "Menu");
      btn.textContent = "Menu";
      document.body.appendChild(btn);
    }
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "navBackdrop";
      backdrop.className = "nav-backdrop";
      document.body.appendChild(backdrop);
    }
    function close() {
      nav.classList.remove("open");
      backdrop.classList.remove("show");
    }
    function open() {
      nav.classList.add("open");
      backdrop.classList.add("show");
    }
    btn.onclick = function () {
      if (nav.classList.contains("open")) close();
      else open();
    };
    backdrop.onclick = close;
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  function storageKey(ns) {
    return "firmpilot-director-os-" + (ns || "default");
  }

  function loadStore(ns) {
    try {
      var raw = localStorage.getItem(storageKey(ns));
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveStore(ns, data) {
    localStorage.setItem(storageKey(ns), JSON.stringify(data));
  }

  function bindLocalPersistence(ns, statusSelector) {
    var statusEl = statusSelector ? document.querySelector(statusSelector) : null;
    var data = loadStore(ns);
    var timer = null;

    function applyBadge(el) {
      el.classList.remove("unknown", "healthy", "warning", "broken", "confirmed", "requested");
      el.classList.add(el.value || "unknown");
    }

    document.querySelectorAll("[data-note]").forEach(function (el) {
      if (Object.prototype.hasOwnProperty.call(data.notes || {}, el.id)) el.value = data.notes[el.id] || "";
      el.addEventListener("input", schedule);
      el.addEventListener("change", schedule);
    });
    document.querySelectorAll('input[type="checkbox"][id]').forEach(function (el) {
      if (data.checks && Object.prototype.hasOwnProperty.call(data.checks, el.id)) el.checked = !!data.checks[el.id];
      el.addEventListener("change", schedule);
    });
    document.querySelectorAll("[data-badge]").forEach(function (el) {
      var key = el.getAttribute("data-for") || el.id;
      if (data.badges && Object.prototype.hasOwnProperty.call(data.badges, key)) el.value = data.badges[key];
      applyBadge(el);
      el.addEventListener("change", function () { applyBadge(el); schedule(); });
    });
    document.querySelectorAll("[data-select-persist]").forEach(function (el) {
      if (data.selects && Object.prototype.hasOwnProperty.call(data.selects, el.id)) el.value = data.selects[el.id];
      el.addEventListener("change", schedule);
    });

    function collect() {
      var out = { notes: {}, checks: {}, badges: {}, selects: {} };
      document.querySelectorAll("[data-note]").forEach(function (el) { out.notes[el.id] = el.value; });
      document.querySelectorAll('input[type="checkbox"][id]').forEach(function (el) { out.checks[el.id] = el.checked; });
      document.querySelectorAll("[data-badge]").forEach(function (el) {
        out.badges[el.getAttribute("data-for") || el.id] = el.value;
      });
      document.querySelectorAll("[data-select-persist]").forEach(function (el) {
        out.selects[el.id] = el.value;
      });
      return out;
    }

    function schedule() {
      if (statusEl) {
        statusEl.textContent = "Saving…";
        statusEl.classList.remove("saved");
      }
      clearTimeout(timer);
      timer = setTimeout(function () {
        try {
          saveStore(ns, collect());
          if (statusEl) {
            statusEl.textContent = "Saved locally · " + new Date().toLocaleTimeString();
            statusEl.classList.add("saved");
          }
          if (typeof global.FirmPilotOS.onPersist === "function") {
            global.FirmPilotOS.onPersist(ns, collect());
          }
        } catch (e) {
          if (statusEl) statusEl.textContent = "Save failed";
        }
      }, 250);
    }

    return { collect: collect, schedule: schedule, reload: function () { location.reload(); } };
  }

  function bindAccordions() {
    var panels = Array.from(document.querySelectorAll("details.panel[data-panel]"));
    panels.forEach(function (panel) {
      panel.addEventListener("toggle", function () {
        if (!panel.open) return;
        var group = panel.getAttribute("data-accordion");
        if (!group) return;
        panels.forEach(function (other) {
          if (other !== panel && other.getAttribute("data-accordion") === group) other.open = false;
        });
      });
    });
    var btn = document.getElementById("btnCollapseAll");
    if (btn) btn.addEventListener("click", function () {
      panels.forEach(function (p) { p.open = false; });
    });
  }

  function bindExclusiveDetails(selector) {
    var root = document.querySelector(selector);
    if (!root) return;
    root.addEventListener("toggle", function (e) {
      var t = e.target;
      if (!t.matches || !t.matches("details") || !t.open) return;
      root.querySelectorAll("details").forEach(function (d) {
        if (d !== t && d.parentElement === t.parentElement) d.open = false;
      });
    }, true);
  }

  function healthClass(status) {
    var s = (status || "unknown").toLowerCase();
    if (s === "healthy") return "ok";
    if (s === "watch") return "warn";
    if (s === "action" || s === "action required") return "warn";
    if (s === "critical") return "bad";
    return "accent";
  }

  function updateFirst10Progress() {
    var bar = document.getElementById("f10Progress");
    var meta = document.getElementById("f10ProgressMeta");
    if (!bar && !meta) return;
    var store = loadStore("director-first10");
    var checks = store.checks || {};
    var ids = ["f10_1", "f10_2", "f10_3", "f10_4", "f10_5", "f10_6", "f10_7", "f10_8", "f10_9", "f10_10"];
    var done = ids.filter(function (id) { return !!checks[id]; }).length;
    var pct = Math.round((done / ids.length) * 100);
    if (bar) bar.style.width = pct + "%";
    if (meta) meta.textContent = done + " / 10 stages";
  }

  /* —— Guided operating map —— */
  var STATUS_META = {
    "not-started": { label: "Not started", cls: "st-not" },
    "in-progress": { label: "In progress", cls: "st-progress" },
    waiting: { label: "Waiting", cls: "st-waiting" },
    blocked: { label: "Blocked", cls: "st-blocked" },
    ready: { label: "Ready", cls: "st-ready" },
    done: { label: "Done", cls: "st-done" }
  };

  var MAP_NS = "director-map";
  var MAP_TREE = {
    id: "firmpilot",
    label: "FirmPilot",
    role: "Director OS",
    children: [
      { id: "acct-mgmt", label: "Account Management", role: "Client ops", status: "not-started" },
      {
        id: "perf-mkt",
        label: "Performance Marketing",
        role: "George · Assoc Dir · Performance team",
        priority: true,
        children: [
          { id: "portfolio", label: "Portfolio", role: "Pilot selection", link: "accounts.html" },
          {
            id: "first-10",
            label: "First 10",
            role: "Prove the OS",
            priority: true,
            link: "first-10.html",
            children: [
              {
                id: "access",
                label: "Access",
                role: "Systems + owners",
                priority: true,
                link: "setup.html",
                children: [
                  { id: "acc-mcc", label: "Ads / MCC", role: "Google Ads", editable: true },
                  { id: "acc-call", label: "Call platform", role: "DNI · pools", editable: true },
                  { id: "acc-crm", label: "CRM", role: "Intake truth", editable: true },
                  { id: "acc-gtm", label: "GTM / GA4", role: "Tracking stack", editable: true },
                  { id: "acc-lp", label: "LP / deploy", role: "Pages · host", editable: true },
                  { id: "acc-tools", label: "Internal tools", role: "Editor · dashboards", editable: true }
                ]
              },
              { id: "baseline", label: "Baseline", role: "Google vs business" },
              { id: "signal", label: "Signal", role: "Conversions ladder", link: "conversions.html" },
              { id: "tracking", label: "Tracking", role: "IDs · DNI · forms" },
              { id: "campaign", label: "Campaign", role: "Structure · copy" },
              { id: "bidding", label: "Bidding", role: "Only after signal" },
              { id: "scale", label: "Scale", role: "Repeat winners" }
            ]
          },
          { id: "measurement", label: "Measurement", role: "Ladder · match", link: "conversions.html" },
          { id: "campaigns", label: "Campaigns", role: "Later" },
          { id: "landing", label: "Landing Pages", role: "Later" },
          { id: "automation", label: "Automation", role: "After signal" }
        ]
      },
      { id: "product-ops", label: "Product Ops", role: "Delivery systems", status: "not-started" },
      { id: "eng-ai", label: "Engineering / AI", role: "Underneath", status: "not-started" }
    ]
  };

  function findNode(id, node) {
    node = node || MAP_TREE;
    if (node.id === id) return node;
    var kids = node.children || [];
    for (var i = 0; i < kids.length; i++) {
      var hit = findNode(id, kids[i]);
      if (hit) return hit;
    }
    return null;
  }

  function pathToNode(id, node, trail) {
    node = node || MAP_TREE;
    trail = trail || [];
    var next = trail.concat([node]);
    if (node.id === id) return next;
    var kids = node.children || [];
    for (var i = 0; i < kids.length; i++) {
      var hit = pathToNode(id, kids[i], next);
      if (hit) return hit;
    }
    return null;
  }

  function defaultAccessStatuses() {
    return {
      "acc-mcc": "waiting",
      "acc-call": "waiting",
      "acc-crm": "waiting",
      "acc-gtm": "waiting",
      "acc-lp": "not-started",
      "acc-tools": "not-started"
    };
  }

  function mapState() {
    var data = loadStore(MAP_NS);
    if (!data.view) data.view = "firmpilot";
    if (!data.statuses) data.statuses = defaultAccessStatuses();
    if (!data.activity) data.activity = [];
    if (!data.accessRequested) data.accessRequested = false;
    return data;
  }

  function saveMapState(data) {
    saveStore(MAP_NS, data);
  }

  function deriveStatuses(data) {
    var setup = loadStore("director-setup");
    var f10 = loadStore("director-first10");
    var checks = setup.checks || {};
    var fchecks = f10.checks || {};
    var st = Object.assign({}, defaultAccessStatuses(), data.statuses || {});

    if (checks.ax_mcc) st["acc-mcc"] = "ready";
    if (checks.ax_call) st["acc-call"] = "ready";
    if (checks.ax_crm) st["acc-crm"] = "ready";
    if (checks.ax_gtm) st["acc-gtm"] = "ready";
    if (checks.ax_email) st["acc-tools"] = st["acc-tools"] === "not-started" ? "in-progress" : st["acc-tools"];

    if (fchecks.f10_1) st.access = "done";
    else {
      var accessKids = ["acc-mcc", "acc-call", "acc-crm", "acc-gtm", "acc-lp", "acc-tools"];
      var waiting = accessKids.some(function (k) { return st[k] === "waiting"; });
      var readyN = accessKids.filter(function (k) { return st[k] === "ready" || st[k] === "done"; }).length;
      if (readyN >= 4) st.access = "ready";
      else if (waiting || data.accessRequested) st.access = "waiting";
      else st.access = "in-progress";
    }

    var stageMap = {
      baseline: "f10_3",
      signal: "f10_4",
      tracking: "f10_7",
      campaign: "f10_8",
      bidding: "f10_9",
      scale: "f10_10"
    };
    Object.keys(stageMap).forEach(function (k) {
      st[k] = fchecks[stageMap[k]] ? "done" : (st.access === "done" || st.access === "ready" ? "not-started" : "blocked");
    });
    if (fchecks.f10_2) st.portfolio = "done";
    else if (st.access === "ready" || st.access === "done") st.portfolio = "ready";
    else st.portfolio = "blocked";

    st["first-10"] = fchecks.f10_1 && fchecks.f10_2 ? "in-progress" : (st.access === "waiting" ? "waiting" : "in-progress");
    if (["f10_1","f10_2","f10_3","f10_4","f10_5","f10_6","f10_7","f10_8","f10_9","f10_10"].every(function (id) { return !!fchecks[id]; })) {
      st["first-10"] = "done";
    }
    st["perf-mkt"] = st["first-10"] === "done" ? "done" : "in-progress";
    st.measurement = fchecks.f10_4 ? "done" : (st.access === "blocked" ? "blocked" : "not-started");
    st.campaigns = "not-started";
    st.landing = "not-started";
    st.automation = "not-started";
    st["acct-mgmt"] = "not-started";
    st["product-ops"] = "not-started";
    st["eng-ai"] = "not-started";
    st.firmpilot = "in-progress";
    st.george = "ready";
    return st;
  }

  function statusOf(node, statuses) {
    if (node.status) return node.status;
    return statuses[node.id] || "not-started";
  }

  function priorityIdForView(viewId, statuses) {
    if (viewId === "firmpilot") return "perf-mkt";
    if (viewId === "perf-mkt") return "first-10";
    if (viewId === "first-10") return "access";
    if (viewId === "access") {
      var order = ["acc-mcc", "acc-call", "acc-crm", "acc-gtm", "acc-lp", "acc-tools"];
      for (var i = 0; i < order.length; i++) {
        var s = statuses[order[i]];
        if (s === "waiting" || s === "in-progress" || s === "not-started" || s === "blocked") return order[i];
      }
      return "acc-mcc";
    }
    return null;
  }

  function computeWhatNow(viewId, statuses, data) {
    var mcc = statuses["acc-mcc"];
    var access = statuses.access;
    var whereLabel = (findNode(viewId) || MAP_TREE).label;
    var rule = null;
    var reasonHref = null;

    if (viewId === "signal" || viewId === "measurement") {
      rule = "Primary trains bidding. Soft call length ≠ auto-primary until proven.";
      reasonHref = "reference.html#ladder";
    }

    if (data.accessRequested && (mcc === "waiting" || access === "waiting")) {
      return {
        where: whereLabel + " · Access",
        done: "Access request sent",
        waiting: "MCC · Call · CRM · GTM",
        next: "No action today · wait",
        ignore: "Campaigns · bidding · rebuild",
        rule: rule || "Follow up only after the date you set — don’t poke live ads.",
        reasonHref: reasonHref
      };
    }

    if (mcc === "ready" || mcc === "done") {
      return {
        where: "Performance Marketing · Portfolio",
        done: "MCC available",
        waiting: statusLine(statuses, ["acc-call", "acc-crm", "acc-gtm"]),
        next: "Open portfolio · pick pilots",
        ignore: "Don’t change campaigns yet",
        rule: rule,
        reasonHref: reasonHref
      };
    }

    if (viewId === "access" || viewId === "first-10" || viewId === "perf-mkt" || viewId === "firmpilot") {
      return {
        where: "First 10 · Access",
        done: data.accessRequested ? "Request logged" : "—",
        waiting: statusLine(statuses, ["acc-mcc", "acc-call", "acc-crm", "acc-gtm"]),
        next: data.accessRequested ? "Wait · follow up later" : "Request access · map owners",
        ignore: "Automation · Smart Bidding tweaks",
        rule: rule,
        reasonHref: reasonHref
      };
    }

    var node = findNode(viewId);
    return {
      where: whereLabel,
      done: statuses[viewId] === "done" ? "Stage complete" : "—",
      waiting: access === "waiting" ? "Upstream access" : "—",
      next: node && node.link ? "Open " + node.label : "Stay on path",
      ignore: "Side quests",
      rule: rule,
      reasonHref: reasonHref
    };
  }

  function statusLine(statuses, ids) {
    var parts = [];
    ids.forEach(function (id) {
      var n = findNode(id);
      var s = statuses[id];
      if (!n || s === "ready" || s === "done") return;
      parts.push(n.label.split(" / ")[0].split(" ")[0]);
    });
    return parts.length ? parts.join(" · ") : "—";
  }

  function pushActivity(text, data) {
    data = data || mapState();
    data.activity = data.activity || [];
    data.activity.unshift({ t: new Date().toISOString(), text: text });
    if (data.activity.length > 40) data.activity = data.activity.slice(0, 40);
    saveMapState(data);
    return data;
  }

  function fmtTime(iso) {
    try {
      var d = new Date(iso);
      return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  }

  function renderActivity(data) {
    var list = document.getElementById("alogList");
    if (!list) return;
    var rows = data.activity || [];
    list.innerHTML = rows.slice(0, 12).map(function (row) {
      return "<li><span class=\"t\">" + fmtTime(row.t) + "</span>" + escapeHtml(row.text) + "</li>";
    }).join("");
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderWhatNow(viewId, statuses, data) {
    var wn = computeWhatNow(viewId, statuses, data);
    setText("wnWhere", wn.where);
    setText("wnDone", wn.done);
    setText("wnWaiting", wn.waiting);
    setText("wnNext", wn.next);
    setText("wnIgnore", wn.ignore);
    var ruleEl = document.getElementById("wnRule");
    var reasonEl = document.getElementById("wnReason");
    if (ruleEl) {
      if (wn.rule) {
        ruleEl.hidden = false;
        ruleEl.textContent = wn.rule;
      } else {
        ruleEl.hidden = true;
        ruleEl.textContent = "";
      }
    }
    if (reasonEl) {
      if (wn.reasonHref) {
        reasonEl.hidden = false;
        reasonEl.href = wn.reasonHref;
      } else {
        reasonEl.hidden = true;
      }
    }
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function renderCrumbs(trail) {
    var el = document.getElementById("mapCrumbs");
    if (!el) return;
    var html = "";
    trail.forEach(function (node, i) {
      if (i > 0) html += '<span class="sep">/</span>';
      if (i === trail.length - 1) {
        html += '<span class="here">' + escapeHtml(node.label) + "</span>";
      } else {
        html += '<a href="#" data-drill="' + node.id + '">' + escapeHtml(node.label) + "</a>";
      }
    });
    el.innerHTML = html;
  }

  function nodeButtonHtml(node, statuses, priorityId, opts) {
    opts = opts || {};
    var st = statusOf(node, statuses);
    var meta = STATUS_META[st] || STATUS_META["not-started"];
    var classes = ["node"];
    if (node.id === priorityId) classes.push("priority");
    else if (priorityId) classes.push("dimmed");
    if (node.children && node.children.length) classes.push("has-children");
    if (opts.leaf) classes.push("leaf");
    var role = node.role ? '<span class="node-role">' + escapeHtml(node.role) + "</span>" : "";
    var statusHtml = '<span class="node-status ' + meta.cls + '">' + meta.label + "</span>";
    if (node.editable) {
      statusHtml = '<select class="node-status-select" data-status-for="' + node.id + '" onclick="event.stopPropagation()">' +
        Object.keys(STATUS_META).map(function (key) {
          var m = STATUS_META[key];
          return '<option value="' + key + '"' + (st === key ? " selected" : "") + ">" + m.label + "</option>";
        }).join("") +
        "</select>";
    }
    return (
      '<button type="button" class="' + classes.join(" ") + '" data-node="' + node.id + '" role="treeitem">' +
      (opts.kicker ? '<span class="node-kicker">' + escapeHtml(opts.kicker) + "</span>" : "") +
      '<span class="node-label">' + escapeHtml(node.label) + "</span>" +
      role +
      statusHtml +
      "</button>"
    );
  }

  function renderMap() {
    var data = mapState();
    var viewId = data.view || "firmpilot";
    var node = findNode(viewId) || MAP_TREE;
    var trail = pathToNode(node.id) || [MAP_TREE];
    var statuses = deriveStatuses(data);
    var priorityId = priorityIdForView(viewId, statuses);
    var canvas = document.getElementById("mapCanvas");
    var anchor = document.getElementById("georgeAnchor");
    if (!canvas) return;

    setText("mapTitle", node.label);
    var chip = document.getElementById("mapPhaseChip");
    if (chip) {
      var phase = statuses.access === "waiting" ? "Waiting on access" : "Pre-start";
      chip.textContent = phase;
    }
    var meta = document.getElementById("mapMeta");
    if (meta) {
      meta.textContent = node.children && node.children.length
        ? "Click a node to drill · priority highlighted"
        : "Leaf view · set status or open linked screen";
    }

    renderCrumbs(trail);
    if (anchor) {
      anchor.hidden = viewId !== "firmpilot" && viewId !== "perf-mkt";
    }

    var kids = node.children || [];
    var html = "";
    if (trail.length > 1) {
      var parent = trail[trail.length - 2];
      html += '<div class="map-parent-echo"><span class="echo-label">' + escapeHtml(parent.label) +
        '</span><span class="echo-arrow">→</span><span class="echo-label">' + escapeHtml(node.label) + "</span></div>";
    }

    if (kids.length) {
      html += '<div class="map-row with-connectors"><div class="map-connector-bar" aria-hidden="true"></div>';
      kids.forEach(function (child) {
        html += nodeButtonHtml(child, statuses, priorityId, {});
      });
      html += "</div>";
    } else {
      html += '<div class="map-row">' + nodeButtonHtml(node, statuses, node.id, { leaf: true }) + "</div>";
    }

    if (viewId === "access") {
      html += '<div class="access-actions">' +
        '<button type="button" class="ghost" id="btnAccessRequested">Mark access requested</button>' +
        '<a class="chip primary" href="setup.html">Setup checklist →</a>' +
        '<a class="chip" href="paid-media-os/access.html">Deep access map →</a>' +
        "</div>";
    }
    if (node.link && viewId !== "firmpilot") {
      html += '<div class="access-actions"><a class="chip primary" href="' + node.link + '">Open ' +
        escapeHtml(node.label) + " screen →</a></div>";
    }

    canvas.innerHTML = html;
    renderWhatNow(viewId, statuses, data);
    renderActivity(data);
    bindMapInteractions();
  }

  function bindMapInteractions() {
    var canvas = document.getElementById("mapCanvas");
    var crumbs = document.getElementById("mapCrumbs");

    function drillTo(id) {
      var data = mapState();
      var target = findNode(id);
      if (!target) return;
      data.view = id;
      saveMapState(data);
      pushActivity(
        (target.children && target.children.length ? "Drilled → " : "View → ") + target.label,
        data
      );
      renderMap();
    }

    if (canvas) {
      canvas.querySelectorAll("[data-node]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          drillTo(btn.getAttribute("data-node"));
        });
      });
      canvas.querySelectorAll("[data-status-for]").forEach(function (sel) {
        sel.addEventListener("change", function () {
          var data = mapState();
          data.statuses = data.statuses || {};
          data.statuses[sel.getAttribute("data-status-for")] = sel.value;
          saveMapState(data);
          var n = findNode(sel.getAttribute("data-status-for"));
          pushActivity((n ? n.label : "Item") + " → " + (STATUS_META[sel.value] || {}).label, data);
          renderMap();
        });
      });
      var req = document.getElementById("btnAccessRequested");
      if (req) {
        req.addEventListener("click", function () {
          var data = mapState();
          data.accessRequested = true;
          ["acc-mcc", "acc-call", "acc-crm", "acc-gtm"].forEach(function (k) {
            if (!data.statuses) data.statuses = defaultAccessStatuses();
            if (data.statuses[k] === "not-started") data.statuses[k] = "waiting";
          });
          saveMapState(data);
          pushActivity("Access request marked · waiting on systems", data);
          renderMap();
        });
      }
    }

    if (crumbs) {
      crumbs.querySelectorAll("[data-drill]").forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          drillTo(a.getAttribute("data-drill"));
        });
      });
    }

    var george = document.getElementById("nodeGeorge");
    if (george && !george._bound) {
      george._bound = true;
      george.addEventListener("click", function () {
        var data = mapState();
        data.view = "perf-mkt";
        saveMapState(data);
        pushActivity("George → Performance Marketing", data);
        renderMap();
      });
    }
  }

  function initOperatingMap() {
    if (!document.getElementById("mapCanvas")) return;
    var data = mapState();
    if (!data.activity || !data.activity.length) {
      data.activity = [
        { t: new Date().toISOString(), text: "Operating map opened · pre-start" }
      ];
      saveMapState(data);
    }

    var form = document.getElementById("alogForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = document.getElementById("alogInput");
        var text = (input && input.value || "").trim();
        if (!text) return;
        pushActivity(text);
        if (input) input.value = "";
        renderMap();
      });
    }
    var clear = document.getElementById("alogClear");
    if (clear) {
      clear.addEventListener("click", function () {
        var d = mapState();
        d.activity = [];
        saveMapState(d);
        renderMap();
      });
    }

    renderMap();
  }

  global.FirmPilotOS = {
    injectNav: injectNav,
    bindLocalPersistence: bindLocalPersistence,
    bindAccordions: bindAccordions,
    bindExclusiveDetails: bindExclusiveDetails,
    bindMobileNav: bindMobileNav,
    loadStore: loadStore,
    saveStore: saveStore,
    healthClass: healthClass,
    pathDepth: pathDepth,
    updateFirst10Progress: updateFirst10Progress,
    initOperatingMap: initOperatingMap,
    onPersist: null
  };
})(window);
