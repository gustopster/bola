import React, { CSSProperties, useState } from 'react';

function Contador() {
  const [pessoas, setPessoas] = useState(0);
  const [enviadoComSucesso, setEnviadoComSucesso] = useState('');
  const [prontoPraEnviar, setProntoPraEnviar] = useState(false);

  const enviarContagem = () => {
    if (!prontoPraEnviar) {
      return;
    }

    setEnviadoComSucesso('enviado');
    setTimeout(() => {
      window.open(`https://wa.me/5515996881593?text=Contagem%20de%20pessoas:%20${pessoas}`);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 3000);
  };
  return (
    <>
      <div className='contadorDiv'>
        <h1>Contador</h1>
        <h2 className='totalPessoas'> {pessoas} Pessoas</h2>
        <div>
          <button id={`${enviadoComSucesso}`} className='botaoContar' onClick={() => {
            setPessoas(pessoas + 1);
            setProntoPraEnviar(true);
          }}>
            Click para contar
          </button>
        </div>
        {enviadoComSucesso ? (
          <p className='avisoSucesso'>Contagem enviada com sucesso!</p>
        ) : (
          <div>
            <button className='botaoEnviar' onClick={enviarContagem} disabled={!prontoPraEnviar}>
              Enviar Total
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Contador;
