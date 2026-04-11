import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "theme";

const getInitialMode = () => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : "dark";
};

const initialState = {mode: getInitialMode()};


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
            localStorage.setItem(THEME_KEY, state.mode);
        },
        setTheme(state, action) {
            state.mode = action.payload;
            localStorage.setItem(THEME_KEY, state.mode);
        }
    }
});

export const {toggleTheme, setTheme} = themeSlice.actions;
export default themeSlice.reducer;