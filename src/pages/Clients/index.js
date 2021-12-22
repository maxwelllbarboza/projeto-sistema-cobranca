import './styles.css';
import perfilIcon from './assets/perfilIcon.svg';
import lupa from './assets/lupa.svg';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import ModalAddClient from '../../components/ModalAddClient';
import configIcon from './assets/configIcon.svg';
import ListagemClientes from './listagem-clientes/index';
import useClientsContext from '../../hooks/useClientsContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequests from '../../hooks/useRequests';

const Clients = () => {
  const { openModalAddClient, setOpenModalAddClient, setClients } =
    useClientsContext();

  const [filtro, setFiltro] = useState('');
  const [noResults, setNoResults] = useState(false);
  const { clienteStatus } = useParams();
  const requests = useRequests();

  const handleFiltro = async (event) => {
    event.preventDefault();

    if (!filtro) {
      try {
        const resultado = await requests.get('clients');
        setNoResults(false);
        setClients(resultado);
        return;
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const resultadoBusca = await requests.get(
        `filter/clients?search=${filtro}`
      );
      if (resultadoBusca.length === 0) {
        setNoResults(true);
      }
      setClients(resultadoBusca);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container-clientes'>
      <div className='sign-clientes'>
        <SideMenu />
        <div className='sign-clientes-card'>
          <Header>Clientes</Header>
          <div className='top-clientes'>
            <div>
              <img src={perfilIcon} alt='icone' />
              <h1>Clientes</h1>
            </div>
            <div>
              <button
                className='btn-cliente'
                onClick={() => {
                  openModalAddClient === false
                    ? setOpenModalAddClient(true)
                    : setOpenModalAddClient(false);
                }}>
                + Adicionar cliente
              </button>
              <img
                src={configIcon}
                alt='filtros'
                style={{ cursor: 'pointer' }}
              />
              <form onSubmit={handleFiltro} action='submit'>
                <input
                  className='input-pesquisa-clientes normal-nunito'
                  type='text'
                  placeholder='Pesquisa'
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <button className='lupa' type='submit'>
                  <img className='lupa' src={lupa} alt='lupa' />
                </button>
              </form>
            </div>
          </div>
          <ListagemClientes
            clienteStatus={clienteStatus}
            noResults={noResults}
          />
        </div>
      </div>
      {openModalAddClient && (
        <ModalAddClient
          setOpenModal={setOpenModalAddClient}
          openModal={openModalAddClient}
        />
      )}
    </div>
  );
};
export default Clients;
