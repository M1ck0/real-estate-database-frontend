import React from "react";

import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { Controller, useForm } from "react-hook-form";

import Input from "common/components/input";
import Button from "common/components/button";

import { userState } from "state/atom/user";
import { supabase } from "client";

const Login = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values?.email,
      password: values?.password,
    });

    if (error) {
      setError("password", { message: "Pogrešan email ili šifra." });
      return;
    }

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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-[400px]">
        {/* Logo / brand */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="mb-4 h-10 w-auto"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dobrodošli nazad
          </h1>
          <p className="mt-1 text-sm text-slate-500">Ulogujte se u vaš nalog</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <form className="divide-y divide-slate-100" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 px-6 py-6">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Email adresa"
                    placeholder="vas@email.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      label="Šifra"
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                    {errors?.password && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="px-6 py-4">
              <Button type="submit" loading={isSubmitting} style={{ width: "100%" }}>
                Uloguj se
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Real Estate CRM © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Login;
