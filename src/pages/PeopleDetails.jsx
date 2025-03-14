import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectError, selectIsLoading, selectOneProfile, selectPeoples} from "../store/selector/people-selector.js";
import {useNavigate, useParams} from "react-router";
import {fetchOneProfile, resetExperiences} from "../store/slice/peopleSlice.jsx";
import PeopleItem from "../components/PeopleItem.jsx";
import {motion, AnimatePresence} from "framer-motion";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import NavbarMain from "../components/NavbarMain.jsx";

const PeopleDetails = () => {
    const {userId} = useParams() // Récupère l'ID de la personne depuis l'URL.
    const peoples = useSelector(selectPeoples) // recup liste de personne depuis le store
    const experiences = useSelector(selectOneProfile) // recup des experiences depuis le store
    const dispatch = useDispatch() // dispatch des actions
    const navigate = useNavigate() // gestion de la navigation
    const isLoading = useSelector(selectIsLoading) // recup l'etat du chargement
    const error = useSelector(selectError) // recup les erreurs

    // fonction qui regroupe les exp par entreprise
    const groupExperiencesByCompany = (experiences) => {
        return experiences.reduce((acc, experience) => {
            // si l'entreprise n'existe pas, on renvoie un tableau vide
            const companyName = experience.company_name;
            if (!acc[companyName]) {
                acc[companyName] = []; // tableau vide
            }
            acc[companyName].push(experience); // groupe les exp par entreprise dans un tableau
            return acc;
        }, {});
    };

    // Effectuer le chargement des données
    useEffect(() => {
        dispatch(resetExperiences())
        dispatch(fetchOneProfile(userId))
    }, [dispatch, userId]);

    // Cherche la personne correspondant à l'userId dans la liste des personnes.
    const people = peoples.find((p) => p.data_member_id === parseInt(userId))

    if (!isLoading && !people) {
        return <div className="text-center">Utilisateur non trouvé</div>;
    }

    if (isLoading) {
        return <Loader/>
    }

    if (error) {
        return <ErrorMessage message={error}/>
    }

    if (!isLoading && experiences.length === 0) {
        return (
            <div>
                <PeopleItem people={people}/>
                <p className="text-center">Aucune expérience trouvée pour cet utilisateur.</p>
            </div>
        );
    }

    const groupedExperiences = groupExperiencesByCompany(experiences); // const qui regroupe les exp par entreprise

    // Variants pour les animations
    const profileVariants = {
        hidden: {opacity: 0, y: -50},
        visible: {opacity: 1, y: 25, transition: {duration: 0.7, ease: "easeOut"}},
    };

    const titleVariants = {
        hidden: {opacity: 0, y: -20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5, delay: 0.3}},
    };

    const experienceVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
    };

    const buttonVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: {opacity: 1, scale: 1, transition: {duration: 0.3, delay: 0.3}},
    };


    return (
        <>
            <NavbarMain/>
            <div className="min-h-screen bg-gray-800">
                <div className="p-15 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    {/* Affichage du profil utilisateur */}
                    <motion.div
                        variants={profileVariants}
                        initial="hidden"
                        animate="visible"
                        className="mx-auto w-full sm:w-[300px] mt-16"
                    >
                        <PeopleItem people={people}/>
                    </motion.div>

                    {/* Titre des expériences */}
                    <motion.h1
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center p-10 mt-10 rounded-lg text-blue-400 text-4xl"
                    >
                        Experiences
                    </motion.h1>
                    <hr className="text-lightWhite"/>

                    {/* Affichage des expériences en grid */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/*Utilisation de Object.entries pour obtenir un tableau des entreprises et de leurs expériences*/}
                        {Object.entries(groupedExperiences)
                            .map(([companyName, experiences], companyIndex) => (
                                <motion.div
                                    key={companyName}
                                    variants={experienceVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{delay: companyIndex * 0.2}}
                                    className="bg-lightWhite rounded-xl shadow-md p-6"
                                >
                                    <h2 className="text-2xl font-bold text-blue-400 mb-4">{companyName}</h2>
                                    <div className="space-y-4">
                                        {experiences.map((exp, index) => (
                                            <motion.div
                                                key={index}
                                                variants={experienceVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{delay: index * 0.2}}
                                                className="border-l-4 border-blue-200 pl-4"
                                            >
                                                <div
                                                    className="flex flex-col sm:flex-row justify-between items-start
                                                            sm:items-center">
                                                    <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                                                    <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                                            {exp.start_date} - {exp.end_date || "Present"}
                                        </span>
                                                </div>
                                                <h4 className="text-sm font-semibold text-gray-800">{exp.contract}</h4>
                                                {exp.location && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        <em>{exp.location}</em>
                                                    </p>
                                                )}
                                                {exp.description && (
                                                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                                        {exp.description}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                    </div>

                    {/* Bouton de retour */}
                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 cursor-pointer fixed bottom-5 left-1/2 transform -translate-x-1/2 p-2
                                    bg-blue-300 rounded-full hover:bg-blue-200 transition-colors"
                    >
                        X
                    </motion.button>
                </div>
            </div>
        </>
    );
}

export default PeopleDetails;