import { useState } from "react";
import { Link } from "react-router-dom";
import EducationDetailsForm from "./EducationDetailsForm";
import ExperienceDetailsForm from "./ExperienceDetailsForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ProjectsDetailForm from "./ProjectsDetailForm";
import SkillsDetailsForm from "./SkillsDetailsForm";

const UserDetailsFormMain = () => {
  const [section, setSection] = useState("Personal Details");
  return (
    <div className="flex flex-col items-start p-5 m-4 gap-5 flex-grow w-full">
      <div>
        <Link to={"/dashboard"}>
          <button className="text-white btn">Go to Dashboard</button>
        </Link>
      </div>
      <select
        defaultValue={section}
        onChange={(e) => setSection(e.target.value)}
        className="select w-full max-w-xs text-white bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2"
      >
        <option className="bg-gray-900 text-white hover:bg-gray-700">
          Personal Details
        </option>
        <option className="bg-gray-900 text-white hover:bg-gray-700">
          Education Details
        </option>
        <option className="bg-gray-900 text-white hover:bg-gray-700">
          Professional Experience
        </option>
        <option className="bg-gray-900 text-white hover:bg-gray-700">
          Projects Details
        </option>
        <option className="bg-gray-900 text-white hover:bg-gray-700">
          Skills
        </option>
      </select>
      <h2 className="text-white font-bold ml-1 text-3xl">{section}</h2>
      <div className="mt-4 flex flex-col items-center">
        {section === "Personal Details" && <PersonalDetailsForm />}
        {section === "Education Details" && <EducationDetailsForm />}
        {section === "Professional Experience" && <ExperienceDetailsForm />}
        {section === "Projects Details" && <ProjectsDetailForm />}
        {section === "Skills" && <SkillsDetailsForm />}
      </div>
    </div>
  );
};

export default UserDetailsFormMain;
