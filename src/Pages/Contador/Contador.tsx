import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dadosFirebase } from '../../services/Firebase/firebaseServer';
const Contador = () => {
  const [contagem, setContagem] = useState<number>(0);
  const [obreiros, setObreiros] = useState<number>(0);
  const [pessoas, setPessoas] = useState<number>(0);
  useEffect(() => {
    async function getConfig() {
      const snapshot = await getDoc(dadosFirebase);
      const data = snapshot.data();
      const contagem = data?.contagem ?? 0;
      const obreiros = data?.obreiros ?? 0;
      setContagem(contagem);
      setPessoas(contagem);
      setObreiros(obreiros);
    }
    getConfig();
  }, [dadosFirebase]);
  const [enviadoComSucesso, setEnviadoComSucesso] = useState<string>('');
  const [prontoPraEnviar, setProntoPraEnviar] = useState<boolean>(false);
  const enviarContagem = () => {
    const novosDados = { contagem: pessoas +1 };
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
          <h1 className='totalPessoas'>Total: {obreiros+pessoas}</h1>
          <h3> {obreiros} Obreiros na Igreja</h3>
          <h2> {contagem > pessoas ? contagem : pessoas} Pessoas na Igreja</h2>
          <div>
          </div>
          <button id={`${enviadoComSucesso}`} className='botaoContar' onClick={() => {
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
