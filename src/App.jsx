import React, { useEffect, useState } from 'react';
import Countdown from './components/Countdown';

import RegistrationForm from './components/RegistrationForm';

// Easily editable configurations
const INSTITUTION_NAME = "EduPrime Institute";
const INSTITUTION_HANDLE = "eduprime";

export default function App() {

  // =========================
  // MOBILE LEAD COUNTDOWN
  // =========================
  const COUNTDOWN_TIME = 5 * 60; // 5 minutes

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = localStorage.getItem("mobileLeadTimer");

    if (savedEndTime) {
      const remaining = Math.floor((+savedEndTime - Date.now()) / 1000);

      if (remaining > 0) {
        return remaining;
      }
    }

    const newEndTime = Date.now() + COUNTDOWN_TIME * 1000;
    localStorage.setItem("mobileLeadTimer", newEndTime);

    return COUNTDOWN_TIME;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const newEndTime = Date.now() + COUNTDOWN_TIME * 1000;
          localStorage.setItem("mobileLeadTimer", newEndTime);

          return COUNTDOWN_TIME;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // FADE IN OBSERVER
  // =========================
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const animElements = document.querySelectorAll('.fade-in-section');

    animElements.forEach((el) => observer.observe(el));

    return () => {
      animElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleScrollToForm = () => {
    const formElement = document.getElementById('registration-panel');

    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // =========================
  // TIMER FORMAT
  // =========================
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const format = (num) => String(num).padStart(2, "0");

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col relative overflow-x-hidden selection:bg-orange-light/50">

      {/* HEADER */}
  

      {/* MAIN CONTAINER */}
      <div className="w-full flex flex-col md:flex-row relative bg-white flex-grow">

        {/* LEFT PANEL - HIDDEN ON MOBILE */}
        <section className="hidden md:flex md:w-1/2 min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] md:sticky md:top-20 p-6 sm:p-12 md:p-16 flex-col justify-between bg-gradient-to-br from-[#FFF8F3] via-white to-[#FFF0E5] relative overflow-hidden border-gray-100">

          {/* BACKGROUND BLOBS */}
          <div className="absolute -top-12 -left-12 w-64 h-64 sm:w-80 sm:h-80 bg-orange-light/20 rounded-full filter blur-3xl animate-blob-1 pointer-events-none z-0"></div>

          <div className="absolute -bottom-16 -right-16 w-80 h-80 sm:w-96 sm:h-96 bg-orange/10 rounded-full filter blur-3xl animate-blob-2 pointer-events-none z-0"></div>

          {/* CONTENT */}
          <div className="my-auto py-6 max-w-[480px] mx-auto w-full relative z-10 flex flex-col gap-6 sm:gap-8 justify-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-light/35 border border-orange-light/45 text-orange-deep font-body text-xs font-semibold uppercase tracking-wider w-max ">
              🎓 Admissions Open For 2026
            </div>

         

            {/* DESKTOP COUNTDOWN */}
            <div className="w-full">
              <p className="font-body text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Registration Window Closes In:
              </p>

              <Countdown />
            </div>

         
          </div>
        </section>

        {/* DIVIDER */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange/20 to-transparent z-20 pointer-events-none"></div>

        {/* RIGHT PANEL */}
        <section
          id="registration-panel"
          className="w-full md:w-1/2 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] bg-white flex flex-col justify-center py-8 sm:py-20 px-4 sm:px-12 md:px-16 lg:px-20 relative z-10"
        >

          {/* MOBILE LEAD COUNTDOWN */}
          <div className="md:hidden mb-5">
            <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 via-white to-orange-50 px-4 py-3 shadow-sm">

              

              <div className="flex items-center justify-between gap-3">

                {/* LEFT TEXT */}
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-500">
                    HIGH DEMAND
                  </span>

                  <span className="text-sm font-bold text-gray-900 mt-1">
                    Only 3 seats remaining
                  </span>

                  <span className="text-[11px] text-gray-500 mt-1">
                    17 students viewing this form now
                  </span>
                </div>

                {/* TIMER */}
                <div className="flex items-center gap-1.5 shrink-0">

                  <div className="bg-gray-900 text-white rounded-lg px-2 py-1 min-w-[42px] text-center shadow">
                    <div className="text-lg font-black leading-none">
                      {format(minutes)}
                    </div>

                    <div className="text-[9px] uppercase opacity-70">
                      Min
                    </div>
                  </div>

                  <span className="font-black text-gray-400 text-lg">:</span>

                  <div className="bg-orange text-white rounded-lg px-2 py-1 min-w-[42px] text-center shadow">
                    <div className="text-lg font-black leading-none">
                      {format(seconds)}
                    </div>

                    <div className="text-[9px] uppercase opacity-70">
                      Sec
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="fade-in-section mx-auto w-full flex flex-col justify-center h-full gap-5 sm:gap-6">

            <div className="w-full">
              <RegistrationForm />
            </div>

          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-gray-900 text-gray-400 py-10 border-t border-gray-800 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">

          <div className="flex items-center gap-2">

            <span className="font-heading font-extrabold text-white tracking-tight leading-tight">

              <span className="text-base">
                RJ ATLAS DIGITAL AI
              </span>

              <br />

              <span className="text-[11px] font-medium tracking-wide opacity-80">
                Thalassery
              </span>

            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
