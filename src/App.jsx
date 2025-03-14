import React, {useEffect} from 'react';
import Home from "./pages/Home.jsx";
import {useDispatch} from "react-redux"; // import du dispatch pour envoyer les actions
import {fetchPeople} from "./store/slice/peopleSlice.jsx";
import {Route, Routes} from "react-router"; // Routes et Route de react-router pour gerer la navigation
import PeopleDetails from "./pages/PeopleDetails.jsx";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPeople())
    }, [dispatch]); // effet lors du montage de dispatch

    return (
        <div className="scrollbar-hide overflow-y-auto">
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/profile/:userId"} element={<PeopleDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;