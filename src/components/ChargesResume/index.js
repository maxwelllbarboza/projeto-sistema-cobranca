import { useEffect } from 'react';
import useClientsContext from '../../hooks/useClientsProvider';
import iconpagas from './assets/iconcobpagas.svg';
import iconprevistas from './assets/iconcobprevistas.svg';
import iconvencidas from './assets/iconcobvencidas.svg';
import './styles.css';

const ChargesResume = (props) => {
  const {
    cobrancaHome,    
    getCobrancas   
  } = useClientsContext();
 
  useEffect(() => {
    getCobrancas(props.children);
    //eslint-disable-next-line
  }, []);

  function iconeTitulo(titulo) {
    if (titulo === "Cobranças Vencidas") {
      return iconvencidas;
    } else if (titulo === "Cobranças Previstas"){
      return iconprevistas;
    } else {
      return iconpagas;
    }
  }
  function colorCard(titulo) {
    if (titulo === "Cobranças Vencidas") {
      return "color-FFEFEF";
    } else if (titulo === "Cobranças Previstas"){
      return "color-FCF6DC";
    } else {
      return "color-EEF6F6";
    }
  }
  let valorCard = cobrancaHome.reduce((total, item)=> total + item.valor, 0)
  valorCard = (valorCard/100)
  let valorFormatado = valorCard.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
 
  return(
    <div className= "card-resumo-alinhamento display-flex">     
      <div className={`card-resumo ${colorCard(props.children)} display-flex`}>
        <img src={iconeTitulo(props.children)} alt="Icone Pagas"/>
        <div className="display-flex-column-centralizado">
          <h3 className="montserrat-18 color-h3-p">{props.children}</h3>
          <p className="normal-montserrat bold-montserrat color-h3-p">{valorFormatado}</p>
        </div>
      </div>          
    </div>    
  ); 
};

export default ChargesResume;
