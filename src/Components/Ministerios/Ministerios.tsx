import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { dadosFirebase } from "../../services/firebaseServer";
import { contagemObreiros } from "../../types/ContagemObreiros";

const MINISTRIES = [
  "Atalaia",
  "Assistência",
  "Boas Vindas",
  "Bolinha",
  "Cantina",
  "Diaconia",
  "Intercessão",
  "Lojinha",
  "Louvor",
  "Zeladoria",
];

const Ministerios = (props: contagemObreiros) => {
  const [ministries, setMinistries] = useState<contagemObreiros>(props);

  const handleInputValue = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newMinistries: contagemObreiros = { ...ministries };
    newMinistries[Object.keys(ministries)[index] as keyof contagemObreiros] = parseInt(event.target.value);
    setMinistries(newMinistries);
  };
  

  const enviarContagem = () => {
    const novosDados = {
      atalaia: ministries.atalaia,
      assistencia: ministries.assistencia,
      boasVindas: ministries.boasVindas,
      bolinha: ministries.bolinha,
      cantina: ministries.cantina,
      diaconia: ministries.diaconia,
      intercessão: ministries.intercessão,
      lojinha: ministries.lojinha,
      louvor: ministries.louvor,
      zeladoria: ministries.zeladoria,
    };
    updateDoc(doc(dadosFirebase, "contagemObreiros", "contador"), novosDados)
      .then(() => { })
      .catch((error) => {
        console.error('Erro ao atualizar o documento:', error);
      });
  };
  return (
    <>
      {MINISTRIES.map((ministry, index) => (
        <div key={index}>
        <label>{ministry}:</label>
        <input 
          className="inputObreiros"
          type="number"
          placeholder={`Servindo agora: ${props[Object.keys(ministries)[index] as keyof contagemObreiros]}`}
          onChange={(event) => handleInputValue(index, event)}
        />
      </div> 
      ))}
      <button className="botaoSalvarObreiros" onClick={enviarContagem}>SALVAR</button>
    </>
  );
};

export default Ministerios;