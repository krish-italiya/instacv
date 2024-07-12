import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalDetails {
  firstname: string;
  lastname: string;
  mobileNumber: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface PersonalDetailsResumeSection {
  personalDetails: PersonalDetails[];
}

const initialState: PersonalDetailsResumeSection = {
  personalDetails: [
    {
      firstname: "",
      lastname: "",
      mobileNumber: "",
      email: "",
      linkedin: "",
      github: "",
    },
  ],
};

const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    initializePersonalDetails: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      if (resumeId >= state.personalDetails.length) {
        state.personalDetails[resumeId] = {
          firstname: "",
          lastname: "",
          mobileNumber: "",
          email: "",
          linkedin: "",
          github: "",
        };
      }
    },
    updatePersonalDetails: (
      state,
      action: PayloadAction<{
        resumeId: number;
        personalDetails: Partial<PersonalDetails>;
      }>
    ) => {
      const { resumeId, personalDetails } = action.payload;
      state.personalDetails[resumeId] = {
        ...state.personalDetails[resumeId],
        ...personalDetails,
      };
      console.log("updated!!!", state.personalDetails[resumeId]);
    },
    removePersonalDetailSection: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      state.personalDetails.splice(resumeId, 1);
    },
  },
});

export const { updatePersonalDetails, initializePersonalDetails,removePersonalDetailSection } =
  personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;
