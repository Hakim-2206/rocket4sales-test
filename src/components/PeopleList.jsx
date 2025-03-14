import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectError, selectFilteredPeoples, selectIsLoading} from "../store/selector/people-selector.js";
import PeopleItem from "./PeopleItem.jsx";
import {motion, AnimatePresence} from "framer-motion";
import {GrPrevious} from "react-icons/gr";
import {GrNext} from "react-icons/gr";
import Loader from "./Loader.jsx"; // import du Loader pour le chargement
import ErrorMessage from "./ErrorMessage.jsx";

const PeopleList = () => {
    // Sélection des données du store Redux
    const filteredPeoples = useSelector(selectFilteredPeoples) //liste filtrée des peoples
    const isLoading = useSelector(selectIsLoading) // status de chargement
    const error = useSelector(selectError) // erreur à afficher

    // Etat pour Pagination
    const [currentPage, setCurrentPage] = useState(1); // hook useState pour gérer la page actuelle
    const itemsPerPage = 15;

    // Calcul des elements à afficher
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPeoples && filteredPeoples.length > 0
        ? filteredPeoples.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    // fonction pour changer de pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    // reset à la page 1 si la liste filteredPeoples change
    useEffect(() => {
        setCurrentPage(1)
    }, [filteredPeoples]);


    // Affichage du loader si les données sont en cours de chargement
    if (isLoading) {
        return <Loader/>
    }

    // Affichage du msg d'erreur en cas d'erreur
    if (error) {
        return <ErrorMessage message={error}/>
    }

    // Animation variants (framer-motion)
    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -20},
    }


    return (
        <div className="py-28">
            {/*Si la liste de personnes n'est pas vide, on affiche*/}
            {filteredPeoples.length ? (
                <>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage} // Change la clé pour déclencher l'animation
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{duration: 0.3}}
                            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                                        2xl:grid-cols-5 gap-4 p-6"
                        >
                            {/*Parcourir currentItems et afficher un component PeopleItem avec un props
                                "people" pour chaque personne et un key correspondant à leur id*/}

                            {
                                currentItems.map((people) => (
                                    <PeopleItem key={people.data_member_id} people={people}/>
                                ))
                            }
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination */}
                    <div className="fixed bottom-0 left-0 right-0 shadow-lg py-4">
                        <div className="flex justify-center mt-8 space-x-2">
                            <button
                                // fonction fléchée au click, car setCurrentPage est asynchrone
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="cursor-pointer px-4 py-2 bg-blue-400/80 hover:bg-blue-400 text-white
                                            rounded disabled:bg-gray-300 transition-colors"
                            >
                                <GrPrevious/>
                            </button>
                            <span className="px-4 py-2 italic">
                                {currentPage} sur {Math.ceil(filteredPeoples.length / itemsPerPage)}
                            </span>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={indexOfLastItem >= filteredPeoples.length}
                                className="cursor-pointer px-4 py-2 bg-blue-400/80 hover:bg-blue-400 text-white
                                            rounded disabled:bg-gray-300 transition-colors"
                            >
                                <GrNext/>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center">Aucune personne à afficher</p>
            )}
        </div>
    );
}

export default PeopleList;