import React, { useState } from 'react';
import TabelaFormularios from './TabelaFormularios';

function VerificarUser() {
  const [senha, setSenha] = useState('');
  const [acessoPermitido, setAcessoPermitido] = useState(false);

  const verificarSenha = () => {
    if (senha === '123') {
      setAcessoPermitido(true);
    } else {
      alert('Senha incorreta. Por favor, entre em contato com o líder do ministério para obter acesso.');
    }
  }

  return (
    <>
      {!acessoPermitido && (
        <>
          <div className="container-verificar-user">
            <label htmlFor="senha">
              Senha:
              <input
                id="senha"
                className="input-senha-verifica"
                placeholder="Digite a senha da tabela"
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
          <TabelaFormularios />
        </>
      )}
    </>
  );
}

export default VerificarUser;
