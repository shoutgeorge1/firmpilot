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
    onPersist: null
  };
})(window);
