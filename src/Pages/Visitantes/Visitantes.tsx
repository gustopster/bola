import React, { useState } from 'react';
import { Visitante } from '../../types/Visitantes';

function Visitantes() {
  const [nome, setNome] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [celulaSugerida, setCelulaSugerida] = useState('');
  const [bairro, setBairro] = useState('');
  const [pergunta, setPergunta] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar se o email é válido
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    // Verificar se o número de celular é válido
    const celularRegex = /^\d{2}\d{5}\d{4}$/;
    if (!celularRegex.test(whatsApp)) {
      alert('Por favor, insira um número de celular válido (incluindo o DDD e os 9 dígitos).');
      return;
    }

    const visitante: Visitante = { nome, whatsApp, email, celulaSugerida, bairro, pergunta };
    const visitantes: Visitante[] = JSON.parse(localStorage.getItem('visitantes')!) || [];
    visitantes.push(visitante);
    localStorage.setItem('visitantes', JSON.stringify(visitantes));
    setNome('');
    setWhatsApp('');
    setEmail('');
    setCelulaSugerida('');
    setBairro('');
    setPergunta('');
  };
  const handleEnviar = () => {
    const visitantes: Visitante[] = JSON.parse(localStorage.getItem('visitantes')!) || [];
    if (visitantes.length === 0) {
      alert('Não há visitantes para enviar!');
      return;
    }
    if (window.confirm('Após enviar a lista para o WhatsApp, os dados serão excluídos. Deseja mesmo continuar?')) {
      const mensagem = visitantes
        .map((visitante, index) => `${index + 1}. ${visitante.nome} - ${visitante.whatsApp} - ${visitante.email} - ${visitante.bairro} - ${visitante.celulaSugerida} - ${visitante.pergunta}`)
        .join('                                                                                                                                                   ');

      const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
      window.open(url);
      localStorage.removeItem('visitantes');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const regex = /^[0-9]*$/;

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  }

  const visitantes = JSON.parse(localStorage.getItem('visitantes') || '[]');
  return (
    <>
      <div className='visitantesDiv'>
        <h1>Visitantes Registrados: {visitantes.length > 0 ? visitantes.length : 0}</h1>
        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-control">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="whatsapp">Whats:</label>
            <input type="text" onInput={handleInput} value={whatsApp} inputMode="numeric" maxLength={11} onChange={(e) => setWhatsApp(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="email" >E-Mail:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="celula" >Célula Sugerida:</label>
            <input type="text" id="celula" value={celulaSugerida} onChange={(e) => setCelulaSugerida(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="pergunta" >Como conheceu a igreja?</label>
            <input type="text" id="pergunta" value={pergunta} onChange={(e) => setPergunta(e.target.value)} required />
          </div>
          <button className="botaoAdicionarForm" type="submit">Adicionar visitante</button>
          <button onClick={handleEnviar} className="botaoEnviarForm">Enviar para o WhatsApp</button>
        </form>
      </div>
    </>
  );
}
export default Visitantes;
