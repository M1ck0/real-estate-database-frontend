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
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values?.email,
      password: values?.password,
    });

    if (error) return;

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
    <div className="flex min-h-screen bg-slate-50">
      {/* Left panel – brand */}
      <div className="hidden flex-1 flex-col items-center justify-center bg-teal-700 px-12 lg:flex">
        <div className="max-w-sm text-center">
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <img
              src="/assets/icons/logo.svg"
              alt="Logo"
              className="h-9 w-9"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white">Real Estate</h1>
          <p className="text-base leading-relaxed text-teal-100">
            Upravljajte nekretninama i klijentima na jednom mjestu.
          </p>
        </div>
        <div className="absolute bottom-8 text-xs text-teal-300/70">
          © {new Date().getFullYear()} Real Estate
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <img
              src="/assets/icons/logo.svg"
              alt="Logo"
              className="mb-3 h-10 w-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <h1 className="text-xl font-semibold text-slate-900">Real Estate</h1>
          </div>

          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold text-slate-900">Dobrodošli nazad</h2>
            <p className="mt-1 text-sm text-slate-500">Ulogujte se u vaš nalog</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
                <Input
                  label="Šifra"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full"
              style={{ width: "100%" }}
            >
              Uloguj se
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
