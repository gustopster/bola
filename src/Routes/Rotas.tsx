import { Route, Routes } from 'react-router-dom';
import Contador from '../Pages/Contador/Contador';
import Home from '../Pages/Home/Home';
import Visitantes from '../Pages/Visitantes/Visitantes';

export const Apps = () => {
  const routes = [
    { path: "bola/", element: <Home /> },
    { path: "bola/contador", element: <Contador /> },
    { path: "bola/visitantes", element: <Visitantes /> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
