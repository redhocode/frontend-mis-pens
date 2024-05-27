"use client";
import React, { useEffect, useState } from "react";
const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text">Logout</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};
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
          <div className="flex flex-wrap shadow-lg px-4 py-4 justify-between">
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
            {/* <div className="justify-end flex">
              <CountdownCircleTimer
                isPlaying
                duration={1800}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[10, 6, 3, 0]}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
