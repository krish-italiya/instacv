import { IoLocation } from "react-icons/io5";
import { PiStudentDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  EducationDetails,
  updateEducationDetails,
} from "../redux/slices/educationSlice";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";

export interface PropsType {
  id: number;
}

const EducationForm = ({ id }: PropsType) => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const educationDetails = useSelector(
    (state: RootState) =>
      state.persistedReducer.educationSlice.educations[numericResumeId]?.educationDetails[id]
  );

  const handleInputChange = (field: keyof EducationDetails, value: string) => {
    dispatch(
      updateEducationDetails({
        educationId: id,
        resumeId: numericResumeId,
        educationDetails: { [field]: value },
      })
    );
  };

  const parseDateForInput = (date: string) => {
    if (!date) return "";
    const newDate = new Date(date);
    return !isNaN(newDate.getTime()) ? newDate.toISOString().split("T")[0] : "";
  };

  if (!educationDetails) {
    return null; // Or display a loading state
  }

  return (
    <div className="flex text-white flex-col prose">
      <div className="flex gap-5 flex-wrap flex-grow items-start">
        <label className="input input-bordered flex flex-grow items-center gap-2 my-4">
          <PiStudentDuotone />
          <input
            type="text"
            className="grow"
            name="institution"
            placeholder="Institution..."
            value={educationDetails.institution}
            onChange={(e) => handleInputChange("institution", e.target.value)}
          />
        </label>
        <label className="input input-bordered flex flex-grow items-center gap-2 my-4">
          <IoLocation />
          <input
            type="text"
            className="grow"
            name="location"
            placeholder="Location..."
            value={educationDetails.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </label>
      </div>
      <div className="flex gap-5 items-start">
        <label className="input w-full input-bordered flex items-center gap-2 my-4">
          <input
            type="text"
            className="grow"
            placeholder="Degree..."
            name="degree"
            value={educationDetails.degree}
            onChange={(e) => handleInputChange("degree", e.target.value)}
          />
        </label>
        <label className="input w-full input-bordered flex items-center gap-2 my-4">
          <input
            type="text"
            className="grow"
            placeholder="Field Of Study..."
            name="field"
            value={educationDetails.field}
            onChange={(e) => handleInputChange("field", e.target.value)}
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
            value={parseDateForInput(educationDetails.startDate)}
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
            value={parseDateForInput(educationDetails.endDate)}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default EducationForm;
