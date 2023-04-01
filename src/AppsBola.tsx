import { useState } from "react";
import MenuHamburger from "./Components/MenuHambuger.tsx";
import Teste from "./Pages/Contador/Contador";
import Contador from "./Pages/Contador/Contador";
import Home from "./Pages/Home/Home";
import Visitantes from "./Pages/Visitantes/Visitantes";

export default function AppsBola() {
  const [textoDoMenu, setTextoDoMenu] = useState<string>("");

  return (
    <>
      <MenuHamburger onTextoDoMenuChange={setTextoDoMenu} />
      {(textoDoMenu === "Home" || textoDoMenu === "") && <Home />}
      {textoDoMenu === "Contador" && <Contador />}
      {textoDoMenu === "Visitantes" && <Visitantes />}
      {textoDoMenu === "Teste" && <Teste />}
    </>
  );
}
