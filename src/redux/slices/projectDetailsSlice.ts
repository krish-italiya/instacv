import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectDetails {
  title: string;
  techStack: string[];
  description: string[];
  startDate: string;
  endDate: string;
}

export interface ProjectState {
  projectDetails: ProjectDetails[];
}

export interface ProjectDetailsResumeState {
  projects: ProjectState[];
}

const initialState: ProjectDetailsResumeState = {
  projects: [
    {
      projectDetails: [
        {
          title: "",
          techStack: [""],
          description: [""],
          startDate: "",
          endDate: "",
        },
      ],
    },
  ],
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    initializeProjectSection: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      if (resumeId >= state.projects.length) {
        state.projects.push({
          projectDetails: [
            {
              title: "",
              techStack: [""],
              description: [""],
              startDate: "",
              endDate: "",
            },
          ],
        });
      }
    },
    updateProjectDetails(
      state,
      action: PayloadAction<{
        resumeId: number;
        projectId: number;
        projectDetails: Partial<ProjectDetails>;
      }>
    ) {
      const { resumeId, projectId, projectDetails } = action.payload;
      state.projects[resumeId].projectDetails[projectId] = {
        ...state.projects[resumeId].projectDetails[projectId],
        ...projectDetails,
      };
    },
    addProject: (state, action: PayloadAction<number>) => {
      state.projects[action.payload].projectDetails.push({
        title: "",
        techStack: [""],
        description: [""],
        startDate: "",
        endDate: "",
      });
    },
    removeProject(
      state,
      action: PayloadAction<{ resumeId: number; projectId: number }>
    ) {
      const { resumeId, projectId } = action.payload;
      state.projects[resumeId].projectDetails.splice(projectId, 1);
    },
    addTechStack(
      state,
      action: PayloadAction<{ resumeId: number; projectId: number }>
    ) {
      state.projects[action.payload.resumeId].projectDetails[
        action.payload.projectId
      ].techStack.push("");
    },
    removeTechStack(
      state,
      action: PayloadAction<{
        resumeId: number;
        projectId: number;
        stackIndex: number;
      }>
    ) {
      const { resumeId, projectId, stackIndex } = action.payload;
      state.projects[resumeId].projectDetails[projectId].techStack.splice(
        stackIndex,
        1
      );
    },
    addDescription(
      state,
      action: PayloadAction<{ resumeId: number; projectId: number }>
    ) {
      state.projects[action.payload.resumeId].projectDetails[
        action.payload.projectId
      ].description.push("");
    },
    removeDescription(
      state,
      action: PayloadAction<{
        resumeId: number;
        projectId: number;
        descIndex: number;
      }>
    ) {
      const { resumeId, projectId, descIndex } = action.payload;
      state.projects[resumeId].projectDetails[projectId].description.splice(
        descIndex,
        1
      );
    },
    removeProjectSection: (
      state,
      action: PayloadAction<{ resumeId: number }>
    ) => {
      const { resumeId } = action.payload;
      state.projects.splice(resumeId, 1);
    },

  },
});

export const {
  updateProjectDetails,
  addProject,
  removeProject,
  addTechStack,
  removeTechStack,
  addDescription,
  removeDescription,
  initializeProjectSection,
  removeProjectSection
} = projectSlice.actions;

export default projectSlice.reducer;
