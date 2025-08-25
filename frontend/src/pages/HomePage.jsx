import React from "react";
import { useNavigate } from "react-router-dom";
import instagram from "../assets/instagram.png";
import linkedinUrl from "../assets/linkedin2.svg";
import github from "../assets/github.png";
import logo from "../assets/logo_ACM_Footer.png";

const HomePage = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    number: "",
    admissionNumber: "",
  });

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
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-cover bg-no-repeat m-0 bg-white text-gray-900 transition-colors duration-300">
      <div className="flex justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#e6f7ff] to-[#d3f3ff]
               space-y-6 w-full max-w-lg p-10 rounded-3xl shadow-2xl 
               border border-gray-200 transition-all duration-300"
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
            className="w-full p-3 rounded-xl bg-white/50
      text-gray-900
      placeholder-gray-400
      border border-gray-300
      focus:outline-none focus:ring-2 focus:ring-[#15a6dd] 
      focus:border-transparent transition-all duration-200"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50
      text-gray-900
      placeholder-gray-400
      border border-gray-300
      focus:outline-none focus:ring-2 focus:ring-[#15a6dd] 
      focus:border-transparent transition-all duration-200"
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
            className="w-full p-3 rounded-xl bg-white/50
  text-gray-900
  placeholder-gray-400
  border border-gray-300
  focus:outline-none focus:ring-2 focus:ring-[#15a6dd] 
  focus:border-transparent transition-all duration-200"
          />

          <input
            type="text"
            name="admissionNumber"
            required
            placeholder="Admission / Registration Number"
            value={formData.admissionNumber}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50
                 text-gray-900
                 placeholder-gray-400
                 border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-[#15a6dd] 
                 focus:border-transparent transition-all duration-200"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-[#15a6dd] hover:bg-[#1290c0] 
                 text-white font-semibold py-3 rounded-xl 
                 shadow-lg hover:shadow-xl active:scale-[0.98] 
                 transition-all duration-200"
          >
            Register Now
          </button>
        </form>
      </div>

      <div className="bg-[#D3f3ff] mt-10 p-6 text-center md:shadow-none md:w-full md:ml-0 md:mb-0 sm:text-left transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between w-full gap-6">
          <div className="flex flex-col max-w-[32rem]">
            <div className="text-3xl font-extrabold text-gray-900">
              ACM Thapar Student Chapter
            </div>
            <div className="text-lg text-gray-400 mt-2">
              A vibrant community of tech enthusiasts, dedicated to exploring,
              tackling and connecting with all things tech.
            </div>
            <div className="flex flex-row gap-4 mt-4 justify-center sm:justify-start">
              <a href="https://www.instagram.com/acmthapar/">
                <img
                  src={instagram}
                  alt="instagram"
                  className="w-6 h-6"
                />
              </a>
              <a href="https://www.linkedin.com/company/thapar-acm-student-chapter/">
                <img
                  src={linkedinUrl}
                  alt="linkedin"
                  className="w-6 h-6 "
                />
              </a>
              <a href="https://github.com/ACM-Thapar">
                <img
                  src={github}
                  alt="github"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          <div className=" md:mt-5 flex justify-center md:justify-end">
            <a href="https://acmwebsite.vercel.app/">
              <img
                src={logo}
                alt="ACM Thapar"
                className="w-[150px] md:w-[350px] h-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
