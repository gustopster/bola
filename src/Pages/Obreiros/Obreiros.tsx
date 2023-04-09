import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';
import { contagemObreiros } from '../../types/ContagemObreiros';
import Ministerios from '../../Components/Ministerios/Ministerios';

const Obreiros = () => {
  const [atalaia, setAtalaia] = useState<number>(0);
  const [assistencia, setAssistencia] = useState<number>(0);
  const [boasVindas, setBoasVindas] = useState<number>(0);
  const [bolinha, setBolinha] = useState<number>(0);
  const [cantina, setCantina] = useState<number>(0);
  const [diaconia, setDiaconia] = useState<number>(0);
  const [intercessão, setIntercessão] = useState<number>(0);
  const [lojinha, setLojinha] = useState<number>(0);
  const [louvor, setLouvor] = useState<number>(0);
  const [som, setSom] = useState<number>(0);
  const [zeladoria, setZeladoria] = useState<number>(0);

  useEffect(() => {
    async function getConfig() {
      const snapshot = await getDoc(doc(dadosFirebase, "contagemObreiros", "contador"));
      const data = snapshot.data() as contagemObreiros | undefined;
      if (data) {
        setAssistencia(data.Assistência);
        setAtalaia(data.Atalaia);
        setBoasVindas(data.BoasVindas);
        setBolinha(data.Bolinha);
        setCantina(data.Cantina);
        setDiaconia(data.Diaconia);
        setIntercessão(data.Intercessão);
        setLojinha(data.Lojinha);
        setLouvor(data.Louvor);
        setSom(data.Som);
        setZeladoria(data.Zeladoria);
      }
    }
    getConfig();
  }, []);
  return (
    <Ministerios BoasVindas={boasVindas} Lojinha={lojinha} Intercessão={intercessão} Zeladoria={zeladoria} Atalaia={atalaia} Cantina={cantina} Diaconia={cantina} Louvor={louvor} Assistência={assistencia} Bolinha={bolinha} Som={som} />
  );
}

export default Obreiros;
