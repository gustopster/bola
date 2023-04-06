import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';
import { ContagemPessoas } from '../../types/ContagemPessoas';
import { contagemObreiros } from '../../types/ContagemObreiros';

const Contador = () => {
  const [pessoas, setPessoas] = useState<number>(0);

  function somarPropriedadesNumericas(objeto: contagemObreiros) {
    let soma = 0;
    for (let propriedade in objeto) {
      if (typeof objeto[propriedade] === "number") {
        soma += objeto[propriedade];
      }
    }
    return soma;
  }
  const [obreiros, setObreiros] = useState<contagemObreiros>({
    "Lojinha": 0,
    "Intercessão": 0,
    "BoasVindas": 0,
    "Zeladoria": 0,
    "Atalaia": 0,
    "Cantina": 0,
    "Diaconia": 0,
    "Louvor": 0,
    "Assistência": 0,
    "Bolinha": 0
  });
  const totalObreiros = somarPropriedadesNumericas(obreiros);
  useEffect(() => {
    async function getConfig() {
      const snapshotObreiros = await getDoc(doc(dadosFirebase, "contagemObreiros", "contador"));
      const dataObreiros = snapshotObreiros.data() as contagemObreiros | undefined;
      const snapshotPessoas = await getDoc(doc(dadosFirebase, "contagemPessoas", "contador"));
      const dataPessoas = snapshotPessoas.data() as ContagemPessoas | undefined;
      if (dataPessoas && dataObreiros) {
        setObreiros(dataObreiros);
        setPessoas(dataPessoas.resultado);
      }
    }
    getConfig()
  }, [pessoas, totalObreiros]);

  const enviarContagem = () => {
    const novosDados = { resultado: pessoas + 1 };
    updateDoc(doc(dadosFirebase, "contagemPessoas", "contador"), novosDados)
      .then(() => { })
      .catch((error) => {
        console.error('Erro ao atualizar o documento:', error);
      });
  }

  const resetarPessoas = async () => {
    const confirmacao = window.confirm('Tem certeza que deseja resetar o número de pessoas?');
    if (confirmacao) {
      // salvar os dados antes de resetar
      const dadosAntesDoReset = { resultado: pessoas + totalObreiros };
      await addDoc(collection(dadosFirebase, "dadosAntesDoReset"), dadosAntesDoReset);

      // resetar o número de pessoas
      const novosDadosPessoas = { resultado: 0 };
      const novosDadosObreiros = {
        "Lojinha": 0,
        "Intercessão": 0,
        "BoasVindas": 0,
        "Zeladoria": 0,
        "Atalaia": 0,
        "Cantina": 0,
        "Diaconia": 0,
        "Louvor": 0,
        "Assistência": 0,
        "Bolinha": 0
      }
      updateDoc(doc(dadosFirebase, "contagemPessoas", "contador"), novosDadosPessoas)
        .then(() => {
          setPessoas(0);
        })
        .catch((error) => {
          console.error('Erro ao atualizar o documento:', error);
        });
      updateDoc(doc(dadosFirebase, "contagemObreiros", "contador"), novosDadosObreiros)
        .then(() => {
          setPessoas(0);
        })
        .catch((error) => {
          console.error('Erro ao atualizar o documento:', error);
        });
      alert("Contagem salva com sucesso.");
      window.location.reload();
    }
  }
  return (
    <>
      <div className='contadorDiv'>
        <h1 className='totalPessoas'>Total: {pessoas + totalObreiros}</h1>
        <h3> {totalObreiros} Obreiros na Igreja</h3>
        <h2> {pessoas} Pessoas na Igreja</h2>
        <div>
          <button className='botaoContar' onClick={() => {
            setPessoas(pessoas + 1);
            enviarContagem();
          }}>
            Click para contar
          </button>
        </div>
        <div>
          <button className='botaoResetar' onClick={resetarPessoas}>
            Salvar Contagem e Zerar
          </button>
        </div>
      </div>
    </>
  );
}
export default Contador;