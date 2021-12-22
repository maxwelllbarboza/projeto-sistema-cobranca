import Modal from '@material-ui/core/Modal';
import useRequests from '../../hooks/useRequests';
import useGlobalContext from '../../hooks/useGlobalContext';
import useClientsContext from '../../hooks/useClientsContext';
import iconBtnClose from './assets/icon-btn-close.svg';
import iconInform from './assets/icon-inform.svg';
import './styles.css';
import { isPast } from 'date-fns';

const ModalDeleteCobranca = () => {
  const requests = useRequests();
  const { exibirErro, exibirSucesso } = useGlobalContext();
  const { openModalDelete, setOpenModalDelete, dadosCobranca } =
    useClientsContext();

  async function handleDeleteCobranca() {
    const response = await requests.del('charge', dadosCobranca.id);

    const dataPassada = isPast(new Date(dadosCobranca.data_vecimento));

    if (dataPassada) {
      exibirErro(
        'A data de vencimento deve ser igual ou posterior a data atual!'
      );
      return;
    }

    if (response.message === 'Cobrança excluída com sucesso.') {
      exibirSucesso('Cobrança excluída com sucesso!');
      handleClose();
      return;
    }
  }

  const handleClose = () => {
    setOpenModalDelete(false);
  };

  return (
    <Modal className='modal-delet' open={openModalDelete} onClose={handleClose}>
      <div className='card-delet'>
        <img
          className='btn-close'
          src={iconBtnClose}
          alt='Botão fechar'
          onClick={handleClose}></img>
        <div className='container-delet'>
          <img src={iconInform} alt='Imagem atenção'></img>
          <p>Tem certeza que deseja excluir esta cobrança?</p>
        </div>
        <div className='container-button'>
          <button className='btn-no' onClick={handleClose}>
            Não
          </button>
          <button className='btn-yes' onClick={handleDeleteCobranca}>
            Sim
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteCobranca;
