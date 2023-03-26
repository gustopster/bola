import React, { useState, useEffect } from 'react';
import bibliaLivreData from "./biblialivre.json";
function Versiculo() {
    const [verse, setVerse] = useState([]);
    const [bibliaLivre, setBibliaLivre] = useState<any>({});
    useEffect(() => {
        return setBibliaLivre(bibliaLivreData);
    }, []);
    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * Object.keys(bibliaLivre).length) + 1;
        const verseData = bibliaLivre[randomNumber.toString()];

        if (verseData) {
            setVerse(verseData)
        }
    }, [bibliaLivre]);
    console.log(verse)
    return (
        <div>
            <h2>Versiculo do Dia</h2>
        </div>
    );
}
export default Versiculo;
