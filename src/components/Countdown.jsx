import React, { useState, useEffect } from 'react';

export default function Countdown() {
  // 5 minute countdown
  const COUNTDOWN_TIME = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(() => {
    // persist timer even after refresh
    const savedEndTime = localStorage.getItem("offerEndTime");

    if (savedEndTime) {
      const remaining = Math.floor((+savedEndTime - Date.now()) / 1000);
      return remaining > 0 ? remaining : COUNTDOWN_TIME;
    }

    const newEndTime = Date.now() + COUNTDOWN_TIME * 1000;
    localStorage.setItem("offerEndTime", newEndTime);

    return COUNTDOWN_TIME;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // restart automatically
          const newEndTime = Date.now() + COUNTDOWN_TIME * 1000;
          localStorage.setItem("offerEndTime", newEndTime);
          return COUNTDOWN_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <p className="text-red-500 font-bold uppercase tracking-widest text-xs sm:text-sm animate-pulse">
          ⚡ Limited Time Registration Closing Soon
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds },
        ].map((unit, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl border-t-4 border-orange flex flex-col justify-center items-center py-6 px-4 transition-all duration-300 hover:scale-105"
          >
            <span className="font-heading text-5xl sm:text-6xl font-black text-black tabular-nums">
              {formatNumber(unit.value)}
            </span>

            <span className="font-body text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mt-2">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-xs sm:text-sm text-gray-500">
          Hurry! Seats are filling fast.
        </p>
      </div>
    </div>
  );
}
