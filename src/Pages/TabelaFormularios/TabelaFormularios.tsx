import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';
import { TabelaFormulario } from '../../types/TabelaFormulario';

function TabelaFormularios() {
  const [formularios, setFormularios] = useState<TabelaFormulario[]>([]);

  useEffect(() => {
    const fetchFormularios = async () => {
      const q = query(collection(dadosFirebase, 'formularios'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const dados: TabelaFormulario[] = [];
      querySnapshot.forEach((doc) => {
        dados.push({ id: doc.id, ...doc.data() } as TabelaFormulario);
      });
      setFormularios(dados);
    };
    fetchFormularios();
  }, []);

  return (
    <table className='tabelaDiv'>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>WhatsApp</th>
          <th>Bairro</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {formularios.map((formulario) => (
          <tr key={formulario.id}>
            <td>{formulario.nome}</td>
            <td>{formulario.email}</td>
            <td>
              <a
                href={`https://api.whatsapp.com/send?phone=${formulario.whatsApp}&text=Olá%20Somos%20do%20Bola%20de%20Neve%20Sorocaba,%20estamos%20entrando%20em%20contato%20pois%20você%20nos%20deu%20o%20seu%20contato.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formulario.whatsApp}
              </a>
            </td>
            <td>{formulario.bairro}</td>
            <td>{formulario.pergunta}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaFormularios;