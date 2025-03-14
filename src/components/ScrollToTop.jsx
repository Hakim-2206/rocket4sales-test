import React, {useState, useEffect} from 'react';
import {motion} from "framer-motion";
import {ArrowUpIcon} from "@heroicons/react/24/outline/index.js";

const ScrollToTop = () => {

    // hook useState pour gérer l'état de visibilité du bouton.
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fonction qui gère l'affichage du bouton en fonction de la position du scroll.
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300); // Affiche le bouton après 300px de scroll
        };

        // ajout de la methode toggleVisibility au scroll de la page
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"}); // Fonction pour faire défiler la page vers le haut
    };

    return (
        <motion.button
            className={`cursor-pointer fixed bottom-8 right-8 bg-blue-400 hover:bg-blue-500 
                        text-white p-3 rounded-full shadow-lg 
            ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={scrollToTop}
            initial={{opacity: 0, y: 50}}
            animate={{opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50}}
        >
            <ArrowUpIcon className="w-6 h-6"/>
        </motion.button>
    );
}

export default ScrollToTop;