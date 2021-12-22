import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import toast from '../helpers/toast';

const useGlobalProvider = () => {
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const [inError, setInError] = useState(false);
  const [username, setUsername] = useState('');
 

  function exibirErro(message) {
    if (!inError) {
      setInError(true);
      toast.messageError(message, () => setInError(false));
    }
  }
  function exibirSucesso(message) {
    if (!inError) {
      setInError(true);
      toast.messageSuccess(message, () => setInError(false));
    }
  }
  return {
    token,
    setToken,
    removeToken,
    exibirErro,
    exibirSucesso,
    setUsername,
    username
   
  };
};

export default useGlobalProvider;
