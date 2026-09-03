// Detects a new deploy and force-reloads so an iPhone "Add to Home Screen"
// icon (which sits behind Safari's aggressive disk cache and has no
// pull-to-refresh) doesn't keep serving a stale build indefinitely.
const CURRENT_BUILD = typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : null;

function checkForUpdate() {
  if (!CURRENT_BUILD) return;
  fetch(`/version.json?_=${Date.now()}`, { cache: "no-store" })
    .then(res => (res.ok ? res.json() : null))
    .then(data => {
      if (data && data.buildTime && data.buildTime !== CURRENT_BUILD) {
        const url = new URL(window.location.href);
        url.searchParams.set("_reload", Date.now().toString());
        window.location.replace(url.toString());
      }
    })
    .catch(() => {});
}

export function startVersionCheck() {
  checkForUpdate();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForUpdate();
  });
  window.addEventListener("pageshow", checkForUpdate);
}
