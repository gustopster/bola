import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { dadosFirebase } from "../../services/firebaseServer";
import { contagemObreiros } from "../../types/ContagemObreiros";

const MINISTRIES = [
  "Atalaia",
  "Assistência",
  "BoasVindas",
  "Bolinha",
  "Cantina",
  "Diaconia",
  "Intercessão",
  "Lojinha",
  "Louvor",
  "Som",
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
      .then(() => {
        alert("Obrigado por informar, tenha uma ótima escala!");
        window.location.reload();
       })
      .catch((error) => {
        console.error('Erro ao atualizar o documento:', error);
      });
  };
  return (
    <>
      <div className="divMinisterio">
        {!selectedMinistry && (
          <div className="selectedMinistryBox">
            <p style={{ color: "white" }}>Selecione seu ministério:</p>
            {MINISTRIES.map((ministry, index) => (
              <button key={index} className="ministryButton" onClick={() => selectMinistry(ministry)}>
                {ministry}
              </button>
            ))}
          </div>
        )}{selectedMinistry && (
          <div className="selected-ministry">
            <label>Atualize quantos estão em {selectedMinistry}:</label>
            <input
              className="inputObreiros"
              type="number"
              placeholder="Informe isso aqui"
              onChange={handleInputValue}
            />
            <div className="button-group">
              <button className="botaoVoltar" onClick={() => setSelectedMinistry(null)}>VOLTAR</button>
              <button className="botaoSalvar" onClick={enviarContagem}>SALVAR</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Ministerios;
