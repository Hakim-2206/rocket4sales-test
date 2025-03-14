import React from 'react';
import {FaLinkedin} from "react-icons/fa";
import {Link, useNavigate} from "react-router";
import {motion} from "framer-motion";

// Définition du composant PeopleItem qui a 'people' comme prop
const PeopleItem = ({people}) => {
    const silhouetteUrl = "https://www.gravatar.com/avatar/?d=mp&f=y"; // le d=mp correspond a mystery person
    const navigate = useNavigate() // hook navigate pour la redirection

    // fonction pour rediriger vers le profil en question via l'url
    const handleCardClick = () => {
        navigate(`/profile/${people.data_member_id}`);
    };

    return (

        <motion.div
            onClick={handleCardClick} // appel de la fonction handleCardClick lors du clic sur la div
            whileTap={{scale: 0.93, bowShadow: "0px 6px 12px rgba(0,0,0,0.15)"}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            className="cursor-pointer flex flex-col items-center text-center p-5 w-[300px] h-[350px] mx-auto
                        bg-white rounded-xl shadow-md">
            {/* Photo de profil */}
            <Link to={`/profile/${people.data_member_id}`}>
                <img
                    alt={people.name}
                    height="96"
                    src={silhouetteUrl} // Image par défaut generée par gravatar.com
                    width="96"
                    className="mb-4 rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                />
            </Link>
            {/* Nom */}
            <Link to={`/profile/${people.data_member_id}`}>
                <h2 className="mb-2 text-xl font-bold text-blue-300 hover:text-blue-400 transition-colors ">
                    {people.name}
                </h2>
            </Link>
            {/* Titre (headline) */}
            <p className="text-sm font-medium text-gray-400 line-clamp-3">
                {people.headline}
            </p>

            {/* Localisation */}
            <p className="text-sm mt-auto text-gray-400 flex-shrink-0">
                <em>{people.location}</em>
            </p>

            {/* Icône LinkedIn avec redirection vers url */}
            <div className="mt-auto flex-shrink-0">
                <a
                    href={people.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-700 hover:text-cyan-800 transition-colors"
                >
                    <FaLinkedin className="w-6 h-6"/> {/* Balise icône LinkedIn via react-icons */}
                </a>
            </div>
        </motion.div>
    );
}

export default PeopleItem;