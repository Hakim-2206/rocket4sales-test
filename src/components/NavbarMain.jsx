import {
    Navbar,
    Typography,
    Input,
} from "@material-tailwind/react";
import {FaSearch} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {selectPeoples} from "../store/selector/people-selector.js";
import {useEffect, useState} from "react";
import {setFilteredPeoples} from "../store/slice/peopleSlice.jsx";
import {useLocation} from "react-router";

const NavbarMain = () => {
    const peoples = useSelector(selectPeoples) //  Utilisation du sélecteur Redux pour récup la liste des personnes
    const [searchValue, setSearchValue] = useState(""); // hook useState pour gérer la valeur de recherche
    const dispatch = useDispatch()
    const location = useLocation() // hook useLocation pour accéder à l'URL actuelle

    useEffect(() => {
        // filter Filtre les personnes dont le nom inclut la valeur de recherche (insensible à la casse).
        const newPeoples = peoples.filter(value => value.name.toLowerCase().includes(searchValue.toLowerCase()))
        dispatch(setFilteredPeoples(newPeoples))
    }, [searchValue, peoples, dispatch]); // declanchement du useeffect au changement de searchValue,peoples,dispatch

    // verifier si l'url contient perople pour masquer la barre de recherche
    const isProfilePage = location.pathname.includes("/profile/");

    return (
        <div className='w-full'>
            <Navbar
                className={`fixed top-0 left-0 right-0 max-w-screen mx-auto px-2 py-6 z-50 border-gray-600 shadow-2xl
                            shadow-gray-900/50 rounded-none antialiased
                            ${
                    // Condition de bgcolor en fonction de l'url actuelle
                    !isProfilePage ? "bg-gray-800 backdrop-blur-lg" : "bg-gray-800/80 backdrop-blur-sm"
                }`}
            >
                <div
                    className="flex flex-wrap items-center justify-between 2xl:justify-evenly gap-y-4
                                text-white ml-auto">
                    <Typography
                        as="a"
                        href="/"
                        variant="h6"
                        className="hover:scale-110 mr-4 ml-2 cursor-pointer py-1.5 text-xl hover:text-blue-300
                                    transition-all duration-300"
                    >
                        Rocket4Sales

                    </Typography>
                    {/*Condition pour afficher ou non la barre de recherche en fonction de l'url actuelle*/}
                    
                    {
                        !isProfilePage && (
                            <div
                                className="relative flex items-center border border-white rounded-md overflow-hidden">
                                {/* Champ de recherche */}
                                <Input
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    value={searchValue}
                                    type="search"
                                    color="white"
                                    labelProps={{
                                        className: "text-white",
                                    }}
                                    className="bg-transparent text-white border-0 focus:outline-none w-[250px]
                                                md:w-[300px] text-center placeholder-grey"
                                    placeholder="Recherchez une personne..."
                                />
                                <FaSearch className='text-white/40 mr-2'/>
                            </div>
                        )
                    }
                </div>
            </Navbar>
        </div>
    );
}

export default NavbarMain;