import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    token: null,
    mail: "",
    data: [],
};

export const loadTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token !== null ? token : null;
    } catch (error) {
        console.error("Error loading token from storage:", error);
        return null;
    }
};

export const userStore = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.toString();
            AsyncStorage.setItem("token", state.token).catch(error => console.error("Error saving token to storage:", error));
        },
        clearToken: (state) => {
            state.token = null;
            AsyncStorage.removeItem("token").catch(error => console.error("Error removing token from storage:", error));
        },
        setMail: (state, action) => {
            state.mail = action.payload.toString();
            AsyncStorage.setItem("mail", state.mail).catch(error => console.error("Error saving mail to storage:", error));
        },
        clearMail: (state) => {
            state.mail = "";
            AsyncStorage.removeItem("mail").catch(error => console.error("Error removing mail from storage:", error));
        },
        setData: (state, action) => {
            const newData = [...state.data, { id: state.data.length + 1, ...action.payload }];
            AsyncStorage.setItem("employee", JSON.stringify(newData)).catch(error => console.error("Error saving data to storage:", error));
            state.data = newData;
        },
        clearData: (state) => {
            state.data = [];
            AsyncStorage.setItem("employee", JSON.stringify([])).catch(error => console.error("Error saving data to storage:", error));
        },

    },
});

export const { setToken, clearToken, setData, clearData, setMail, clearMail } = userStore.actions;

export default userStore.reducer;
