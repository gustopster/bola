import React, { CSSProperties, useState } from 'react';
function Contador() {
  const [pessoas, setPessoas] = useState(0);
  const [enviadoComSucesso, setenviadoComSucesso] = useState('');
  const [whats, setWhats] = useState('');
  const [prontoPraEnviar, setProntoPraEnviar] = useState(false); // variável para verificar se é possível enviar a contagem
  const [dica, setDica] = useState({
    texto: 'DICA: Informe o número WhatsApp para começar a contagem!',
    className: 'aviso'
  });
  const [aplicarMargin, setAplicarMargin] = useState<CSSProperties>();
  const verificarWhats = () => {
    const regexWhats = /^[0-9]{2}9[0-9]{8}$/;
    if (whats === '') {
      setDica({ texto: 'Por favor, informe o número do WhatsApp.', className: 'avisoErro' });
      return;
    }
    if (!regexWhats.test(whats)) {
      setDica({ texto: 'Por favor, informe um número WhatsApp válido.', className: 'avisoErro' });
      return;
    }
    setPessoas(pessoas + 1);
    setAplicarMargin({ marginBottom: "18vh", marginTop: '12.5vh', })
    setProntoPraEnviar(true); // Habilitar o botão enviar contagem
    setDica({ texto: dica.texto, className: 'aviso' });
  };
  const enviarContagem = () => {
    if (!prontoPraEnviar) { // Verifica se é possível enviar a contagem
      setDica({ texto: 'Por favor, faça a contagem e insira o número do WhatsApp antes de enviar.', className: 'avisoErro' });
      return;
    }
    setenviadoComSucesso('enviado');
    setDica({ texto: `Foi enviado ${pessoas} pessoas para: ${whats}`, className: 'aviso' });
    setTimeout(() => {
      window.open(`https://wa.me/${whats}?text=Contagem%20de%20pessoas:%20${pessoas}`); // abre o whatsapp com a mensagem
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 3000);
  };
  const handleWhatsChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setWhats(event.target.value);
  };
  return (
    <>
      <div id='container'>
        <h1>Contador</h1>
        {!prontoPraEnviar &&
          <>
            <p className={dica.className}>{dica.texto}</p>
          </>
        }
        <label className='labelWhats'><h3>WhatsApp:</h3>
          <input type="text" inputMode="numeric" maxLength={11} placeholder='DDD/Número' className='inputWhats' onChange={handleWhatsChange} />
        </label>
        <h2 className='totalPessoas' style={aplicarMargin}> {pessoas} Pessoas</h2>

        <div>
          <button id={`${enviadoComSucesso}`} className='botaoContar' onClick={verificarWhats}>
            Click para contar
          </button>
        </div>
        {enviadoComSucesso ? (
          <p className='avisoSucesso'>{dica.texto}</p>
        ) : (
          <div>
            <button className='botaoEnviar' onClick={enviarContagem}>
              Enviar Total
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default Contador;
