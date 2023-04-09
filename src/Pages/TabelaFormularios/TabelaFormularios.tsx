import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where, Timestamp, doc, DocumentData, updateDoc } from 'firebase/firestore';
import { dadosFirebase, usuarios } from '../../services/firebaseServer';
import { TabelaFormulario } from '../../types/TabelaFormulario';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { userType } from '../../types/User';

function TabelaFormularios() {
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
      const querySnapshot = await getDocs(queryData);
      const dados: TabelaFormulario[] = [];
      querySnapshot.forEach((doc) => {
        dados.push({ id: doc.id, ...doc.data(), } as TabelaFormulario);
      });
      // Atualiza os estados contagem e formularios
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
  const [selectedPassword, setSelectedPassword] = useState('');
  const users: Promise<userType | DocumentData | undefined> = usuarios;
  const [senha, setSenha] = useState('');
  const [acessoPermitido, setAcessoPermitido] = useState(false);
  const verificarSenha = async () => {

    if (senha === (await users)?.DashBoard) {
      setAcessoPermitido(true);
    } else {
      alert('Senha incorreta. Por favor, entre em contato com o líder do ministério para obter acesso.');
    }
  }
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  async function handleSubmit(evento: { preventDefault: () => void; }) {
    evento.preventDefault();
    if (selectedPassword) {
      if (password1 === "" || password2 === "") {
        alert("Não pode ser vazio");
      } else if (password1 !== password2) {
        alert("As senhas devem ser iguais!");
      } else {
        alert("Senha alterada com sucesso!")
        const resultado = password2;
        const data = await usuarios;
        if (data) {
          data[selectedPassword] = resultado;
          await updateDoc(doc(dadosFirebase, 'perfis/usuarios'), { [selectedPassword]: resultado });
          setShowModal(false);
          setPassword1("");
          setPassword2("");
        } else {
          console.log("Não foi possível atualizar a senha. Tente novamente mais tarde.");
        }
      }
    }
  }

  return (
    <>
      {!acessoPermitido && (
        <>
          <div className="container-verificar-user">
            <label htmlFor="senha">
              Área Administrativa:
              <input
                id="senha"
                className="input-senha-verifica"
                placeholder="Digite sua senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>
            <button className="botao-entrar-verifica" onClick={verificarSenha}>
              Entrar
            </button>
          </div>
        </>
      )}
      {acessoPermitido && (
        <>
          <button
            className={"senhasTabela"}
            onClick={() => {
              setShowModal(true);
              setSelectedPassword('');
            }}>
            SENHAS
          </button>
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
                <div className="containerSenha">
                  <label htmlFor="select-senhas">Selecione qual das senhas você deseja alterar:</label>
                  <select
                    className='containerSenhaSelect'
                    style={{ marginLeft: "10px" }}
                    value={selectedPassword}
                    onChange={(event) => setSelectedPassword(event.target.value)}
                    id="select-senhas">
                    <option className='containerSenhaOption'>Selecione...</option>
                    <option className='containerSenhaOption'>App-Boas-Vindas</option>
                    <option className='containerSenhaOption'>DashBoard</option>
                  </select>
                  {selectedPassword === 'App-Boas-Vindas' && (
                    <>
                      <div className='respostaSenha'>
                        <form onSubmit={handleSubmit}>
                          <label>
                            Senha:
                            <input type="password" value={password1} onChange={e => setPassword1(e.target.value)} />
                          </label>
                          <label>
                            Confirme a senha:
                            <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                          </label>
                          <button className='salvarSenhaTabela' type="submit">Trocar Senha</button>
                        </form>
                      </div>
                    </>
                  )}
                  {selectedPassword === 'DashBoard' && (
                    <>
                      <div className='respostaSenha'>
                        <form onSubmit={handleSubmit}>
                          <label className='containerSenhaOption'>
                            Senha:
                            <input type="password" value={password1} onChange={e => setPassword1(e.target.value)} />
                          </label>
                          <label>
                            Confirme a senha:
                            <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                          </label>
                          <button className='salvarSenhaTabela' type="submit">Trocar Senha</button>
                        </form>
                      </div>
                    </>
                  )}
                </div>
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
      )}
    </>
  );
}
export default TabelaFormularios;