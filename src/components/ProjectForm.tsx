import { useDispatch, useSelector } from "react-redux";
import {
  addDescription,
  addTechStack,
  ProjectDetails,
  removeDescription,
  removeTechStack,
  updateProjectDetails,
} from "../redux/slices/projectDetailsSlice";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";

interface ProjectFormProps {
  projectId: number;
}

const ProjectForm = ({ projectId }: ProjectFormProps) => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const project = useSelector(
    (state: RootState) =>
      state.persistedReducer.projectDetailsSlice.projects[numericResumeId]?.projectDetails[
        projectId
      ]
  );

  const handleInputChange = (
    field: keyof ProjectDetails,
    value: string | string[]
  ) => {
    dispatch(
      updateProjectDetails({
        resumeId: numericResumeId,
        projectId,
        projectDetails: { [field]: value },
      })
    );
  };

  const handleTechStackChange = (index: number, value: string) => {
    const newTechStacks = [...(project.techStack || [])];
    newTechStacks[index] = value;
    handleInputChange("techStack", newTechStacks);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...(project.description || [])];
    newDescriptions[index] = value;
    handleInputChange("description", newDescriptions);
  };

  return (
    <>
      <div className="flex flex-col prose text-white w-full">
        <div className="flex gap-5 items-start">
          <label className="input input-bordered flex flex-grow items-center gap-2 my-4 w-full">
            <input
              type="text"
              className="grow"
              name="title"
              placeholder="Project Title..."
              value={project.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </label>
        </div>
        {project.techStack.map((tech, index) => (
          <div className="flex flex-grow gap-2 items-center w-full" key={index}>
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              <input
                type="text"
                className=" w-full"
                placeholder={`Tech Stack ${index + 1}...`}
                value={tech}
                onChange={(e) => handleTechStackChange(index, e.target.value)}
              />
            </label>
            <button
              className="btn btn-ghost text-slate-200"
              onClick={() =>
                dispatch(
                  removeTechStack({
                    resumeId: numericResumeId,
                    projectId,
                    stackIndex: index,
                  })
                )
              }
            >
              Remove
            </button>
          </div>
        ))}
        <div className="w-full">
          <button
            className="btn btn-outline text-white w-full my-2"
            onClick={() =>
              dispatch(addTechStack({ resumeId: numericResumeId, projectId }))
            }
          >
            Add Tech Stack
          </button>
        </div>
        <div>
          {project.description.map((desc, index) => (
            <div className="flex gap-2 items-center w-full" key={index}>
              <label className="input input-bordered flex items-center gap-2 my-4 w-full">
                <input
                  type="text"
                  className=" w-full"
                  name={`description-${index}`}
                  placeholder={`Description ${index + 1}...`}
                  value={desc}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                />
              </label>
              <button
                className="btn btn-ghost text-slate-200"
                onClick={() =>
                  dispatch(
                    removeDescription({
                      resumeId: numericResumeId,
                      projectId,
                      descIndex: index,
                    })
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="btn btn-outline text-white w-full my-2"
            onClick={() =>
              dispatch(addDescription({ resumeId: numericResumeId, projectId }))
            }
          >
            Add Description
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
