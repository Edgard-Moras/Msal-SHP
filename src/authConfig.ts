
export const msalConfig = {
  auth: {
    clientId: `${import.meta.env.VITE_APP_CLIENTE_ID}`, // App registrada en Azure    //
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_APP_TENANT_ID}`,  
    redirectUri: "http://localhost:5173",
  },
};

export const loginRequest = {
  // // scopes: [
  // //   "User.Read",
  // //   // "AllSites.Manage",
  // //   //  "User.Read.All"
  // // ],
  scopes: [`https://${import.meta.env.VITE_APP_TENANT_HOSTNAME}.sharepoint.com/.default`],
};
