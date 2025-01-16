import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allVacancies: [],
  activeVacancies: [],
  archivedVacancies: [],
  moderatedVacancies: [],
  currentVacancies: [],
  modeStep: "Все вакансии",
  isPatch: false,
};

const CompanyVacanciesSlice = createSlice({
  name: 'companyVacancies',
  initialState,
  reducers: {
    setAllVacancies: (state, action) => {
      state.allVacancies = action.payload;
    },
    setActiveVacancies: (state, action) => {
      state.activeVacancies = action.payload;
    },
    setArchivedVacancies: (state, action) => {
      state.archivedVacancies = action.payload;
    },
    setModeratedVacancies: (state, action) => {// ,,,
      state.moderatedVacancies = action.payload;
    },
    setCurrentVacancies: (state) => {
      if(state.modeStep === "Все вакансии") state.currentVacancies = state.allVacancies;
      if(state.modeStep === "Активные") state.currentVacancies = state.activeVacancies;
      if(state.modeStep === "Архивные") state.currentVacancies = state.archivedVacancies;
      if(state.modeStep === "На модерации") state.currentVacancies = state.moderatedVacancies;
    },
    setModeStep: (state, action) => {
      state.modeStep = action.payload;
    },
    setIsPatch: (state) => {
      state.isPatch = !state.isPatch;
    },
  },
});

export const { setAllVacancies, setActiveVacancies,  setArchivedVacancies, setModeratedVacancies, setCurrentVacancies, setModeStep, setIsPatch } = CompanyVacanciesSlice.actions;

export default CompanyVacanciesSlice.reducer;
