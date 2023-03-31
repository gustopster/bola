import React, { useState, useEffect } from 'react';
import bibliaLivreData from "./biblialivre.json";
import "./Versiculo.css";

interface BibliaLivre {
  id?: string;
  periodo?: string;
  nome?: string;
  abrev?: string;
  capitulos?: {
    [key: string]: string[];
  };
}

function Versiculo() {
  const bibliaLivreDataTyped: BibliaLivre[] = (bibliaLivreData as BibliaLivre[]);
  const [versiculo, setVersiculo] = useState<string>("");
  const [referencia, setReferencia] = useState<string>("");

  useEffect(() => {
    const randomBookIndex = Math.floor(Math.random() * bibliaLivreDataTyped.length);
    const randomBook = bibliaLivreDataTyped[randomBookIndex];
    const randomChapterIndex = Math.floor(Math.random() * Object.keys(randomBook.capitulos || {}).length);
    const randomChapterKey = Object.keys(randomBook.capitulos || {})[randomChapterIndex];
    const randomChapter = randomBook.capitulos ? randomBook.capitulos[randomChapterKey] : [];
    const randomVerseIndex = Math.floor(Math.random() * randomChapter.length);
    const randomVerse = randomChapter[randomVerseIndex];
    setVersiculo(randomVerse);
    setReferencia(`${randomBook.nome} ${parseInt(randomChapterKey) + 1}:${randomVerseIndex + 1}`);
  }, []);

  return (
    <div className='versiculoDiv'>
      <h1>Seu Versículo</h1>
      <h2> Livro de: {referencia}</h2>
      <h3>{versiculo}</h3>
    </div>
  );
}

export default Versiculo;