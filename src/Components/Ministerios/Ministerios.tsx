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
  const [selectedMinistry, setSelectedMinistry] = useState<string | null>(null);

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedMinistry) {
      const newMinistries: contagemObreiros = { ...ministries };
      newMinistries[selectedMinistry as keyof contagemObreiros] = parseInt(event.target.value);
      setMinistries(newMinistries);
    }
  };

  const selectMinistry = (ministry: string) => {
    setSelectedMinistry(ministry);
  };

  const enviarContagem = () => {
    const novosDados = {
      [selectedMinistry as string]: ministries[selectedMinistry as string],
    };
    updateDoc(doc(dadosFirebase, "contagemObreiros", "contador"), novosDados)
      .then(() => { })
      .catch((error) => {
        console.error('Erro ao atualizar o documento:', error);
      });
  };

  const teste = selectedMinistry ? props[selectedMinistry as keyof contagemObreiros] : 0;

  return (
    <>
      {!selectedMinistry && (
        <div>
          <p>Selecione um ministério:</p>
          {MINISTRIES.map((ministry, index) => (
            <button key={index} onClick={() => selectMinistry(ministry)}>{ministry}</button>
          ))}
        </div>
      )}

      {selectedMinistry && (
        <div>
          <label>Atualize quantos estão em {selectedMinistry}:</label>
          <input 
            className="inputObreiros"
            type="number"
            placeholder="Informe isso aqui"
            onChange={handleInputValue}
          />
          <button className="botaoSalvarObreiros" onClick={enviarContagem}>SALVAR</button>
          <button onClick={() => setSelectedMinistry(null)}>Voltar</button>
        </div>
      )}
    </>
  );
};

export default Ministerios;
