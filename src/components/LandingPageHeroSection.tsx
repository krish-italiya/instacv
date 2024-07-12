import { NavLink } from "react-router-dom";
import logo from "../assets/asset0.jpg";

const LandingPageHeroSection = () => {
  return (
    <>
      <div
        id="hero-section"
        className="hero min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${logo})`,
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center flex flex-col items-center justify-center">
          <div className="max-w-lg px-8 py-12 bg-white bg-opacity-80 rounded-lg shadow-lg">
            <h1 className="mb-5 text-5xl font-bold text-gray-800">Welcome to InstaCV!</h1>
            <p className="mb-5 text-lg text-gray-700">
              Build Your Professional Resume in Minutes!
            </p>
            <NavLink to={"/dashboard"}>
              <button className="btn btn-primary">Get Started</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageHeroSection;
