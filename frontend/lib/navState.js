// Next.js's router has no equivalent of react-router's `navigate(to, { state })`.
// Pages that used to hand off an in-memory object (e.g. an unsaved invoice draft)
// via router state now stash it here, keyed by the id used in the destination URL,
// and the destination page reads it once (falling back to a server fetch otherwise).
const PREFIX = "navstate:";

export function setNavState(id, data) {
  if (!id) return;
  try {
    sessionStorage.setItem(`${PREFIX}${id}`, JSON.stringify(data));
  } catch {
    /* ignore storage errors */
  }
}

export function getNavState(id) {
  if (!id) return null;
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${id}`);
    if (!raw) return null;
    sessionStorage.removeItem(`${PREFIX}${id}`);
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
