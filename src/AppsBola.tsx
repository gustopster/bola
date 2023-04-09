import { useState, useEffect } from "react";
import MenuHamburger from "./Components/MenuHambuger.tsx";
import Contador from "./Pages/Contador/Contador";
import Home from "./Pages/Home/Home";
import Visitantes from "./Pages/Visitantes/Visitantes";
import Obreiros from "./Pages/Obreiros/Obreiros";
import { usuarios } from "./services/firebaseServer";
import { DocumentData } from "firebase/firestore";
import TabelaFormularios from "./Pages/TabelaFormularios/TabelaFormularios";

export default function AppsBola() {
  const [usersApp, setUsersApp] = useState<string>("");
  const [textoDoMenu, setTextoDoMenu] = useState<string>("");
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [inputSenha, setInputSenha] = useState<string>("");
  const [botaoLoginVisivel, setBotaoLoginVisivel] = useState<boolean>(true);

  useEffect(() => {
    async function carregarUsuarios() {
      const users: DocumentData | undefined = await usuarios;
      setUsersApp(users?.["App-Boas-Vindas"]);
    }
    carregarUsuarios();
  }, []);

  async function handleEntrar() {
    // Aqui você pode fazer outras validações, como verificar se a senha é válida
    if (inputSenha === usersApp) {
      setModalAberto(false);
      setBotaoLoginVisivel(false);
    } else {
      setModalAberto(false);
      alert("Senha incorreta");
      setInputSenha("");
    }
  }

  return (
    <>
      {botaoLoginVisivel && (
        <button className="botao-login" onClick={() => setModalAberto(true)}>
          Login
        </button>
      )}

      {modalAberto && (
        <div className="modal">
          <input
            className="input-senha"
            type="password"
            value={inputSenha}
            placeholder={"Digite sua senha aqui"}
            onChange={(e) => setInputSenha(e.target.value)}
          />
          <div className="containerLogin">
            <button className="fecharLogin"
              onClick={() => {
                setModalAberto(false);
              }} >
              Fechar
            </button>
            <button
              className="botao-entrar"
              onClick={(e) => {
                e.preventDefault();
                handleEntrar();
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      )}
      <MenuHamburger onTextoDoMenuChange={setTextoDoMenu} />
      {(textoDoMenu === "Home" || textoDoMenu === "") && <Home />}
      {textoDoMenu === "Obreiros" && <Obreiros />}
      {inputSenha === usersApp && textoDoMenu === "Contador" && <Contador />}
      {inputSenha === usersApp && textoDoMenu === "Visitantes" && <Visitantes />}
      {inputSenha === usersApp && textoDoMenu === "DashBoard" && <TabelaFormularios />}
    </>
  );
}