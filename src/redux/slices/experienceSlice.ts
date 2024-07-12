import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExperienceDetails {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface ExperienceState {
  experienceDetails: ExperienceDetails[];
}

export interface ResumeExperienceSection {
  experiences: ExperienceState[];
}

const initialState: ResumeExperienceSection = {
  experiences: [
    {
      experienceDetails: [
        {
          companyName: "",
          position: "",
          startDate: "",
          endDate: "",
          description: [""],
        },
      ],
    },
  ],
};

const experienceSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {
    initializeExperienceDetails: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      if (resumeId >= state.experiences.length) {
        state.experiences.push({
          experienceDetails: [
            {
              companyName: "",
              position: "",
              startDate: "",
              endDate: "",
              description: [""],
            },
          ],
        });
      }
    },
    updateExperienceDetails(
      state,
      action: PayloadAction<{
        experienceId: number;
        resumeId: number;
        experienceDetails: Partial<ExperienceDetails>;
      }>
    ) {
      const { experienceId, resumeId, experienceDetails } = action.payload;
      state.experiences[resumeId].experienceDetails[experienceId] = {
        ...state.experiences[resumeId].experienceDetails[experienceId],
        ...experienceDetails,
      };
    },
    addExperience(state, action: PayloadAction<number>) {
      const resumeId = action.payload;
      state.experiences[resumeId].experienceDetails.push({
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        description: [""],
      });
    },
    removeExperience(
      state,
      action: PayloadAction<{ resumeId: number; experienceId: number }>
    ) {
      const { resumeId, experienceId } = action.payload;
      state.experiences[resumeId].experienceDetails.splice(experienceId, 1);
    },
    addDescription(
      state,
      action: PayloadAction<{ resumeId: number; experienceId: number }>
    ) {
      const { resumeId, experienceId } = action.payload;
      state.experiences[resumeId].experienceDetails[
        experienceId
      ].description.push("");
    },
    removeDescription(
      state,
      action: PayloadAction<{
        resumeId: number;
        experienceId: number;
        descriptionId: number;
      }>
    ) {
      const { resumeId, experienceId, descriptionId } = action.payload;
      state.experiences[resumeId].experienceDetails[
        experienceId
      ].description.splice(descriptionId, 1);
    },
    removeExperienceSection: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      state.experiences.splice(resumeId, 1);
    },
  },
});

export const {
  updateExperienceDetails,
  addExperience,
  removeExperience,
  addDescription,
  removeDescription,
  initializeExperienceDetails,
  removeExperienceSection
} = experienceSlice.actions;

export default experienceSlice.reducer;
