import { useDispatch, useSelector } from "react-redux";
import ExperienceForm from "./ExperienceForm";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import {
  addExperience,
  removeExperience,
} from "../redux/slices/experienceSlice";

const ExperienceDetailsForm = () => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const experiences = useSelector(
    (state: RootState) =>
      state.persistedReducer.experienceSlice.experiences[numericResumeId]?.experienceDetails ||
      []
  );

  return (
    <div className="flex flex-col gap-y-5 items-start">
      {experiences.map((_, ind) => (
        <div key={ind}>
          {ind > 0 && <hr />}
          <ExperienceForm experienceId={ind} />
          <button
            className="btn btn-ghost text-slate-200 gap-y-5 my-5"
            onClick={() =>
              dispatch(
                removeExperience({
                  resumeId: numericResumeId,
                  experienceId: ind,
                })
              )
            }
          >
            Remove Experience
          </button>
        </div>
      ))}
      <button
        className="btn btn-outline text-white gap-y-5"
        onClick={() => dispatch(addExperience(numericResumeId))}
      >
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceDetailsForm;
