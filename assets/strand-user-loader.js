/* ═══════════════════════════════════════════════════════════════
   STRAND User Loader — reads localStorage and populates
   window.STRAND_PERSON before shell/app scripts run.
   If no user data exists, redirects to onboard.html.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

(function loadUserPerson() {
  const STORAGE_KEY = 'strand-user-person';

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    /* No genome loaded — send to onboarding */
    window.location.replace('onboard.html');
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (_err) {
    /* Corrupted data — clear and restart */
    localStorage.removeItem(STORAGE_KEY);
    window.location.replace('onboard.html');
    return;
  }

  if (!parsed || typeof parsed !== 'object' || !parsed.id) {
    localStorage.removeItem(STORAGE_KEY);
    window.location.replace('onboard.html');
    return;
  }

  window.STRAND_PERSON = parsed;
})();
