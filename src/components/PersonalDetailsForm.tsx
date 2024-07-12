import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePersonalDetails } from "../redux/slices/personalDetailsSlice";
import { RootState } from "../redux/store";

const PersonalDetailsForm = () => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const numericResumeId = Number(resumeId);

  const personalDetails = useSelector(
    (state: RootState) =>
      state.persistedReducer.personalDetailsSlice.personalDetails[numericResumeId]
  );
  if(!personalDetails)return <div>Loading...</div>

  const handleInputChange = (
    field: keyof typeof personalDetails,
    value: string
  ) => {
    dispatch(
      updatePersonalDetails({
        resumeId: numericResumeId,
        personalDetails: { [field]: value },
      })
    );
  };

  return (
    <div className="flex-col prose text-white">
      <div className="flex justify-between gap-5">
        <div className="w-full">
          <label className="input w-full input-bordered flex items-center gap-2 my-4">
            <input
              type="text"
              className="grow"
              placeholder="First Name ..."
              value={personalDetails.firstname}
              onChange={(e) => handleInputChange("firstname", e.target.value)}
            />
          </label>
        </div>
        <div className="w-full">
          <label className="input w-full input-bordered flex items-center gap-2 my-4">
            <input
              type="text"
              className="grow"
              placeholder="Last Name ..."
              value={personalDetails.lastname}
              onChange={(e) => handleInputChange("lastname", e.target.value)}
            />
          </label>
        </div>
      </div>
      <div>
        <label className="input input-bordered flex items-center gap-2 my-4">
          <FaPhone />
          <input
            type="text"
            className="grow"
            placeholder="Mobile Number"
            value={personalDetails.mobileNumber}
            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-full">
          <label className="input input-bordered flex items-center gap-2 my-4">
            <MdEmail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={personalDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </label>
        </div>
        <div className="w-full">
          <label className="input input-bordered flex items-center gap-2 my-4">
            <FaGithub />
            <input
              type="text"
              className="grow"
              placeholder="Github Username"
              value={personalDetails.github}
              onChange={(e) => handleInputChange("github", e.target.value)}
            />
          </label>
        </div>
      </div>
      <div>
        <label className="input input-bordered flex items-center gap-2 my-4">
          <FaLinkedin />
          <input
            type="text"
            className="grow"
            placeholder="Linkedin Username"
            value={personalDetails.linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
