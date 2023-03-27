import React, { useState, useEffect } from 'react';
import bibliaLivreData from "./biblialivre.json";
import "./Versiculo.css";
interface BibliaLivre {
  id: string;
  periodo: string;
  nome: string;
  abrev: string;
  capitulos: {
    [key: string]: string[];
  };
}
function Versiculo() {
  const [verse, setVerse] = useState<BibliaLivre>({ id: '', periodo: '', nome: '', abrev: '', capitulos: {} });
  const [bibliaLivre, setBibliaLivre] = useState<BibliaLivre[]>([]);
  const [capitulosAleatorios, setCapitulosAleatorios] = useState<string[]>([]);
  useEffect(() => {
    const bibliaLivreDataTyped = bibliaLivreData as BibliaLivre[];
    setBibliaLivre(bibliaLivreDataTyped);
  }, []);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * bibliaLivre.length);
    const verseData = bibliaLivre[randomNumber];
    if (verseData) {
      setVerse(verseData);
      const capitulos = Object.values(verseData.capitulos);
      const capitulosAleatorios = capitulos.map(cap => cap[Math.floor(Math.random() * cap.length)]);
      setCapitulosAleatorios(capitulosAleatorios);
    }
  }, [bibliaLivre]);
  return (
    <div className='versiculoDiv'>
      <h3>Versículo do Dia</h3>
      <h5>{`Versiculo retirado do livro de: "${verse.nome}"`}</h5>
      <p className='versiculoP'>{`${capitulosAleatorios.join(', ')}`}</p>
    </div>
  );
}
export default Versiculo;