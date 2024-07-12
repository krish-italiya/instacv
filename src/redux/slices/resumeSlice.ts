import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResumeDetail {
  resumeName: string;
  resumeId: number;
}

export interface Resumes {
  resumes: ResumeDetail[];
}

const initialState: Resumes = {
  resumes: [
    {
      resumeName: "",
      resumeId: 0,
    },
  ],
};

const resumeSlice = createSlice({
  name: "resumeSlice",
  initialState,
  reducers: {
    addResume: (
      state,
      action: PayloadAction<{ resumeId: number; resumeName: string }>
    ) => {
      const { resumeId, resumeName } = action.payload;
      state.resumes.push({ resumeName, resumeId });
    },
    removeResume: (state, action: PayloadAction<{ resumeId: number }>) => {
      const { resumeId } = action.payload;
      state.resumes.splice(resumeId, 1);
    },
  },
});

export const { addResume, removeResume } = resumeSlice.actions;
export default resumeSlice.reducer;
