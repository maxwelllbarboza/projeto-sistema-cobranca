import { NavLink } from 'react-router-dom';
import './styles.css';

const SideMenu = () => {
  return (
    <nav>
      <div className='containerNav'>
        <NavLink
          id='classNav'
          className={({ isActive }) =>
            isActive
              ? 'ativado img-home-ativado'
              : 'desativado img-home-desativado'
          }
          to='/home'>
          <p className='cursor-pointer'>Home</p>
        </NavLink>

        <NavLink
          id='classNav'
          className={({ isActive }) =>
            isActive
              ? 'ativado img-cliente-ativado'
              : 'desativado img-cliente-desativado'
          }
          to='/clients'>
          <p className=''></p>
          <p className='cursor-pointer'>Clientes</p>
        </NavLink>

        <NavLink
          id='classNav'
          className={({ isActive }) =>
            isActive
              ? 'ativado img-cobranca-ativado'
              : 'img-cobranca-desativado desativado '
          }
          to='/cobrancas'>
          <p className=''></p>
          <p className='cursor-pointer'>Cobranças</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default SideMenu;
