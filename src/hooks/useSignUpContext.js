import { useContext } from 'react';
import SignUpContext from '../contexts/SignUpContext';

const useSignUpContext = () => {
  return useContext(SignUpContext);
};

export default useSignUpContext;
