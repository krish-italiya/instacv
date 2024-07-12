import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProject, removeProject } from "../redux/slices/projectDetailsSlice";
import { RootState } from "../redux/store";
import ProjectForm from "./ProjectForm";

const ProjectsDetailForm = () => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const projects = useSelector(
    (state: RootState) =>
      state.persistedReducer.projectDetailsSlice.projects[numericResumeId]?.projectDetails
  );

  const handleAddProject = () => {
    dispatch(addProject(numericResumeId));
  };

  return (
    <>
      <div className="container flex flex-col items-center text-white w-full">
        {projects.map((_, index) => (
          <>
            {index>0 && <hr className="bg-white py-2" />}
            <div key={index}>
              <ProjectForm projectId={index} />
              <button
                className="btn btn-outline btn-secondary"
                onClick={() =>
                  dispatch(
                    removeProject({
                      resumeId: numericResumeId,
                      projectId: index,
                    })
                  )
                }
              >
                Remove Project
              </button>
            </div>
          </>
        ))}
        <div className="my-3">
          <button className="btn  btn-outline" onClick={handleAddProject}>
            Add Project
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectsDetailForm;
