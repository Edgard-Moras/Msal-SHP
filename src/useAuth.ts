import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

export function useAuth() {
  const { instance, accounts } = useMsal();

  const login = async () => {
    await instance.loginPopup(loginRequest);
  };

  const logout = () => {
    instance.logoutPopup();
  };

  const getToken = async (): Promise<string | null> => {
    console.log("Accounts:", accounts);
    if (accounts.length > 0) {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      return response.accessToken;
    }
    return null;
  };

  return { login, logout, getToken, account: accounts[0] };
}
