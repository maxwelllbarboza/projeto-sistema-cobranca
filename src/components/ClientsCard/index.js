import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useClientsContext from '../../hooks/useClientsProvider';
import iconemdia from './assets/iconemdia.svg';
import iconinadimplente from './assets/iconinadimplente.svg';
import './styles.css';

const ClientsCard = (props) => { 
  const {    
    clients,
    getClients       
  } = useClientsContext();   
  
  useEffect(() => {
    getClients(props.children);
    //eslint-disable-next-line
  }, []);

  function imgClients(corpo) {
    if (corpo === 'Clientes Inadimplentes') {
      return iconinadimplente;
    } else {
      return iconemdia;
    }
  }
  function corClients(corpo) {
    if (corpo === 'Clientes Inadimplentes') {
      return 'color-qtd-inadimplentes';
    } else {
      return 'color-qtd-em-dia';
    }
  } 
 
//---------- Estrutura do card--------------------- 
  
  return (
    <div className='container-card-cliente' >
      <div className='display-flex-column sign-card-cliente'> 
        <div className='sign-card-cliente-titulo'>      
          <div className='display-align space-img-titulo'>
            <img src={imgClients(props.children)} alt='Icone Inadiplente' />
            <h1 className='color-titulo-clientes montserrat-18'>
              {props.children}
            </h1>
          </div>      
          <div
            className={`qtd-clientes montserrat-16 ${corClients(
              props.children
              )} `}>{clients.length}                              
          </div>
        </div>

        <div className='line-titulo-clientes nunito-16'>
          <h3 className='line-titulo-item color-titulo-clientes'>Cliente</h3>
          <h3 className='line-titulo-item color-titulo-clientes'>ID do cli.</h3>
          <h3 className='line-titulo-item color-titulo-clientes'>CPF</h3>
        </div>
        <div  className='nunito-14 display-flex-column'>
          {clients.slice(0, 4).map((user)=> (
            <div key={user.id} className='table-line-clientes-card'>
              <div className='table-item-clientes color-clientes-lista'>{user.nome}</div>
              <div className='table-item-clientes color-clientes-lista'>{user.id}</div>
              <div className='table-item-clientes color-clientes-lista'>{user.cpf}</div>
            </div>      
          ))}
            
        </div>         
      </div>
        
      <div className='btn-clientes-ver-todos nunito-18  display-flex-centralizado'>
        <NavLink
        className={({ isActive }) =>
        isActive ? 'ativado' : 'desativado'
        }
        to={`/clients/${props.children}`}>
          <p className='color-link nunito-18'>Ver Todos</p>
        </NavLink>
      </div>     
    </div>  
   
  );
};

export default ClientsCard;
