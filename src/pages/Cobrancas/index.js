import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CobrancasTable from '../../components/CobrancasTable';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import useClientsContext from '../../hooks/useClientsContext';
import useRequests from '../../hooks/useRequests';
import filtros from './assets/filtros.svg';
import icon from './assets/icon.svg';
import lupa from './assets/lupa.svg';
import './styles.css';

const Cobrancas = () => {
  const { nomecob } = useParams();
  const [filtro, setFiltro] = useState('');
  const [noResults, setNoResults] = useState(false);
  const { setListaCobrancasVencida } = useClientsContext();
  const requests = useRequests();

  const handleFiltro = async () => {
    if (!filtro) {
      try {
        const resultado = await requests.get('charges');
        setNoResults(false);
        setListaCobrancasVencida(resultado);
        return;
      } catch (error) {
        console.error(error);
      }
    }
    try {
      const resultadoBusca = await requests.get(
        `filter/charges?search=${filtro}`
      );
      console.log(resultadoBusca);
      if (resultadoBusca.length === 0) {
        setNoResults(true);
      }
      setListaCobrancasVencida(resultadoBusca);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container-cobrancas'>
      <div className='sign-cobrancas'>
        <SideMenu />
        <div className='sign-cobrancas-card'>
          <Header>Cobranças</Header>
          <div className='top-cobrancas'>
            <div>
              <img src={icon} alt='icone' />
              <h1>Cobranças</h1>
            </div>
            <div>
              <img src={filtros} alt='filtros' style={{ cursor: 'pointer' }} />
              <input
                onSubmit={handleFiltro}
                className='input-pesquisa normal-nunito'
                type='text'
                placeholder='Pesquisa'
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              <button className='lupa' onClick={handleFiltro}>
                <img className='lupa' src={lupa} alt='lupa' />
              </button>
            </div>
          </div>
          <CobrancasTable
            nomecob={nomecob ? nomecob : null}
            noResults={noResults}
          />
        </div>
      </div>
    </div>
  );
};

export default Cobrancas;
