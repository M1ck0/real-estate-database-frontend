import React from "react";

import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";

import { userState } from "state/atom/user";

// import { GET_ME } from "api/query/get-me";

const WithAuth = ({ children }) => {
  const setUser = useSetRecoilState(userState);

  const { loading } = useQuery("query", {
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      const data = d?.me;

      if (data?.id) {
        setUser(data);
      } else {
        navigate("/login");
      }
    },
    onError: (e) => {
      navigate("/login");
    },
  });

  const navigate = useNavigate();

  return <>{!loading ? children : null}</>;
};

export default WithAuth;
