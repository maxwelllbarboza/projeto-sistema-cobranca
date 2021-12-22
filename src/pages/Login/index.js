import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../components/ActionButton';
import { LeftSidebar, RightSidebar, Screen } from '../../components/Containers';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequest from '../../hooks/useRequest';
import loginSchema from '../../validations/loginSchema';
import off from './assets/off.svg';
import on from './assets/on.svg';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const request = useRequest();
  const navigate = useNavigate();
  const { setToken, exibirErro, setUsername } = useGlobalContext();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await loginSchema.validate({ email, senha });
      const body = { email, senha };

      setCarregando(true);

      const resposta = await request.api('POST', { body }, 'login');

      setCarregando(false);

      if (resposta) {
        setToken(resposta.token);
        setUsername(resposta.usuario.nome);
        navigate('/home');
      }
    } catch (error) {
      exibirErro(error.message);
      return;
    }
  }
  return (
    <Screen>
      <LeftSidebar>
        <div className='container-lateral-text normal-montserrat'>
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </div>
      </LeftSidebar>

      <RightSidebar>
        {carregando ? (
          <div className='container-sucesso'>
            <div className='loader'></div>
            <h2 className='primary-title'>Carregando...</h2>
          </div>
        ) : (
          <form className='container-login-form' onSubmit={handleSubmit}>
            <h2 className='primary-title'>Faça seu login!</h2>

            <div className='container-email-input'>
              <label className='normal-nunito'>E-mail</label>
              <input
                placeholder='Digite seu e-mail'
                className='default-input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='container-password-input'>
              <div className='labels-password'>
                <label className='normal-nunito'>Senha</label>
                <a href='/forget' className='normal-nunito link-rosa'>
                  Esqueceu sua senha?
                </a>
              </div>
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder='Digite sua senha'
                className='default-input'
                onChange={(e) => setSenha(e.target.value)}
              />
              <img
                className='eye'
                src={mostrarSenha ? on : off}
                alt=''
                onClick={() => setMostrarSenha(!mostrarSenha)}
              />
            </div>

            <div className='btn-login'>
              <ActionButton>Entrar</ActionButton>
            </div>

            <div className='normal-nunito flex text-center'>
              <span>Ainda não possui uma conta? {''}</span>
              <a href='/signup' className='link-rosa'>
                Cadastre-se
              </a>
            </div>
          </form>
        )}
      </RightSidebar>
    </Screen>
  );
};
export default Login;
