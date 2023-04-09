import { useState } from "react";
import MenuHamburger from "./Components/MenuHambuger.tsx";
import Contador from "./Pages/Contador/Contador";
import Home from "./Pages/Home/Home";
import Visitantes from "./Pages/Visitantes/Visitantes";
import Obreiros from "./Pages/Obreiros/Obreiros";
import { usuarios } from "./services/firebaseServer";
import { DocumentData } from "firebase/firestore";
import TabelaFormularios from "./Pages/TabelaFormularios/TabelaFormularios";

export default function AppsBola() {
  const [textoDoMenu, setTextoDoMenu] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [inputSenha, setInputSenha] = useState<string>("");
  const [botaoLoginVisivel, setBotaoLoginVisivel] = useState<boolean>(true);

  async function handleEntrar() {
    const users: DocumentData | undefined = await usuarios;
    // Aqui você pode fazer outras validações, como verificar se a senha é válida
    if (inputSenha === users?.[`App-Boas-Vindas`]) {
      setSenha(inputSenha);
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
      {senha === inputSenha && textoDoMenu === "Contador" && <Contador />}
      {senha === inputSenha && textoDoMenu === "Visitantes" && <Visitantes />}
      {senha === inputSenha && textoDoMenu === "DashBoard" && <TabelaFormularios />}
    </>
  );
}
