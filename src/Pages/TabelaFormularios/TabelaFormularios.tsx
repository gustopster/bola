import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where, Timestamp, doc } from 'firebase/firestore';
import { dadosFirebase, usuarios } from '../../services/firebaseServer';
import { TabelaFormulario } from '../../types/TabelaFormulario';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
function TabelaFormularios() {
  const [contagem, setContagem] = useState<number>(0);
  const [formularios, setFormularios] = useState<TabelaFormulario[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<number>(0); // inicializa com valor 0
  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value); // cria um objeto Date com a data selecionada
    setDataSelecionada(selectedDate.getTime()); // armazena o valor em milissegundos no estado
  };
  const [contagemSelecionada, setContagemSelecionada] = useState<number>(0);

  useEffect(() => {
    const fetchFormularios = async () => {
      let queryData = query(collection(dadosFirebase, 'formularios'), orderBy('createdAt', 'desc'));
      if (dataSelecionada > 0) {
        // converte o valor em milissegundos em um objeto Timestamp do Firebase
        const timestamp = Timestamp.fromMillis(dataSelecionada);
        // adiciona uma cláusula 'where' na consulta para filtrar os resultados pela data selecionada
        queryData = query(queryData, where('createdAt', '>=', timestamp), where('createdAt', '<', Timestamp.fromMillis(dataSelecionada + 86400000)));
      }

      // Busca a contagem no Firebase
      const contagemSnapshot = await getDocs(collection(dadosFirebase, "dadosAntesDoReset"));
      const contagemConvertida = contagemSnapshot.docs.map((doc) => doc.data());
      // Busca os dados dos formulários no Firebase
      const querySnapshot = await getDocs(queryData);
      const dados: TabelaFormulario[] = [];
      querySnapshot.forEach((doc) => {
        dados.push({ id: doc.id, ...doc.data(), } as TabelaFormulario);
      });

      // Atualiza os estados contagem e formularios
      setContagem(contagemConvertida[0].resultado);
      setFormularios(dados);
    };
    const fetchContagemSelecionada = async () => {
      if (dataSelecionada > 0) {
        const timestamp = Timestamp.fromMillis(dataSelecionada);
        const querySnapshot = await getDocs(
          query(collection(dadosFirebase, 'dadosAntesDoReset'), where('createdAt', '>=', timestamp), where('createdAt', '<', Timestamp.fromMillis(dataSelecionada + 86400000)))
        );
        if (querySnapshot.docs.length > 0) {
          setContagemSelecionada(querySnapshot.docs[0].data().resultado);
        } else {
          setContagemSelecionada(0);
        }
      }
    }; fetchFormularios();
    fetchContagemSelecionada();

  }, [dataSelecionada]);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className={"senhasTabela"}
        onClick={() => {
          setShowModal(true)
          console.log(usuarios)
        }}>SENHAS</button>

      <div className='divVisitantesTable'>
        <h1>Tabela de Visitantes</h1>
        <label className='tabelaVisitantesLabel' htmlFor="data">Qual Culto você deseja visualizar?</label>
        <input type="date" id="data" name="data" value={dataSelecionada > 0 ? new Date(dataSelecionada).toISOString().substr(0, 10) : ''} onChange={handleDataChange} />
      </div>
      {showModal && (
        <div className="modalTabelaSenha">
          <div className="modalTabelaSenha-content">
            <span className="modalTabelaSenha-close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>A senha acessar os Apps Boas Vindas é: "{usuarios?.boas}"</p>
            <p>A senha atual do Dashboard é: "{usuarios?.adm}"</p>
          </div>
        </div>
      )}


      {dataSelecionada > 0 && (
        <div>
          <h2>Total de pessoas nesse Culto: {contagemSelecionada}</h2>
        </div>
      )}


      <table className='tabelaDiv'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>WhatsApp</th>
            <th>Bairro</th>
            <th>Culto</th>
            <th>Como Conheceu o Bola?</th>
          </tr>
        </thead>
        <tbody>
          {formularios.map((formulario) => (
            <tr key={formulario.id}>
              <td>{formulario.nome}</td>
              <td>{formulario.email}</td>
              <td>
                <a
                  href={`https://api.whatsapp.com/send?phone=${formulario.whatsApp}&text=Olá%20Somos%20do%20Bola%20de%20Neve%20Sorocaba,%20estamos%20entrando%20em%20contato%20pois%20você%20nos%20deu%20o%20seu%20contato.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='linkTabela'
                >{formulario.whatsApp}<WhatsAppIcon sx={{ marginLeft: '10px' }} fontSize='medium' />
                </a>
              </td>
              <td>{formulario.bairro}</td>
              <td>{formulario.perguntaCulto}</td>
              <td>{formulario.pergunta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default TabelaFormularios;