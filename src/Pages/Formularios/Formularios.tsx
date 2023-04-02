import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';

function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formulario = {
      nome,
      email,
      mensagem,
    };
    try {
      const docRef = await addDoc(collection(dadosFirebase, 'formularios'), formulario);
      console.log('Documento criado com ID: ', docRef.id);
      setNome('');
      setEmail('');
      setMensagem('');
    } catch (error) {
      console.error('Erro ao adicionar documento: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Mensagem:
        <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;