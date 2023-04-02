import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';

function Visitantes() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [celulaSugerida, setCelulaSugerida] = useState('');
  const [bairro, setBairro] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
    const formulario = {
      nome,
      email,
      pergunta,
      whatsApp,
      celulaSugerida,
      bairro,
      createdAt: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(collection(dadosFirebase, 'formularios'), formulario);
      console.log('Documento criado com ID: ', docRef.id);
      setNome('');
      setEmail('');
      setPergunta('');
      setWhatsApp('');
      setCelulaSugerida('');
      setBairro('');
    } catch (error) {
      console.error('Erro ao adicionar documento: ', error);
    }
  };
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const regex = /^[0-9]*$/;

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  }
  return (
    <>
      <div className='visitantesDiv'>
        <h1>Visitantes Registrados:</h1>
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
          <button onClick={handleSubmit} className="botaoEnviarForm">Salvar Visitante</button>
        </form>
      </div>
    </>
  );
}

export default Visitantes;