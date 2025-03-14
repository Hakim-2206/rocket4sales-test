/* eslint-disable react-hooks/rules-of-hooks */
import useApi from "../../service/api.service.jsx";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

/*
  Ici, on utilise createAsyncThunk qui permet de gérer des actions asynchrones avec Redux toolkit
  et les transitions d'état liées à ces appels (chargement, succès ou erreur)
  et en générant automatiquement les actions et le reducer associé.
*/

// Initialisation de l'api
const api = useApi()

// action asynchrone pour récup tous les profils
export const fetchPeople = createAsyncThunk(
    "peoples/fetchPeople", // action et reducer
    async (_, thunkAPI) => { // thunkAPI contient le dispatch (getState aussi)
        const res = await api.fetchProfiles(); // appel api
        console.log("Réponse de l'API :", res)
        return res.data // retourne la data
    }
)

// action asynchrone pour récup un seul profil via son id
export const fetchOneProfile = createAsyncThunk(
    "experiences/fetchOneProfile",
    async (userId, thunkAPI) => {
        return (await api.fetchOneProfile(userId)).data
    }
)

// action async pour reset l'erreur aprés un delai de 3.5s

export const resetError = createAsyncThunk(
    "posts/resetError",
    async (time = 3500) => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve("")
            }, time)
        })
    }
)

// Etat initial du slice
const initialState = {
    peoples: [],
    filteredPeoples: [],
    experiences: [],
    isLoading: false,
    error: null
}

// creation du slice redux
const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: { // reducers pour les actions synchrones
        // mettre à jour la liste filtrée
        setFilteredPeoples: (state, action) => {
            state.filteredPeoples = action.payload
        },
        // reset les experiences
        resetExperiences: (state) => {
            state.experiences = []; // Vide les expériences
        },
    },
    extraReducers: (builder) => { // extrareducers pour les actions asynchrones
        builder
            // quand fetchPeople est en attente
            .addCase(fetchPeople.pending, (state) => {
                state.isLoading = true;
            })
            // quand fetchPeople réussit
            .addCase(fetchPeople.fulfilled, (state, action) => {
                state.peoples = action.payload.data
                state.filteredPeoples = action.payload.data
                state.isLoading = false
            })
            // quand fetchPeople échoue
            .addCase(fetchPeople.rejected, (state) => {
                state.isLoading = false
                state.error = "Une erreur est survenue"
            })
        builder
            // fetchOne en attente
            .addCase(fetchOneProfile.pending, (state) => {
                state.isLoading = true
            })
            // fetchOne réussit
            .addCase(fetchOneProfile.fulfilled, (state, action) => {
                state.experiences = action.payload.data
                state.isLoading = false
            })
            // fetchOne échoue
            .addCase(fetchOneProfile.rejected, (state) => {
                state.isLoading = false
                state.error = "Une erreur est survenue"
            })
        builder
            // reset l'erreur aores le timeout
            .addCase(resetError.fulfilled, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {setFilteredPeoples, resetExperiences} = peopleSlice.actions; // export des actions synchrones

export default peopleSlice.reducer; // export du reducer