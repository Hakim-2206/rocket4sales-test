import React from 'react';
// imports des components à afficher sur la page
import NavbarMain from "../components/NavbarMain.jsx";
import PeopleList from "../components/PeopleList.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

// Page Home
const Home = () => {
    return (
        <div>
            <NavbarMain/>
            <PeopleList/>
            <ScrollToTop/>
        </div>
    );
}

export default Home;