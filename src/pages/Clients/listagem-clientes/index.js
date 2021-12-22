import { useEffect, useState } from 'react';
import ModalCadCobranca from '../../../components/ModalCadCobranca';
import NoResults from '../../../components/NoResults';
import useClientsContext from '../../../hooks/useClientsContext';
import cobrancaIcon from './assets/cobranca.svg';
import { NavLink } from 'react-router-dom';
import setasCliente from './assets/setasCliente.svg';
import './styles.css';

const ListagemClientes = ({ clienteStatus, noResults }) => {
  const {
    setCurrentClient,
    clients,
    getClients,
    setOpenModalCobranca,
    openModalAddCliente,
    openModalCobranca,
    setClients,
  } = useClientsContext();
  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true); 
  
  useEffect(() => {
    getClients(clienteStatus);
    //eslint-disable-next-line
  }, [clienteStatus, openModalAddCliente, openModalCobranca]);

  function handleOrdenarPorNome() {
    const ordenado = [...clients];

    ordenado.sort((a, b) => {
      return ordemAlfabetica
        ? a.nome > b.nome
          ? 1
          : b.nome > a.nome
          ? -1
          : 0
        : a.nome > b.nome
        ? -1
        : b.nome > a.nome
        ? 1
        : 0;
    });
    setOrdemAlfabetica(!ordemAlfabetica);
    setClients(ordenado);
  }

  return (
    <div className='container-table-clientes'>
      <div className='top-table-clientes'>
        <div>
          <img
            src={setasCliente}
            alt='ordenar'
            onClick={handleOrdenarPorNome}
          />
          <span>Cliente</span>
        </div>
        <div>
          <span>CPF</span>
        </div>
        <div>
          <span>E-mail</span>
        </div>
        <div>
          <span>Telefone</span>
        </div>
        <div>Status</div>
        <div>
          <span>Criar cobrança</span>
        </div>
      </div>
      {noResults && <NoResults />}
      {clients.map((client) => (
        <div key={client.id} className='table-line-clientes'>
          <div style={{ cursor: 'pointer' }}>
            <NavLink id= "navLink"  className={({ isActive }) => 
                      isActive ? "ativado" : "desativado"}
                      to={`/DetalheClients/${client.id}`}>
              {client.nome}
                          
            </NavLink>    
          </div>                   
          <div>{client.cpf}</div>
          <div>{client.email}</div>
          <div>{client.telefone}</div>
          <div>
            <span
              className={
                client.status === 'Em dia' ? 'em-dia' : 'inadimplente'
              }>
              {client.status}
            </span>
          </div>
          <div
            onClick={() => [
              setOpenModalCobranca(true),
              setCurrentClient(client),
            ]}
            className='btn-cobranca'>
            <img src={cobrancaIcon} alt='editar' />
            <span className='span-cobranca'>Cobrança</span>
          </div>
        </div>
      ))}
      <ModalCadCobranca />
    </div>
  );
};

export default ListagemClientes;
