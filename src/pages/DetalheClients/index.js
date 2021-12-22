import ClientesDetalhe from '../../components/ClientesDetalhe';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import './styles.css';

const DetalheClients = () => {
  const complemento = ">Detalhes do Cliente"  

  return (
    <div className="container-clients">
      <SideMenu/>
      <div className="display-flex-column">
         <Header complemento={complemento}>Clientes</Header>
         <ClientesDetalhe/> 
      </div>
    </div>     
  );
};
export default DetalheClients;
