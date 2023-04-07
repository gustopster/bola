import { useState } from "react";
import MenuHamburger from "./Components/MenuHambuger.tsx";
import Contador from "./Pages/Contador/Contador";
import Home from "./Pages/Home/Home";
import Visitantes from "./Pages/Visitantes/Visitantes";
import Obreiros from "./Pages/Obreiros/Obreiros";
import VerificarUser from "./Pages/TabelaFormularios/VerificarUser";
import { usuarios } from "./services/firebaseServer";

export default function AppsBola() {
  const [textoDoMenu, setTextoDoMenu] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [inputSenha, setInputSenha] = useState<string>("");
  const [botaoLoginVisivel, setBotaoLoginVisivel] = useState<boolean>(true);

  function handleEntrar() {
    // Aqui você pode fazer outras validações, como verificar se a senha é válida
    if (inputSenha === usuarios?.boas) {
      setSenha(inputSenha);
      setModalAberto(false);
      setBotaoLoginVisivel(false);
    } else {
      setModalAberto(false);
      alert("Senha incorreta");
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
      {senha === "minhasenha" && textoDoMenu === "Contador" && <Contador />}
      {senha === "minhasenha" && textoDoMenu === "Visitantes" && <Visitantes />}
      {senha === "minhasenha" && textoDoMenu === "DashBoard" && <VerificarUser />}
    </>
  );
}
