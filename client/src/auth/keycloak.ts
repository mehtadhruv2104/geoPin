import Keycloak from "keycloak-js";

const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENTID,
});

let isInitialized = false;
let authState = {
  isLogin: false,
  token: undefined as string | undefined,
};

const initKeycloak = () => {

    if (isInitialized) return Promise.resolve(authState.isLogin);
  
    return client
        .init({ onLoad: "login-required" })
        .then((authenticated) => {
        isInitialized = true;
        authState.isLogin = authenticated;
        authState.token = client.token;
        return authenticated;
        })
        .catch((error) => {
        console.error("Keycloak init failed:", error);
        throw error;
        });
};

const logout = () => {
  client.logout({ redirectUri: window.location.origin });
  authState.isLogin = false;
  authState.token = undefined;
};


const getAuthState = () => authState;

export { client, initKeycloak, logout, getAuthState };