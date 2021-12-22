import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import useClientsContext from '../../hooks/useClientsContext';
import useRequests from '../../hooks/useRequests';
import ModalDeleteCobranca from '../ModalDeleteCobranca';
import ModalEditCobranca from '../ModalEditCobranca';
import NoResults from '../NoResults';
import editar from './assets/editar.svg';
import excluir from './assets/excluir.svg';
import ordenar from './assets/ordenar.svg';
import './style.css';
import DetalheCobrancaModal from '../DetalhesCobranca';

function CobrancasTable({ nomecob, noResults }) {
  const requests = useRequests();
  const [listaCobrancas, setListaCobrancas] = useState([]);
  const {
    listaCobrancasVencida,
    setListaCobrancasVencida,
    openModalEditCobranca,
    openModalDelete,
    setOpenModalDelete,
    setDadosCobranca,
    setOpenModalEditCobranca,
  } = useClientsContext();

  const [idCobrancaDelete, setIdCobrancaDelete] = useState(null);
  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);
  const [ordemCrescente, setOrdemCrescente] = useState(true);
  const [currentCobranca, setCurrentCobranca] = useState({});
  const [
        openDetalheCobrancaModal,
        setOpenDetalheCobrancaModal] = useState(false);
  const [
        openEditarCobrancaModal, 
        setOpenEditarCobrancaModal] = useState(false);

  const [dadosClients, setDadosClients] = useState({});

  function listagemCobranca(arg) {
    let arrayStatus = [];
    if (arg === 'color-strong-vencidas') {
      for (let value of listaCobrancas) {
        if (value.status === 'Vencida') {
          arrayStatus.push(value);
        }
      }
      setListaCobrancasVencida(arrayStatus);
    }
    if (arg === 'color-strong-previstas') {
      for (let value of listaCobrancas) {
        if (value.status === 'Pendente') {
          arrayStatus.push(value);
        }
      }
      setListaCobrancasVencida(arrayStatus);
    }
    if (arg === 'color-strong-pagas') {
      for (let value of listaCobrancas) {
        if (value.status === 'Paga') {
          arrayStatus.push(value);
        }
      }
      setListaCobrancasVencida(arrayStatus);
    }
    if (arg === null) {
      setListaCobrancasVencida(listaCobrancas);
    }
  }
  useEffect(() => {
    listagemCobranca(nomecob);

    //eslint-disable-next-line
  }, [listaCobrancas]);

  useEffect(() => {
    async function getCobrancas() {
      const arrayCobrancas = await requests.get('charges');
      setListaCobrancas(arrayCobrancas);
    }
    getCobrancas();
    //eslint-disable-next-line
  }, [openModalDelete, openModalEditCobranca]);

  const handleDeleteCobranca = (id, data_vencimento) => {
    setDadosCobranca({ id, data_vencimento });
    setOpenModalDelete(true);
  };

  const handleEditarCobranca = (id, cliente_nome) => {
    console.log("Entrei aqui")
    setDadosClients({ id, cliente_nome });
    setOpenModalEditCobranca(true);
  };

  function handleOrdenarPorNome() {
    const ordenado = [...listaCobrancasVencida];

    ordenado.sort((a, b) => {
      return ordemAlfabetica
        ? a.cliente_nome > b.cliente_nome
          ? 1
          : b.cliente_nome > a.cliente_nome
          ? -1
          : 0
        : a.cliente_nome > b.cliente_nome
        ? -1
        : b.cliente_nome > a.cliente_nome
        ? 1
        : 0;
    });
    setOrdemAlfabetica(!ordemAlfabetica);
    setListaCobrancasVencida(ordenado);
  }

  function HandleOrdenarPorId() {
    const ordenado = listaCobrancasVencida;
    ordenado.sort((a, b) => {
      return ordemCrescente
        ? a.id > b.id
          ? 1
          : b.id > a.id
          ? -1
          : 0
        : a.id > b.id
        ? -1
        : b.id > a.id
        ? 1
        : 0;
    });
    setOrdemCrescente(!ordemCrescente);
    setListaCobrancasVencida(ordenado);
  }

  return (
    <div className='container-table-cobranca'>
      <div className='top-table'>
        <div>
          <img src={ordenar} alt='ordenar' onClick={handleOrdenarPorNome} />
          <span>Cliente</span>
        </div>
        <div>
          <img src={ordenar} alt='ordenar' onClick={HandleOrdenarPorId} />
          <span>ID Cob.</span>
        </div>
        <div>
          <span>Valor</span>
        </div>
        <div>
          <span>Data de venc.</span>
        </div>
        <div>Status</div>
        <div>
          <span>Descrição</span>
        </div>
        <div></div>
      </div>
      {noResults && <NoResults />}
      {listaCobrancasVencida.map((cobranca) => (
        <div key={cobranca.id} className='table-line'>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => [
              setCurrentCobranca(cobranca),
              setOpenDetalheCobrancaModal(true),
            ]}>
            {cobranca.cliente_nome}
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => [
              setCurrentCobranca(cobranca),
              setOpenDetalheCobrancaModal(true),
            ]}>
            {cobranca.id}
          </div>
          <div>
            R$ {String((cobranca.valor / 100).toFixed(2)).replace('.', ',')}
          </div>
          <div>
            {format(
              new Date(cobranca.data_vencimento).setHours(
                new Date(cobranca.data_vencimento).getHours() + 3
              ),
              'dd/MM/yyyy'
            )}
          </div>
          <div>
            <span className={cobranca.status.toLowerCase()}>
              {cobranca.status}
            </span>
          </div>
          <div>{cobranca.descricao}</div>
          <div className='btn-cob-actions'>
            <img
              src={editar}
              alt='editar'
              onClick={() => [setOpenEditarCobrancaModal(true)]
                
              }
            />
            <img
              src={excluir}
              alt='excluir'
              onClick={() =>
                handleDeleteCobranca(cobranca.id, cobranca.data_vencimento)
              }
            />
          </div>
        </div>
      ))}
      {openDetalheCobrancaModal && (
        <DetalheCobrancaModal
          currentCobranca={currentCobranca}
          setOpenDetalheCobrancaModal={setOpenDetalheCobrancaModal}
        />
      )}
      <ModalEditCobranca/>

      {openEditarCobrancaModal && (
        <ModalEditCobranca
          currentCobranca={currentCobranca}
          setOpenEditarCobrancaModal={setOpenEditarCobrancaModal}
        />
      )}      

      <ModalDeleteCobranca
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        idCobrancaDelete={idCobrancaDelete}
      />
    </div>
  );
}

export default CobrancasTable;
