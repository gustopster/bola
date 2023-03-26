import React, { useState, useEffect } from 'react';
import bibliaLivreData from "./biblialivre.json";

interface BibliaLivre {
  id: string;
  periodo: string;
  nome: string;
  abrev: string;
  capitulos: any;
}

function Versiculo() {
  const [verse, setVerse] = useState<BibliaLivre>({ id: '', periodo: '', nome: '', abrev: '', capitulos: [] });
  const [bibliaLivre, setBibliaLivre] = useState<BibliaLivre[] | any>([]);
  const [capitulosAleatorios, setCapitulosAleatorios] = useState<string>("");

  useEffect(() => {
    setBibliaLivre(bibliaLivreData);
  }, []);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * bibliaLivre.length);
    const verseData = bibliaLivre[randomNumber];

    if (verseData) {
      setVerse(verseData);
      const selecionarVerse = Object.values(verseData.capitulos);
      selecionarVerse.forEach((element: any, index: number) => {
        console.log(`Capitulo ${index}: `, element[index]);
        setCapitulosAleatorios(`Capitulo ${index}: ${element[index]}`);
      });
    }
  }, [bibliaLivre]);

  return (
    <div>
      <h2>Versículo do Dia</h2>
      <p>{`ID: ${verse.id} | Periodo: ${verse.periodo} | Livro: ${verse.nome} | Abreviação: ${verse.abrev} | Capitulo: ${capitulosAleatorios}`}</p>
    </div>
  );
}

export default Versiculo;