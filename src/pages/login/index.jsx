import React from "react";

import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { Controller, useForm } from "react-hook-form";

import Input from "common/components/input";
import Button from "common/components/button";

import { userState } from "state/atom/user";

import { supabase } from "client";

import "./login.css";

const Login = () => {
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values?.email,
      password: values?.password,
    });

    const { data: user } = await supabase
      .from("agents")
      .select("*")
      .eq("id", data?.user?.id)
      .single();

    if (user) {
      setUser(user);
      navigate("/properties");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center px-4">
      <form
        className="w-full max-w-[500px] space-y-6 rounded-md bg-white p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src="/assets/icons/logo.svg" />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input label="Email" placeholder="test@email.com" {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input label="Šifra" placeholder="*********" type="password" {...field} />
          )}
        />
        <Button type="submit">Uloguj se</Button>
      </form>
    </div>
  );
};

export default Login;
