import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import "../styles/resumeStyles.css";
import { useReactToPrint } from "react-to-print";

const ResumePreview = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const resume = useSelector(
    (state: RootState) => state.persistedReducer.resumeSlice.resumes[numericResumeId]
  );

  const personalDetails = useSelector(
    (state: RootState) =>
      state.persistedReducer.personalDetailsSlice.personalDetails[numericResumeId]
  );

  const educationDetails = useSelector(
    (state: RootState) =>
      state.persistedReducer.educationSlice.educations[numericResumeId]?.educationDetails || []
  );

  const experienceDetails = useSelector(
    (state: RootState) =>
      state.persistedReducer.experienceSlice.experiences[numericResumeId]?.experienceDetails || []
  );

  const projectDetails = useSelector(
    (state: RootState) =>
      state.persistedReducer.projectDetailsSlice.projects[numericResumeId]?.projectDetails || []
  );

  const skills = useSelector(
    (state: RootState) =>
      state.persistedReducer.skillsSlice.skills[numericResumeId]?.skillsDetail || []
  );

  const handleDownload = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: resume ? resume.resumeName : "Resume",
    onAfterPrint: () => console.log("Resume downloaded successfully"),
  });

  if (!personalDetails) return <div>Loading...</div>;
  if (!educationDetails) return <div>Loading...</div>;
  if (!experienceDetails) return <div>Loading...</div>;
  if (!projectDetails) return <div>Loading...</div>;
  if (!skills) return <div>Loading...</div>;

  return (
    <>
      <button className="btn btn-outline m-5" onClick={handleDownload}>
        Download
      </button>
      <div ref={resumeRef} className="resume">
        <header>
          <h1>
            {personalDetails.firstname || "Jake"} {personalDetails.lastname || "Ryan"}
          </h1>
          <p>
            {personalDetails.mobileNumber || "1234567890"} |{" "}
            {personalDetails.email || "jake@gmail.com"} |{" "}
            <a
              href={`https://www.linkedin.com/in/${personalDetails.linkedin || "jake"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href={`https://www.github.com/${personalDetails.github || "jake"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </header>
        {educationDetails.length > 0 && (
          <section>
            <h2>Education</h2>
            {educationDetails.map((education, ind) => (
              <div key={ind} className="education">
                <div className="institution">
                  <div className="flex-container">
                    <h3>{education.institution || "University Name"}</h3>
                    <p>{education.location || "Location"}</p>
                  </div>
                  <div className="flex-container">
                    <p>
                      {education.degree || "Degree"} in {education.field || "Field"}
                    </p>
                    <p>
                      {education.startDate} - {education.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
        {experienceDetails.length > 0 && (
          <section>
            <h2>Experience</h2>
            <div className="experience">
              {experienceDetails.map((experience, ind) => (
                <div key={ind} className="job">
                  <div className="flex-container">
                    <h3>{experience.position || "Title"}</h3>
                    <p>
                      {experience.startDate || "Start Date"} - {experience.endDate || "End Date"}
                    </p>
                  </div>
                  <p>{experience.companyName || "Company Name"}</p>
                  <ul>
                    {experience.description &&
                      experience.description.map((desc, descInd) => (
                        <li key={descInd}>
                          {desc || "Description about experience"}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {projectDetails.length > 0 && (
          <section>
            <h2>Projects</h2>
            <div className="projects">
              {projectDetails.map((project, ind) => (
                <div key={ind} className="project">
                  <div className="flex-container">
                    <h3>
                      {project.title || "Project Title"} |{" "}
                      {project.techStack &&
                        project.techStack.map((tech, techInd) => (
                          <span key={techInd}>
                            {techInd === project.techStack.length - 1 ? tech : `${tech} |`}
                          </span>
                        ))}
                    </h3>
                    <p>
                      {project.startDate || "Start Date"} - {project.endDate || "End Date"}
                    </p>
                  </div>
                  <ul>
                    {project.description &&
                      project.description.map((desc, descInd) => (
                        <li key={descInd}>
                          {desc || "Project Description"}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {skills.length > 0 && (
          <section>
            <h2>Technical Skills</h2>
            {skills.map((category, ind) => (
              <div key={ind}>
                <p>
                  {category.category || "Skill Category"}:{" "}
                  {category.skills.map((skill, skillInd) => (
                    <span key={skillInd}>
                      {skill}
                      {skillInd !== category.skills.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
};

export default ResumePreview;
