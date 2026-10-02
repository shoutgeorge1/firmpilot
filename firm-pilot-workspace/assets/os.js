/* FirmPilot Director OS — shared helpers (local only) */
(function (global) {
  "use strict";

  /* Primary destinations stay lean. Deep modules live under Future. */
  var PRIMARY = [
    { id: "command", href: "../index.html", label: "Director OS", rootHref: "index.html" },
    { id: "playbook", href: "index.html", label: "Playbook" },
    { id: "meeting", href: "../meeting-guide/", label: "Meeting Guide", rootHref: "meeting-guide/" }
  ];

  var FUTURE = [
    { id: "access", href: "access.html", label: "Access" },
    { id: "prestart", href: "prestart.html", label: "Pre-Start" },
    { id: "radar", href: "radar.html", label: "Radar" },
    { id: "dossier", href: "dossier.html", label: "Dossier" },
    { id: "audit", href: "audit.html", label: "Audit" },
    { id: "turnaround", href: "turnaround.html", label: "Turnaround" },
    { id: "tracking", href: "tracking.html", label: "Tracking" },
    { id: "coaching", href: "coaching.html", label: "Coaching" },
    { id: "productization", href: "productization.html", label: "Productization" }
  ];

  function pathDepth() {
    var path = (location.pathname || "").replace(/\\/g, "/");
    return /\/paid-media-os(\/|$)/.test(path) ? "module" : "root";
  }

  function resolveHref(item, depth) {
    if (depth === "root") {
      if (item.rootHref) return item.rootHref;
      if (item.id === "command") return "index.html";
      if (item.id === "meeting") return "meeting-guide/";
      if (item.href.indexOf("../") === 0) return item.href.replace("../", "");
      return "paid-media-os/" + item.href;
    }
    if (item.id === "command") return "../index.html";
    if (item.id === "meeting") return "../meeting-guide/";
    return item.href;
  }

  function injectNav(activeId) {
    var el = document.getElementById("os-nav");
    if (!el) return;
    var depth = pathDepth();
    if (el.getAttribute("data-depth") === "root") depth = "root";
    if (el.getAttribute("data-depth") === "module") depth = "module";

    var html = '<div class="brand">Private · Director OS</div><div class="nav-title">FirmPilot</div>';
    PRIMARY.forEach(function (item) {
      var href = resolveHref(item, depth);
      var cls = item.id === activeId ? ' class="active"' : "";
      html += '<a href="' + href + '"' + cls + ">" + item.label + "</a>";
    });

    var futureOpen = FUTURE.some(function (f) { return f.id === activeId; });
    html += '<details class="future-mods"' + (futureOpen ? " open" : "") + ">";
    html += "<summary>Future Modules</summary>";
    FUTURE.forEach(function (item) {
      var href = resolveHref(item, depth);
      var cls = item.id === activeId ? ' class="active"' : "";
      html += '<a href="' + href + '"' + cls + ">" + item.label + "</a>";
    });
    html += "</details>";

    el.innerHTML = html;
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

  function healthClass(status) {
    var s = (status || "unknown").toLowerCase();
    if (s === "healthy") return "ok";
    if (s === "watch") return "warn";
    if (s === "action" || s === "action required") return "warn";
    if (s === "critical") return "bad";
    return "accent";
  }

  global.FirmPilotOS = {
    injectNav: injectNav,
    bindLocalPersistence: bindLocalPersistence,
    bindAccordions: bindAccordions,
    loadStore: loadStore,
    saveStore: saveStore,
    healthClass: healthClass,
    pathDepth: pathDepth
  };
})(window);
