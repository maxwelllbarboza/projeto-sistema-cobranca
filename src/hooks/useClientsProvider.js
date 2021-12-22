import { useState } from 'react';
import useRequests from './useRequests';

const useClientsProvider = () => {
  const [currentClient, setCurrentClient] = useState({});
  const [currentCobranca, setCurrentCobranca] = useState({});
  const [clients, setClients] = useState([]);
  const [cobrancaHome, setCobrancaHome] = useState([]);
  const [openModalCobranca, setOpenModalCobranca] = useState(false);
  const [openModalAddClient, setOpenModalAddClient] = useState(false);
  const [listaCobrancasVencida, setListaCobrancasVencida] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dadosCobranca, setDadosCobranca] = useState({});
  const [openModalEditCobranca, setOpenModalEditCobranca] = useState(false);
  const requests = useRequests();

  const cobrancaVencidas = [];
  const cobrancaPrevistas = [];
  const cobrancaPagas = [];

  const getClients = async (clienteStatus) => {
    const clientes = await requests.get('clients');

    if (clienteStatus === 'Clientes em dia') {
      const clientesEmDia = clientes.filter(
        (cliente) => cliente.status === 'Em dia'
      );
      setClients(clientesEmDia);
    }
    if (clienteStatus === 'Clientes Inadimplentes') {
      const clientesInadimplentes = clientes.filter(
        (cliente) => cliente.status === 'Inadimplente'
      );
      setClients(clientesInadimplentes);
    }
    if (clienteStatus === undefined) {
      setClients(clientes);
    }
  };

  const getCobrancas = async (clienteStatus) => {
    const cobrancas = await requests.get('charges');
    for (let cobranca of cobrancas) {
      if (cobranca.status === 'Paga') {
        cobrancaPagas.push(cobranca);
      }
      if (cobranca.status === 'Vencida') {
        cobrancaVencidas.push(cobranca);
      }
      if (cobranca.status === 'Pendente') {
        cobrancaPrevistas.push(cobranca);
      }
    }
    if (
      clienteStatus === 'color-strong-vencidas' ||
      clienteStatus === 'Cobranças Vencidas'
    ) {
      setCobrancaHome(cobrancaVencidas);
    }
    if (
      clienteStatus === 'color-strong-previstas' ||
      clienteStatus === 'Cobranças Previstas'
    ) {
      setCobrancaHome(cobrancaPrevistas);
    }
    if (
      clienteStatus === 'color-strong-pagas' ||
      clienteStatus === 'Cobranças Pagas'
    ) {
      setCobrancaHome(cobrancaPagas);
    }
  };

  return {
    currentClient,
    setCurrentClient,
    clients,
    setClients,
    openModalCobranca,
    setOpenModalCobranca,
    currentCobranca,
    setCurrentCobranca,
    openModalAddClient,
    setOpenModalAddClient,
    getClients,
    getCobrancas,
    setCobrancaHome,
    cobrancaHome,
    listaCobrancasVencida,
    setListaCobrancasVencida,
    openModalDelete,
    setOpenModalDelete,
    dadosCobranca,
    setDadosCobranca,
    openModalEditCobranca,
    setOpenModalEditCobranca,
  };
};

export default useClientsProvider;
