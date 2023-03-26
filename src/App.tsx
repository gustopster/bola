import { BrowserRouter } from 'react-router-dom';
import  Apps  from './Routes/Rotas';
import './Global.css'
function App() {
  return (
    <BrowserRouter>
      <Apps />
    </BrowserRouter>
  )
}
export default App