import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addEducation, removeEducation } from "../redux/slices/educationSlice";
import { RootState } from "../redux/store";
import EducationForm from "./EducationForm";

const EducationDetailsForm = () => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const educations = useSelector(
    (state: RootState) =>
      state.persistedReducer.educationSlice.educations[numericResumeId]?.educationDetails || []
  );

  return (
    <div className="flex flex-col gap-y-5 items-start">
      {educations.map((_, ind) => (
        <div key={ind}>
          {ind > 0 && <hr />}
          <EducationForm id={ind} />
          <button
            className="btn btn-ghost text-slate-200"
            onClick={() =>
              dispatch(
                removeEducation({ resumeId: numericResumeId, educationId: ind })
              )
            }
          >
            Remove Education
          </button>
        </div>
      ))}
      <button
        className="btn btn-outline text-white gap-y-5"
        onClick={() => dispatch(addEducation(numericResumeId))}
      >
        Add Education
      </button>
    </div>
  );
};

export default EducationDetailsForm;
