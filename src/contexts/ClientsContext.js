import { createContext } from 'react';
import useClientsProvider from '../hooks/useClientsProvider';

const ClientsContext = createContext();

export function ClientsProvider(props) {
  const clientsProvider = useClientsProvider();

  return (
    <ClientsContext.Provider value={clientsProvider}>
      {props.children}
    </ClientsContext.Provider>
  );
}

export default ClientsContext;
