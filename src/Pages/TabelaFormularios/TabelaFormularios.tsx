import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dadosFirebase } from '../../services/firebaseServer';
import { TabelaFormulario } from '../../types/TabelaFormulario';



function TabelaFormularios() {
  const [formularios, setFormularios] = useState<TabelaFormulario[]>([]);

  useEffect(() => {
    const fetchFormularios = async () => {
      const querySnapshot = await getDocs(collection(dadosFirebase, 'formularios'));
      const dados: TabelaFormulario[] = [];
      querySnapshot.forEach((doc) => {
        dados.push({ id: doc.id, ...doc.data() } as TabelaFormulario);
      });
      setFormularios(dados);
    };
    fetchFormularios();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Mensagem</th>
        </tr>
      </thead>
      <tbody>
        {formularios.map((formulario) => (
          <tr key={formulario.id}>
            <td>{formulario.nome}</td>
            <td>{formulario.email}</td>
            <td>{formulario.mensagem}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaFormularios;
