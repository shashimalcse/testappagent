export const AUTH_STATE_KEY = 'hotel_auth_state'

export const setAuthState = (state: boolean) => {
  localStorage.setItem(AUTH_STATE_KEY, String(state))
}

export const getAuthState = () => {
  return localStorage.getItem(AUTH_STATE_KEY) === 'true'
}

export const clearAuthState = () => {
  localStorage.removeItem(AUTH_STATE_KEY)
}
