import React, { useEffect } from 'react';
import Countdown from './components/Countdown';
import SocialLinks from './components/SocialLinks';
import RegistrationForm from './components/RegistrationForm';

// Easily editable configurations
const INSTITUTION_NAME = "EduPrime Institute";

const INSTITUTION_HANDLE = "eduprime"; // Used for social link URLs

export default function App() {

  // Implementation of smooth scroll fade-in observer
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
          // Once animated, we can unobserve if we want it to stay permanently
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

      {/* 🧭 GLOBAL STICKY MINIMAL HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange to-orange-deep flex items-center justify-center text-white font-heading font-black text-xl shadow-md shadow-orange/20">
              EP
            </div>
            <span className="font-heading font-extrabold text-lg sm:text-xl text-gray-900 tracking-tight">
              {INSTITUTION_NAME}
            </span>
          </div>

          {/* CTA Header Button */}
          <button
            onClick={handleScrollToForm}
            className="bg-orange hover:bg-orange-deep text-white font-heading font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm active:scale-95"
          >
            Register Now
          </button>
        </div>
      </header>

      {/* 🌟 TWO-COLUMN SPLIT CONTAINER */}
      <div className="w-full flex flex-col md:flex-row relative bg-white flex-grow">

        {/* LEFT PANEL (50% width) - Sticky desktop brand welcome panel */}
        <section className="w-full md:w-1/2 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] md:sticky md:top-20 p-6 sm:p-12 md:p-16 flex flex-col justify-between bg-gradient-to-br from-[#FFF8F3] via-white to-[#FFF0E5] relative overflow-hidden border-b md:border-b-0 border-gray-100">

          {/* Background Animated Blobs (Bounded to left panel) */}
          <div className="absolute -top-12 -left-12 w-64 h-64 sm:w-80 sm:h-80 bg-orange-light/20 rounded-full filter blur-3xl animate-blob-1 pointer-events-none z-0"></div>
          <div className="absolute -bottom-16 -right-16 w-80 h-80 sm:w-96 sm:h-96 bg-orange/10 rounded-full filter blur-3xl animate-blob-2 pointer-events-none z-0"></div>

          {/* Central Core Content Container */}
          <div className="my-auto py-6 max-w-[480px] mx-auto w-full relative z-10 flex flex-col gap-6 sm:gap-8 justify-center">

            {/* Admissions Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-light/35 border border-orange-light/45 text-orange-deep font-body text-xs font-semibold uppercase tracking-wider w-max animate-pulse">
              🎓 Admissions Open For 2026
            </div>

            {/* Welcome Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-deep">
                {INSTITUTION_NAME}
              </span>
            </h1>



            {/* Countdown Timer Widget */}
            <div className="w-full">
              <p className="font-body text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Registration Window Closes In:
              </p>
              <Countdown />
            </div>

            {/* Social Media Icons Row */}
            <div>
              <SocialLinks institutionHandle={INSTITUTION_HANDLE} />
            </div>
          </div>

          {/* Subtle scroll or bottom decorative element */}
          <div className="pt-4 relative z-10 text-center w-full flex justify-center">


            {/* Mobile Indicator */}
            <button
              onClick={handleScrollToForm}
              className="inline-flex md:hidden flex-col items-center gap-1 group font-body text-xs font-bold text-gray-400 hover:text-orange transition-colors duration-200"
            >
              <span>Scroll down to register</span>
              <svg className="w-4 h-4 animate-bounce text-gray-400 group-hover:text-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </div>
        </section>

        {/* Divider Separator Line between Panels */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange/20 to-transparent z-20 pointer-events-none"></div>

        {/* 📝 RIGHT PANEL (50% width) - White bg scrollable form panel */}
        <section
          id="registration-panel"
          className="w-full md:w-1/2 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] bg-white flex flex-col justify-center py-12 sm:py-20 px-6 sm:px-12 md:px-16 lg:px-20 relative z-10"
        >
          <div className="fade-in-section mx-auto w-full flex flex-col justify-center h-full gap-5 sm:gap-6">





            {/* Registration Form Card */}
            <div className="w-full">
              <RegistrationForm />
            </div>
          </div>
        </section>
      </div>

      {/* 💼 GLOBAL FOOTER - Spanning the full page bottom */}
      <footer className="w-full bg-gray-900 text-gray-400 py-10 border-t border-gray-800 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center text-white font-heading font-black text-sm">
              EP
            </div> */}
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
          {/* <p className="font-body text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} {INSTITUTION_NAME}. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 font-body">
            Designed with excellence for premium educational experiences.
          </p> */}
        </div>
      </footer>
    </div>
  );
}
