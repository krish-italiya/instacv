import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EducationDetails {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface EducationState {
  educationDetails: EducationDetails[];
}

export interface ResumeEducationSection {
  educations: EducationState[];
}

const initialState: ResumeEducationSection = {
  educations: [
    {
      educationDetails: [
        {
          institution: "",
          degree: "",
          field: "",
          location: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  ],
};

const educationSlice = createSlice({
  name: "educations",
  initialState,
  reducers: {
    initializeEducation: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      if (resumeId >= state.educations.length) {
        state.educations.push({
          educationDetails: [
            {
              institution: "",
              degree: "",
              field: "",
              location: "",
              startDate: "",
              endDate: "",
            },
          ],
        });
      }
      console.log("state educations: ", state.educations.length);
    },
    updateEducationDetails(
      state,
      action: PayloadAction<{
        educationId: number;
        resumeId: number;
        educationDetails: Partial<EducationDetails>;
      }>
    ) {
      const { educationId, resumeId, educationDetails } = action.payload;
      const education =
        state.educations[resumeId].educationDetails[educationId];
      if (education) {
        state.educations[resumeId].educationDetails[educationId] = {
          ...education,
          ...educationDetails,
        };
      }
    },
    addEducation(state, action: PayloadAction<number>) {
      const resumeId = action.payload;
      state.educations[resumeId].educationDetails.push({
        institution: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
      });
    },
    removeEducation(
      state,
      action: PayloadAction<{ resumeId: number; educationId: number }>
    ) {
      const { resumeId, educationId } = action.payload;
      state.educations[resumeId].educationDetails.splice(educationId, 1);
    },
    addResume(state) {
      state.educations.push({
        educationDetails: [
          {
            institution: "",
            degree: "",
            field: "",
            location: "",
            startDate: "",
            endDate: "",
          },
        ],
      });
    },
    removeEducationSection: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      state.educations.splice(resumeId, 1);
    },
  },
});

export const {
  updateEducationDetails,
  addEducation,
  removeEducation,
  addResume,
  initializeEducation,
  removeEducationSection
} = educationSlice.actions;
export default educationSlice.reducer;
