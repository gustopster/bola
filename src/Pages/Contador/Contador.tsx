import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';
import { ContagemPessoas } from '../../types/ContagemPessoas';
import { contagemObreiros } from '../../types/ContagemObreiros';

const Contador = () => {
  const [pessoas, setPessoas] = useState<number>(0);
  const [obreiros, setObreiros] = useState<contagemObreiros>({
    atalaia: 0,
    assistencia: 0,
    boasVindas: 0,
    bolinha: 0,
    cantina: 0,
    diaconia: 0,
    intercessão: 0,
    lojinha: 0,
    louvor: 0,
    zeladoria: 0
  });
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
  }, [pessoas,obreiros]);

  function somarPropriedadesNumericas(objeto: contagemObreiros) {
    let soma = 0;
    for (let propriedade in objeto) {
      if (typeof objeto[propriedade] === "number") {
        soma += objeto[propriedade];
      }
    }
    return soma;
  }
  
  const totalObreiros = somarPropriedadesNumericas(obreiros);

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
      const dadosAntesDoReset = { resultado: pessoas};
      await addDoc(collection(dadosFirebase, "dadosAntesDoReset"), dadosAntesDoReset);

      // resetar o número de pessoas
      const novosDados = { resultado: 0 };
      updateDoc(doc(dadosFirebase, "contagemPessoas", "contador"), novosDados)
        .then(() => {
          setPessoas(0);
        })
        .catch((error) => {
          console.error('Erro ao atualizar o documento:', error);
        });
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
            Resetar/Zerar
          </button>
        </div>
      </div>
    </>
  );
}
export default Contador;