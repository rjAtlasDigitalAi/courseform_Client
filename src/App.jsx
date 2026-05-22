import React, { useEffect } from 'react';
import Countdown from './components/Countdown';
import SocialLinks from './components/SocialLinks';
import RegistrationForm from './components/RegistrationForm';

// Easily editable configurations
const INSTITUTION_NAME = "EduPrime Institute";

const INSTITUTION_HANDLE = "eduprime";

export default function App() {

  // Smooth scroll fade-in observer
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

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col relative overflow-x-hidden selection:bg-orange-light/50">

      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange to-orange-deep flex items-center justify-center text-white font-heading font-black text-xl shadow-md shadow-orange/20">
              EP
            </div>

            <span className="font-heading font-extrabold text-lg sm:text-xl text-gray-900 tracking-tight">
              {INSTITUTION_NAME}
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleScrollToForm}
            className="bg-orange hover:bg-orange-deep text-white font-heading font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm active:scale-95"
          >
            Register Now
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
     {/* MAIN CONTAINER */}
<div className="w-full flex flex-col md:flex-row relative bg-white flex-grow">

  {/* LEFT PANEL */}
  <section className="hidden md:flex md:w-1/2 min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] md:sticky md:top-20 p-6 sm:p-12 md:p-16 flex-col justify-between bg-gradient-to-br from-[#FFF8F3] via-white to-[#FFF0E5] relative overflow-hidden border-gray-100">

    {/* Background Blobs */}
    <div className="absolute -top-12 -left-12 w-64 h-64 sm:w-80 sm:h-80 bg-orange-light/20 rounded-full filter blur-3xl animate-blob-1 pointer-events-none z-0"></div>

    <div className="absolute -bottom-16 -right-16 w-80 h-80 sm:w-96 sm:h-96 bg-orange/10 rounded-full filter blur-3xl animate-blob-2 pointer-events-none z-0"></div>

    {/* Content */}
    <div className="my-auto py-6 max-w-[480px] mx-auto w-full relative z-10 flex flex-col gap-6 sm:gap-8 justify-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-light/35 border border-orange-light/45 text-orange-deep font-body text-xs font-semibold uppercase tracking-wider w-max animate-pulse">
        🎓 Admissions Open For 2026
      </div>

      {/* Heading */}
      <h1 className="font-heading text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
        Welcome to <br />

        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-deep">
          {INSTITUTION_NAME}
        </span>
      </h1>

      {/* Desktop Countdown */}
      <div className="w-full">
        <p className="font-body text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Registration Window Closes In:
        </p>

        <Countdown />
      </div>

      {/* Social Links */}
      <div>
        <SocialLinks institutionHandle={INSTITUTION_HANDLE} />
      </div>
    </div>
  </section>

  {/* Divider */}
  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange/20 to-transparent z-20 pointer-events-none"></div>

  {/* RIGHT PANEL */}
  <section
    id="registration-panel"
    className="w-full md:w-1/2 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] bg-white flex flex-col justify-center py-8 sm:py-20 px-4 sm:px-12 md:px-16 lg:px-20 relative z-10"
  >

    {/* MOBILE SMALL COUNTDOWN */}
    <div className="md:hidden mb-5">
      <div className="bg-orange/5 border border-orange/20 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">

        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-orange-deep">
            Limited Seats
          </span>

          <span className="text-xs text-gray-500 font-medium">
            Registration closing soon
          </span>
        </div>

        <div className="scale-75 origin-right">
          <Countdown />
        </div>

      </div>
    </div>

    {/* FORM CONTENT */}
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
