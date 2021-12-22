import { render } from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClientsProvider } from './contexts/ClientsContext';
import { GlobalProvider } from './contexts/GlobalContext';
import './global.css';
import useGlobalContext from './hooks/useGlobalContext';
import Clients from './pages/Clients';
import Cobrancas from './pages/Cobrancas';
import DetalheClients from './pages/DetalheClients';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';

const rootElement = document.getElementById('root');

function ProtectedRoute({ children }) {
  const { token } = useGlobalContext();
  return token ? children : <Navigate to='/' />;
}

render(
  <GlobalProvider>
    <ClientsProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>

          <Route path='/signup' element={<Signup />}></Route>

          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }></Route>

          <Route
            path='/clients'
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }></Route>

          <Route
            path='/clients/:clienteStatus'
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }></Route>

          <Route
            path='/DetalheClients/:idclient'
            element={
              <ProtectedRoute>
                <DetalheClients />
              </ProtectedRoute>
            }></Route>

          <Route
            path='/cobrancas'
            element={
              <ProtectedRoute>
                <Cobrancas />
              </ProtectedRoute>
            }></Route>

          <Route
            path='/cobrancas/:nomecob'
            element={
              <ProtectedRoute>
                <Cobrancas />
              </ProtectedRoute>
            }></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ClientsProvider>
  </GlobalProvider>,
  rootElement
);
