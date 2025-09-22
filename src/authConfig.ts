
export const msalConfig = {
  auth: {
    clientId: `${import.meta.env.VITE_APP_CLIENTE_ID}`, // App registrada en Azure    //
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_APP_TENANT_ID}`,  
    redirectUri: "https://ltfb.sharepoint.com/sites/tacama/SitePages/App.aspx",
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
