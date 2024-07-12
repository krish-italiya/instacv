import "allotment/dist/style.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SplitPane from "react-split-pane";
import { initializeEducation } from "../redux/slices/educationSlice";
import { initializeExperienceDetails } from "../redux/slices/experienceSlice";
import { makeSticky } from "../redux/slices/navbarSlice";
import { initializePersonalDetails } from "../redux/slices/personalDetailsSlice";
import { initializeProjectSection } from "../redux/slices/projectDetailsSlice";
import { initializeSkillsSection } from "../redux/slices/skillSlice";
import "../styles/splitpane.css";
import ResumePreview from "./ResumePreview";
import UserDetailsFormMain from "./UserDetailsFormMain";

const CreateResume = () => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const id = Number(resumeId);

  useEffect(() => {
    dispatch(makeSticky());
    const initializeCreateResume = (ind: number) => {
      dispatch(initializePersonalDetails({ resumeId: ind }));
      dispatch(initializeEducation({ resumeId: ind }));
      dispatch(initializeExperienceDetails({ resumeId: ind }));
      dispatch(initializeProjectSection({ resumeId: ind }));
      dispatch(initializeSkillsSection({ resumeId: ind }));
    };
    initializeCreateResume(id);
  }, [dispatch, id]);

  return (
    <div className="">
      {/* this lib is incompatible with react18. To fix     // children: React.ReactNode; needs to be added to SplitPaneProps.
     // @ts-ignore TS2322 */}
      <SplitPane
        className="flex"
        split="vertical"
        minSize={50}
        defaultSize="40%"
      >
        <div className="flex-1 max-h-screen sticky top-0 overflow-y-auto overflow-x-hidden">
          <UserDetailsFormMain />
        </div>
        <div className="flex-1 max-h-screen sticky top-0 overflow-y-auto">
          <ResumePreview />
        </div>
      </SplitPane>
    </div>
  );
};

export default CreateResume;
