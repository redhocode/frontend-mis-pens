"use client";
import React, { useEffect, useState } from "react";
import { useFetchUsers } from "@/features/useFetchData";
import { User } from "@/types";
import { useRouter } from "next/navigation";

const Welcome = () => {
  // State untuk menyimpan informasi pengguna
 const [user, setUser] = useState<string | null>(null);
 const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Ambil informasi pengguna dari penyimpanan lokal saat komponen dimuat
    const username = localStorage.getItem("username");
    setUser(username);
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  return (
    <section>
      <div className="flex items-center justify-center">
        <div className=" w-full max-h-screen">
          <div className="flex flex-wrap shadow-lg px-4 py-4 justify-center">
            <div className="outline outline-2 outline-secondary px-4 py-4 rounded-sm">
              <h1 className="mb-2 text-3xl font-bold text-center text-primary">
                Welcome, {user}
              </h1>
              <p className="text-center font-medium">Role: {role}</p>
              <p className="mb-8 font-medium text-center text-slate-800">
                You are logged in!
              </p>
              {/* Your dashboard content here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
