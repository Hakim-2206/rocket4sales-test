import {configureStore} from "@reduxjs/toolkit"; // fonction de redux toolkit

//import du slice
import peopleSlice from "./slice/peopleSlice.jsx";

// config du store Redux
const store = configureStore({
    // definition du reducer
    reducer: {
        peoples: peopleSlice // le slice peopleSlice gère l'état de peoples
    },
    // middleware utilisé par défaut dans redux pour intercepter les actions avant qu'elles atteingnent le reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([])
})

export default store