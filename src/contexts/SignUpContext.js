import { createContext } from 'react';
import useSignUpProvider from '../hooks/useSignUpProvider';

const SignUpContext = createContext();

export function SignUpProvider(props) {
  const SignUpProvider = useSignUpProvider();

  return (
    <SignUpContext.Provider value={SignUpProvider}>
      {props.children}
    </SignUpContext.Provider>
  );
}

export default SignUpContext;
