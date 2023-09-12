const ACCESS_TOKEN = "ACCESS_TOKEN";

// mange access token
export const setAccessToken = (accessToken: any) => localStorage.setItem(ACCESS_TOKEN, accessToken);
export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
