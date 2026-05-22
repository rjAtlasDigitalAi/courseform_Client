import React, { useState, useEffect } from 'react';

// Configure target date here (e.g., '2026-06-21T15:35:00').
// By default, it dynamically sets the target to exactly 30 days from now.
const TARGET_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(TARGET_DATE) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { expired: true };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.expired) {
    return (
      <div className="text-center py-6 px-4 animate-bounce">
        <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-orange-deep bg-orange-light/30 border border-orange-light py-4 px-6 rounded-2xl inline-block shadow-md">
          🎉 Registration is Now Open!
        </h3>
      </div>
    );
  }

  const formatNumber = (num) => String(num).padStart(2, '0');

  const units = [
    { label: 'Days', value: timeLeft.days ?? 0 },
    { label: 'Hours', value: timeLeft.hours ?? 0 },
    { label: 'Minutes', value: timeLeft.minutes ?? 0 },
    { label: 'Seconds', value: timeLeft.seconds ?? 0 },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {units.map((unit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border-t-4 border-orange flex flex-col justify-center items-center py-4 sm:py-6 px-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-black tabular-nums tracking-tight">
              {formatNumber(unit.value)}
            </span>
            <span className="font-body text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1 sm:mt-2 text-center">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
