import { useEffect, useState } from 'react';
import { getDoc, updateDoc } from 'firebase/firestore';
import { dadosFirebase } from '../../services/Firebase/Data/firebaseServer';
import { FirestoreData } from '../../types/FirestoreData';

const Contador = () => {
  const [contagem, setContagem] = useState<number>(0);
  const [obreiros, setObreiros] = useState<number>(0);
  const [pessoas, setPessoas] = useState<number>(0);
  useEffect(() => {
    async function getConfig() {
      const snapshot = await getDoc(dadosFirebase);
      const data = snapshot.data() as FirestoreData | undefined;;
      if (data) {
        setContagem(data.contagemPessoas.resultado);
        setObreiros(data.contagemObreiros.resultado);
      }
    }
    getConfig();
  }, [dadosFirebase]);
  const [prontoPraEnviar, setProntoPraEnviar] = useState<boolean>(false);
  const enviarContagem = () => {
    const novosDados = {contagemPessoas: {resultado: pessoas+1}};
    if (!prontoPraEnviar) {
      return;
    } else {

      updateDoc(dadosFirebase, novosDados)
        .then(() => {
          setTimeout(() => {
          }, 500);
        })
        .catch((error) => {
          console.error('Erro ao atualizar o documento:', error);
        });
    }
  }
  if (contagem === null) {
    return (
      <div>Carregando...</div>
    )
  } else {
    return (
      <>
        <div className='contadorDiv'>
          <h1 className='totalPessoas'>Total: {obreiros + pessoas}</h1>
          <h3> {obreiros} Obreiros na Igreja</h3>
          <h2> {contagem > pessoas ? contagem : pessoas} Pessoas na Igreja</h2>
          <div>
          </div>
          <button className='botaoContar' onClick={() => {
            setPessoas(pessoas + 1);
            setProntoPraEnviar(true);
            enviarContagem();
          }}>
            Click para contar
          </button>
        </div>
      </>
    );
  }
}
export default Contador;
