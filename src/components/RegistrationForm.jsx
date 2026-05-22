import React, { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    slot: '',
    courseDetail: '',
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (success, message) => {
    setToast({
      show: true,
      success,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        success: false,
        message: '',
      });
    }, 6000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhone = `+91 ${formData.phone.trim()}`;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          slot: formData.slot,
          courseDetail: formData.courseDetail,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(
          true,
          "✅ Registration Successful! We'll contact you soon."
        );

        setFormData({
          name: '',
          email: '',
          phone: '',
          slot: '',
          courseDetail: '',
        });
      } else {
        showToast(
          false,
          `❌ ${
            data.message || 'Something went wrong. Please try again.'
          }`
        );
      }
    } catch (err) {
      showToast(
        false,
        '❌ Something went wrong. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto px-2 sm:px-4">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 left-4 sm:left-auto z-50 flex items-center justify-between p-4 rounded-xl shadow-lg border animate-slide-in transition-all duration-300 sm:max-w-sm ${
            toast.success
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="text-sm font-semibold tracking-wide pr-3">
            {toast.message}
          </div>

          <button
            onClick={() =>
              setToast({
                show: false,
                success: false,
                message: '',
              })
            }
            className="text-gray-400 hover:text-gray-600 focus:outline-none text-xl leading-none"
          >
            &times;
          </button>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border-t-4 border-orange overflow-hidden p-4 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
            Secure Your Slot
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-body">
            Fill out this simple registration form. Our academic
            counselors will review your details and reach out to guide
            you.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-body text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2"
            >
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors duration-200 font-body text-sm sm:text-base"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-body text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors duration-200 font-body text-sm sm:text-base"
              placeholder="Enter your email address"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block font-body text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2"
            >
              Phone Number
            </label>

            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-orange focus-within:ring-1 focus-within:ring-orange transition-all duration-200">
              <span className="inline-flex items-center px-4 bg-gray-50 border-r border-gray-300 text-gray-500 font-semibold text-sm sm:text-base select-none">
                +91
              </span>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[6-9][0-9]{9}"
                title="Please enter a valid 10-digit Indian mobile number."
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none font-body text-sm sm:text-base"
                placeholder="9876543210"
              />
            </div>

            <p className="text-[11px] text-gray-400 mt-1 font-body">
              Enter 10-digit mobile number starting with 6, 7, 8,
              or 9.
            </p>
          </div>

          {/* Slot Preference */}
          <div>
            <label
              htmlFor="slot"
              className="block font-body text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2"
            >
              Slot Preference
            </label>

            <select
              id="slot"
              name="slot"
              value={formData.slot}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors duration-200 bg-white font-body text-sm sm:text-base cursor-pointer"
            >
              <option value="" disabled>
                Select your preferred slot
              </option>

              <option value="Morning Batch (9:00 AM - 11:00 AM)">
                Morning Batch (9:00 AM - 11:00 AM)
              </option>

              <option value="Afternoon Batch (1:00 PM - 3:00 PM)">
                Afternoon Batch (1:00 PM - 3:00 PM)
              </option>

              <option value="Evening Batch (5:00 PM - 7:00 PM)">
                Evening Batch (5:00 PM - 7:00 PM)
              </option>

              <option value="Weekend Batch (Saturday & Sunday)">
                Weekend Batch (Saturday & Sunday)
              </option>
            </select>
          </div>

          {/* Course Details */}
          <div>
            <label
              htmlFor="courseDetail"
              className="block font-body text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2"
            >
              Course Details
            </label>

            <textarea
              id="courseDetail"
              name="courseDetail"
              value={formData.courseDetail}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors duration-200 font-body text-sm sm:text-base resize-none"
              placeholder="Tell us about the course you're interested in..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange to-orange-deep text-white font-heading font-extrabold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 
                    5.373 0 12h4zm2 5.291A7.962 
                    7.962 0 014 12H0c0 3.042 
                    1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>

                <span>Sending...</span>
              </>
            ) : (
              <span>Register Now</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
