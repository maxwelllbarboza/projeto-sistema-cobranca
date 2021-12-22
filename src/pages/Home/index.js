import { useState } from 'react';
import ChargesCard from '../../components/ChargesCard';
import ChargesResume from '../../components/ChargesResume';
import ClientsCard from '../../components/ClientsCard';
import Header from '../../components/Header';
import ModalConfirm from '../../components/ModalConfirm';
import SideMenu from '../../components/SideMenu';
import './styles.css';

const Home = () => {
  const [modalConfirm, setModalConfirm] = useState(false);
  

  return (
    <div className='display-flex'>
      <div className='left-home'>
        <SideMenu />
      </div>
      <div className='right-home'>
        <div className=''>
          <Header modalConfirm={modalConfirm} setModalConfirm={setModalConfirm}>
            Resumo das cobranças
          </Header>
        </div>
        <div className='alinhar-resume display-flex'>
          <ChargesResume>Cobranças Vencidas</ChargesResume>
          <ChargesResume>Cobranças Previstas</ChargesResume>
          <ChargesResume>Cobranças Pagas</ChargesResume>
        </div>
        <div className='display-flex alinhar-cards'>
          <ChargesCard>color-strong-vencidas</ChargesCard>
          <ChargesCard>color-strong-previstas</ChargesCard>
          <ChargesCard>color-strong-pagas</ChargesCard>
        </div>
        <div className='display-flex alinhar-cards'>
          <ClientsCard>Clientes Inadimplentes</ClientsCard>
          <ClientsCard>Clientes em dia</ClientsCard>
        </div>
      </div>
      <ModalConfirm
        modalConfirm={modalConfirm}
        setModalConfirm={setModalConfirm}
      />
    </div>
  );
};

export default Home;