import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ModalEditUser from '../../components/ModalEditUser';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import btnsair from './assets/btnsair.svg';
import lapiseditar from './assets/lapiseditar.svg';
import SetaBaixo from './assets/setabaixo.svg';
import './styles.css';

const Header = ({ children, setModalConfirm, complemento }) => {
  const [openModal, setOpenModal] = useState(false);
  const [abrirPoup, setAbrirPoup] = useState(false);
  const { removeToken } = useGlobalContext();
  const [username, setUsername] = useState('');
  const requests = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    const getName = async () => {
      const response = await requests.get('user');

      if (response) {
        setUsername(response.nome);
      }
    };
    getName();

    //eslint-disable-next-line
  }, []);

  const usernameArray = username.split('');
  let inicialNome;
  let primeiroNome;
  let segundoNome;
  let inicial;

  if (usernameArray.includes(' ')) {
    inicialNome = username.split(' ');
    primeiroNome = inicialNome[0];
    segundoNome = inicialNome[1];
    inicial = primeiroNome.substr(0, 1) + segundoNome.substr(0, 1);
  } else {
    inicial = username[0];
    primeiroNome = username;
  }

  const handleClick = () => {
    setOpenModal(!openModal);
    fecharPopup();
  };
  const fecharPopup = () => {
    setAbrirPoup(false);
  };
  let stiloFontFirst = '';
  
  //----------Lógica para trocar o tirulo do Header-----------------

  if (children === 'Resumo das cobranças') {
    stiloFontFirst = 'font-montserrat text-size-26 color-343447';
  } else if (children === 'Clientes' || children === 'Cobranças') {
    stiloFontFirst = 'font-pag-inter color-first';
  } else if (children === 'Clientes' || children === 'Cobranças') {
    stiloFontFirst = 'font-pag-inter color-first';
    
  }

  //------------------Estrutura do Header---------------------------

  return (
    <header>
      <div className='display-align container-header'>
        <div className="style-titulo">
          <h1  style={{ cursor: 'pointer' }}
              onClick={() => navigate('/Clients')}
              className={`${stiloFontFirst}`}>{children}</h1>
          <h1 className='font-pag-inter color-second'>{complemento}</h1>
        </div>
        <div className='display-align style-menu'>
          <li>
            <strong className='sign-inicial-name color-0E8750 font-nunit text-size-22 '>
              {inicial}
            </strong>
          </li>
          <li>
            <strong className='font-nunit color-0E8750 text-size-18'>
              {primeiroNome}
            </strong>
          </li>
          <li>
            <img
              src={SetaBaixo}
              className='cursor-pointer'
              onClick={() => {
                abrirPoup === false ? setAbrirPoup(true) : setAbrirPoup(false);
              }}
              alt='Seta Baixo'
            />
          </li>
        </div>
        {abrirPoup && (
          <div className='container-poup-up display-flex'>
            <div className=''>
              <img
                className='icon-logout cursor-pointer'
                src={lapiseditar}
                alt='Editar'
                onClick={handleClick}
              />
              <p className='font-poup-up'>Editar</p>
            </div>
            <div>
              <img
                className='icon-logout cursor-pointer'
                src={btnsair}
                alt='Logout'
                onClick={() => removeToken()}
              />
              <p className='font-poup-up'>Sair</p>
            </div>
          </div>
        )}
        <ModalEditUser
          openModal={openModal}
          setOpenModal={setOpenModal}
          setModalConfirm={setModalConfirm}
        />
      </div>
    </header>
  );
};
export default Header;
