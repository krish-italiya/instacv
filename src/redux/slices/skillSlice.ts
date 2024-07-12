import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Skills {
  category: string;
  skills: [string];
}

export interface SkillsState {
  skillsDetail: Skills[];
}

export interface SkillsResumeSection {
  skills: SkillsState[];
}

const initialState: SkillsResumeSection = {
  skills: [
    {
      skillsDetail: [{ category: "", skills: [""] }],
    },
  ],
};

const skillSlice = createSlice({
  name: "skillsSlice",
  initialState,
  reducers: {
    initializeSkillsSection: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      if (resumeId >= state.skills.length) {
        state.skills.push({ skillsDetail: [{ category: "", skills: [""] }] });
      }
    },
    updateSkillsDetails: (
      state,
      action: PayloadAction<{
        resumeId: number;
        categoryId: number;
        skillDetails: Partial<Skills>;
      }>
    ) => {
      const { resumeId, categoryId, skillDetails } = action.payload;
      state.skills[resumeId].skillsDetail[categoryId] = {
        ...state.skills[resumeId].skillsDetail[categoryId],
        ...skillDetails,
      };
    },
    addCategory: (state, action: PayloadAction<number>) => {
      state.skills[action.payload].skillsDetail.push({
        category: "",
        skills: [""],
      });
    },
    removeCategory: (
      state,
      action: PayloadAction<{
        resumeId: number;
        categoryId: number;
      }>
    ) => {
      const { resumeId, categoryId } = action.payload;
      state.skills[resumeId].skillsDetail.splice(categoryId, 1);
    },
    addSkill: (
      state,
      action: PayloadAction<{
        resumeId: number;
        categoryId: number;
      }>
    ) => {
      const { resumeId, categoryId } = action.payload;
      state.skills[resumeId].skillsDetail[categoryId].skills.push("");
    },
    removeSkill: (
      state,
      action: PayloadAction<{
        resumeId: number;
        categoryId: number;
        skillId: number;
      }>
    ) => {
      const { resumeId, categoryId, skillId } = action.payload;
      state.skills[resumeId].skillsDetail[categoryId].skills.splice(skillId, 1);
    },
    removeSkillSection: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      state.skills.splice(resumeId, 1);
    },
  },
});

export const {
  updateSkillsDetails,
  addCategory,
  removeCategory,
  addSkill,
  removeSkill,
  initializeSkillsSection,
  removeSkillSection
} = skillSlice.actions;

export default skillSlice.reducer;
