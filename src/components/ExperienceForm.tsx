import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import {
  updateExperienceDetails,
  addDescription,
  removeDescription,
  ExperienceDetails,
} from "../redux/slices/experienceSlice";

interface ExperienceFormProps {
  experienceId: number;
}

const ExperienceForm = ({ experienceId }: ExperienceFormProps) => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const experience = useSelector(
    (state: RootState) =>
      state.persistedReducer.experienceSlice.experiences[numericResumeId]?.experienceDetails[
        experienceId
      ]
  );

  const handleInputChange = (field: keyof ExperienceDetails, value: string) => {
    dispatch(
      updateExperienceDetails({
        resumeId: numericResumeId,
        experienceId,
        experienceDetails: { [field]: value },
      })
    );
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...(experience.description || [])];
    newDescriptions[index] = value;
    handleInputChange("description", newDescriptions as unknown as string);
  };

  return (
    <>
      <div className="flex text-white flex-col prose">
        <div className="flex gap-5 flex-wrap flex-grow items-start">
          <label className="input input-bordered flex flex-grow items-center gap-2 my-4">
            <input
              type="text"
              className="grow"
              name="companyName"
              placeholder="Company Name..."
              value={experience.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
            />
          </label>
          <label className="input input-bordered flex flex-grow items-center gap-2 my-4">
            <input
              type="text"
              className="grow"
              name="title"
              placeholder="Title/Designation..."
              value={experience.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
            />
          </label>
        </div>
        <div className="flex gap-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Start Date</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full max-w-xs"
              name="startDate"
              value={experience.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </label>
          <label className="form-control w-full flex max-w-xs">
            <div className="label">
              <span className="label-text">End Date</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full max-w-xs"
              name="endDate"
              value={experience.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
            />
          </label>
        </div>
        <div>
          {experience.description.map((desc, index) => (
            <div key={index} className="flex gap-2 items-center">
              <label className="input input-bordered flex flex-grow items-center gap-2 my-4">
                <input
                  type="text"
                  className="grow"
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
                      experienceId,
                      descriptionId: index,
                    })
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="btn btn-outline text-white gap-y-5"
            onClick={() =>
              dispatch(
                addDescription({ resumeId: numericResumeId, experienceId })
              )
            }
          >
            Add Description
          </button>
        </div>
      </div>
    </>
  );
};

export default ExperienceForm;
