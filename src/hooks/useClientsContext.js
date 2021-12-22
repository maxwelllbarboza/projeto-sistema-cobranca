import { useContext } from 'react';
import ClientsContext from '../contexts/ClientsContext';

const useClientsContext = () => {
  return useContext(ClientsContext);
};

export default useClientsContext;
