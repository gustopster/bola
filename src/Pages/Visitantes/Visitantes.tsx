import React, { useState } from 'react';
interface Visitante {
  nome: string;
  whatsApp: string;
  email: string;
  celulaSugerida: string;
  bairro: string;
}
function Visitantes() {
  const [nome, setNome] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [celulaSugerida, setCelulaSugerida] = useState('');
  const [bairro, setBairro] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const visitante: Visitante = { nome, whatsApp, email, celulaSugerida, bairro };
    const visitantes: Visitante[] = JSON.parse(localStorage.getItem('visitantes')!) || [];
    visitantes.push(visitante);
    localStorage.setItem('visitantes', JSON.stringify(visitantes));
    setNome('');
    setWhatsApp('');
    setEmail('');
    setCelulaSugerida('');
    setBairro('');
  };
  const handleEnviar = () => {
    const visitantes: Visitante[] = JSON.parse(localStorage.getItem('visitantes')!) || [];
    if (visitantes.length === 0) {
      alert('Não há visitantes para enviar!');
      return;
    }
    if (window.confirm('Após enviar a lista para o WhatsApp, os dados serão excluídos. Deseja mesmo continuar?')) {
      const mensagem = visitantes
        .map((visitante, index) => `${index + 1}. ${visitante.nome} - ${visitante.whatsApp} - ${visitante.email} - ${visitante.bairro} - ${visitante.celulaSugerida}`)
        .join('                                                                                                                                                   ');

      const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
      window.open(url);
      localStorage.removeItem('visitantes');
    }
  };

  const visitantes = JSON.parse(localStorage.getItem('visitantes') || '[]');
  return (
    <>
      <div className='formContainer'>
        <h1>Visitantes Registrados: {visitantes.length > 0 ? visitantes.length : 0}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="whatsapp">Whats:</label>
            <input
              type="text"
              id="whatsapp"
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="celula">Célula:</label>
            <input
              type="text"
              id="celula"
              value={celulaSugerida}
              onChange={(e) => setCelulaSugerida(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              required
            />
          </div>
          <button className='botaoAdicionar' type="submit">Adicionar visitante</button>
          <button onClick={handleEnviar}>Enviar lista para o WhatsApp</button>
        </form>
      </div>
    </>
  );
}
export default Visitantes;
