import { supabase } from "client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const WithAuth = ({ children }) => {
  const [auth, setAuth] = useState(true);

  const navigate = useNavigate();

  const getUser = async () => {
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
      setAuth(true);
    } else {
      setAuth(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return auth ? children : <></>;
};

export default WithAuth;
