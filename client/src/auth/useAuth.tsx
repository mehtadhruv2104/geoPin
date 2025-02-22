
import { useState, useEffect, useRef } from "react";
import { client, initKeycloak, getAuthState } from "./keycloak"

const useAuth = () => {
  const [isLogin, setLogin] = useState(getAuthState().isLogin);
  const [token, setToken] = useState<string | undefined>(getAuthState().token);
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    initKeycloak().then((authenticated) => {
      setLogin(authenticated);
      setToken(client.token);
    });
  }, []);

  return { isLogin, token };
};

export default useAuth;
