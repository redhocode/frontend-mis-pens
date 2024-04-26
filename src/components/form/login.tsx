/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Impor useRouter untuk pengalihan
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Komponen Login
export default function Login() {
  useRouter();
  // Mengambil informasi sesi saat ini

  return (
    <section>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-3xl font-bold text-center text-primary">
            Welcome
          </h1>
          <p className="mb-8 font-medium text-center text-slate-800">
            Login dulu cuy
          </p>
          <div className="flex flex-wrap shadow-md px-5 py-5 justify-center">
            <div className="">
              <form
                onSubmit={async (event) => {
                  event.preventDefault(); // Hindari pengiriman formulir langsung
                  const formData = new FormData(
                    event.target as HTMLFormElement
                  ); // Tambahkan tipe HTMLFormElement
                  const credentials = {
                    username: formData.get("username") as string,
                    password: formData.get("password") as string,
                  };

                  try {
                    await signIn("credentials", {
                      ...credentials,
                      callbackUrl: "/dashboard", // Tentukan URL tujuan setelah login berhasil
                    });
                  } catch (error) {
                    console.error("Gagal masuk:", error);
                  }
                }}
              >
                <Input
                  className="w-full mt-4"
                  name="username"
                  placeholder="Username"
                  type="text"
                />
                <Input
                  className="w-full mt-4"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <Button className="w-full mt-4">Login</Button>
              </form>
            </div>
            <div>
              <img
                className="pl-5 mt-4"
                src="https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-300x98.png"
                alt=""
                width="300"
                height="126"
                srcSet="https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-300x98.png 300w, https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-768x251.png 768w, https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ.png 840w"
                sizes="(max-width: 386px) 100vw, 386px"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
