import { supabase } from "client";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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

  return <Outlet />;
};

export default WithAuth;
