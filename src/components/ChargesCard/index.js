import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useClientsContext from '../../hooks/useClientsProvider';
import "./styles.css";

const ChargesCard = (props) => {
  const {
    cobrancaHome,    
    getCobrancas   
  } = useClientsContext();
  
  useEffect(() => {
    getCobrancas(props.children);
    //eslint-disable-next-line
  }, []);

  function nomeTitulo(corpo) {
    if (corpo === "color-strong-vencidas") {
      return "Cobranças Vencidas";
    } else if (corpo === "color-strong-previstas"){
      return "Cobranças Previstas";
    } else {
      return "Cobranças Pagas";
    }
  }
  return (
    <div className='container-card-charges'>     
      <div className="display-flex-column sign-card-lista">
        <div className="sign-card-lista-titulo display-flex">
          <h1 className="color-titulos-e-sub-titulos montserrat-18">
            {nomeTitulo(props.children)}
          </h1>
          <strong className={`strong-geral montserrat-16 ${props.children}`}>
            {cobrancaHome.length}
          </strong>
        </div>
        <div className="titulo-card">
          <div className="lista-titulo-item nunito-16 color-neutral-dark">Cliente</div>
          <div className="lista-titulo-item nunito-16 color-neutral-dark">ID da cobrança</div>
          <div className="lista-titulo-item nunito-16 color-neutral-dark">Valor</div>
        </div>
        {cobrancaHome.slice(0, 4).map((item)=> (
          <div key={item.id} className="lista-clientes">
              <div className=" lista-clientes-item nunito-14 color-neutral-dark">{item.cliente_nome}</div>
              <div className=" lista-clientes-item nunito-14 color-neutral-dark">{item.id}</div>
              <div className="lista-clientes-item nunito-14 color-neutral-dark">{(item.valor/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
          </div>
        ))}       
      </div>

      <div className="display-flex-centralizado btn-charges-ver-todos">
        <NavLink  
        className={({ isActive }) => isActive ? "ativado" : "desativado"}
        to={`/cobrancas/${props.children}`}>                   
          <p className="color-link nunito-18">
            Ver Todos
          </p>          
        </NavLink>
      </div> 
  </div>
     
    
  );
};

export default ChargesCard;
