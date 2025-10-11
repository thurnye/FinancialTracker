const USER_KEY = 'donation_user';

export function saveUser(user: any) {
  console.log('[Storage] saveUser called with:', user);
  // Only save non-sensitive user profile data (username, avatar, preferences)
  // Never store passwords or tokens here
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('[Storage] User successfully saved to localStorage');
  } catch (error) {
    console.error('[Storage] Error saving user to localStorage:', error);
  }
}

export function getUser() {
  try {
    const data = localStorage.getItem(USER_KEY);
    console.log('[Storage] getUser - raw data from localStorage:', data);
    const parsed = data ? JSON.parse(data) : null;
    console.log('[Storage] getUser - parsed data:', parsed);
    return parsed;
  } catch (error) {
    console.error('[Storage] Error reading user from localStorage:', error);
    return null;
  }
}

export function clearUserStorage() {
  console.log('[Storage] ⚠️⚠️⚠️ clearUserStorage called!');
  console.log('[Storage] Current localStorage BEFORE clear:', localStorage.getItem(USER_KEY));
  console.trace('[Storage] Stack trace:'); // Show where this was called from

  // Clear user profile data
  localStorage.removeItem(USER_KEY);
  console.log('[Storage] ✅ User data removed from localStorage');
  console.log('[Storage] localStorage AFTER clear:', localStorage.getItem(USER_KEY));

  // Note: Tokens are NOT in localStorage anymore
  // - Access token is in memory (cleared on page reload)
  // - Refresh token is in HttpOnly cookie (cleared by backend)

  // Clear any other app-specific data if needed
  // localStorage.removeItem('other_key');
}
