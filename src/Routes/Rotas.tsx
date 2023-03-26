import { Route, Routes } from 'react-router-dom';
import Contador from '../Pages/Contador/Contador';
import Home from '../Pages/Home/Home';
import Visitantes from '../Pages/Visitantes/Visitantes';

interface RouteItem {
  path: string;
  element: JSX.Element;
}

interface RoutesProps {
  routes: RouteItem[];
}

const RotasBolaApps = ({ routes }: RoutesProps) => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

const rotas = [
  { path: "bola/", element: <Home /> },
  { path: "bola/contador", element: <Contador /> },
  { path: "bola/visitantes", element: <Visitantes /> },
];

const Apps = () => {
  return <RotasBolaApps routes={rotas} />;
};

export default Apps;
