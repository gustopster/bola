import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';
import { contagemObreiros } from '../../types/ContagemObreiros';
import Ministerios from '../../Components/Ministerios/Ministerios';

const Obreiros = () => {
  const [obreiros, setObreiros] = useState<number>(0);

  useEffect(() => {
    async function getConfig() {
      const snapshot = await getDoc(doc(dadosFirebase, "contagemObreiros", "contador"));
      const data = snapshot.data() as contagemObreiros | undefined;
      if (data) {
        setObreiros(data.resultado);
      }
    }
    getConfig();
  }, [obreiros]);

  const enviarContagem = () => {
    const novosDados = { resultado: obreiros + 1 };
    updateDoc(doc(dadosFirebase, "contagemObreiros", "contador"), novosDados)
      .then(() => { })
      .catch((error) => {
        console.error('Erro ao atualizar o documento:', error);
      });
  }
  return (
    <>
      <div className='obreirosDiv'>
        <h1 className='totalObreiros'>Obreiros na Igreja: {obreiros}</h1>
        <div>
        </div>
        <Ministerios/>
        <button className='botaoContar' onClick={() => {
          setObreiros(obreiros + 1);
          enviarContagem();
        }}>
          Click para contar
        </button>
      </div>
    </>
  );
}

export default Obreiros;
