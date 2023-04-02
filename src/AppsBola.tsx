import { useState } from "react";
import MenuHamburger from "./Components/MenuHambuger.tsx";
import Contador from "./Pages/Contador/Contador";
import Formulario from "./Pages/Visitantes/Visitantes";
import Home from "./Pages/Home/Home";
import TabelaFormularios from "./Pages/TabelaFormularios/TabelaFormularios";
import Visitantes from "./Pages/Visitantes/Visitantes";

export default function AppsBola() {
  const [textoDoMenu, setTextoDoMenu] = useState<string>("");

  return (
    <>
      <MenuHamburger onTextoDoMenuChange={setTextoDoMenu} />
      {(textoDoMenu === "Home" || textoDoMenu === "") && <Home />}
      {textoDoMenu === "Contador" && <Contador />}
      {textoDoMenu === "Visitantes" && <Visitantes />}
      {textoDoMenu === "Tabela" && <TabelaFormularios />}
    </>
  );
}
