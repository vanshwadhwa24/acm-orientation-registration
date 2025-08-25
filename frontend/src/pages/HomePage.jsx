import React, { useEffect, useState } from "react";
import instagram from "../assets/instagram.png";
import linkedinUrl from "../assets/linkedin2.svg";
import github from "../assets/github.png";
import logo from "../assets/logo_ACM_Footer.png";

const HomePage = () => {
  const registrationDeadline = new Date("2025-08-27T12:30:00+05:30");

  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Math.floor((registrationDeadline - new Date()) / 1000))
  );
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setDeadlinePassed(true);
      return;
    }

    const timer = setInterval(() => {
      const remaining = Math.floor((registrationDeadline - new Date()) / 1000);
      if (remaining <= 0) {
        setDeadlinePassed(true);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days} day${days !== 1 ? "s" : ""} ${hours} hour${
      hours !== 1 ? "s" : ""
    } ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    admissionNumber: "",
  });

  const [qrCode, setQrCode] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   
      const API_URL = process.env.REACT_APP_API_URL;

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setNotification({
          type: "success",
          message: "Registration successful!",
        });
      } else {
        setNotification({
          type: "error",
          message: data.error || "Something went wrong!",
        });
      }

      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setNotification({ type: "error", message: "Something went wrong!" });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat m-0 bg-white text-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-center items-start py-10 gap-8 px-4">
       
        <div className="bg-gradient-to-br from-[#e6f7ff] to-[#d3f3ff] w-full md:w-1/3 p-8 rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300 order-1 md:order-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Orientation Details
          </h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Date:</span> 28th August 2025
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Time:</span> 5:30 PM IST
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Venue:</span> LT101, Thapar University
          </p>
          <p className="text-gray-600 mt-4 text-center md:text-left font-medium">
            Registrations will close in:{" "}
            <span className="text-[#15a6dd] font-bold">{formatTime(timeLeft)}</span>
          </p>
          {deadlinePassed && (
            <p className="text-orange-500 font-medium mt-2 text-center md:text-left">
              Registration deadline has passed — but you can still register!
            </p>
          )}

          {qrCode && (
            <div className="flex flex-col items-center mt-6">
              <h3 className="text-lg font-semibold">Your Registration QR Code</h3>
              <img src={qrCode} alt="Registration QR" className="mt-4 w-48 h-48" />
              <p className="text-gray-600 mt-2 text-sm">
                Scan this QR at the event to confirm your registration.
              </p>
            </div>
          )}
        </div>

        {notification && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setNotification(null)}
          ></div>
          <div
            className={`relative z-10 flex flex-col items-center p-6 rounded-3xl border shadow-2xl transition-all duration-300 max-w-md w-full
            ${notification.type === "success" ? "bg-green-100 border-green-400 text-green-800" : ""}
            ${notification.type === "error" ? "bg-red-100 border-red-400 text-red-800" : ""}`}
          >
            <span className="text-center">{notification.message}</span>
            <button
              className="mt-4 text-gray-700 font-bold hover:text-gray-900"
              onClick={() => setNotification(null)}
              type="button"
            >
              × Close
            </button>
          </div>
        </div>
        )}

    
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#e6f7ff] to-[#d3f3ff] space-y-6 w-full md:w-1/3 p-10 rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300 order-2 md:order-1"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Orientation Registration
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm">
            Fill in your details below to secure your spot
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15a6dd] focus:border-transparent transition-all duration-200"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15a6dd] focus:border-transparent transition-all duration-200"
          />
          <input
            type="tel"
            name="number"
            placeholder="Mobile Number"
            required
            pattern="[6-9]{1}[0-9]{9}"
            title="Enter a valid 10-digit mobile number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15a6dd] focus:border-transparent transition-all duration-200"
          />
          <input
            type="text"
            name="admissionNumber"
            required
            placeholder="Admission / Registration Number"
            value={formData.admissionNumber}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15a6dd] focus:border-transparent transition-all duration-200"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-[#15a6dd] hover:bg-[#1290c0] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          >
            Register Now
          </button>
        </form>
      </div>

      <div className="bg-[#D3f3ff] mt-10 p-6 text-center md:shadow-none md:w-full md:ml-0 md:mb-0 sm:text-left transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between w-full gap-6">
          <div className="flex flex-col max-w-[32rem]">
            <div className="text-3xl font-extrabold text-gray-900">ACM Thapar Student Chapter</div>
            <div className="text-lg text-gray-400 mt-2">
              A vibrant community of tech enthusiasts, dedicated to exploring, tackling and connecting with all things tech.
            </div>
            <div className="flex flex-row gap-4 mt-4 justify-center sm:justify-start">
              <a href="https://www.instagram.com/acmthapar/">
                <img src={instagram} alt="instagram" className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/thapar-acm-student-chapter/">
                <img src={linkedinUrl} alt="linkedin" className="w-6 h-6" />
              </a>
              <a href="https://github.com/ACM-Thapar">
                <img src={github} alt="github" className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="md:mt-5 flex justify-center md:justify-end">
            <a href="https://acmwebsite.vercel.app/">
              <img src={logo} alt="ACM Thapar" className="w-[150px] md:w-[350px] h-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
