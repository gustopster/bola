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
  const [zeladoria, setZeladoria] = useState<number>(0);

  useEffect(() => {
    async function getConfig() {
      const snapshot = await getDoc(doc(dadosFirebase, "contagemObreiros", "contador"));
      const data = snapshot.data() as contagemObreiros | undefined;
      if (data) {
        setAssistencia(data.assistencia);
        setAtalaia(data.atalaia);
        setBoasVindas(data.boasVindas);
        setBolinha(data.bolinha);
        setCantina(data.cantina);
        setDiaconia(data.diaconia);
        setIntercessão(data.intercessão);
        setLojinha(data.lojinha);
        setLouvor(data.louvor);
        setZeladoria(data.zeladoria);
      }
    }
    getConfig();
  }, []);
  return (
    <>
      <div className='obreirosDiv'>
        <Ministerios
          atalaia={atalaia}
          assistencia={assistencia}
          boasVindas={boasVindas}
          bolinha={bolinha}
          cantina={cantina}
          diaconia={diaconia}
          intercessão={intercessão}
          lojinha={lojinha}
          louvor={louvor}
          zeladoria={zeladoria}
        />
      </div>
    </>
  );
}

export default Obreiros;
