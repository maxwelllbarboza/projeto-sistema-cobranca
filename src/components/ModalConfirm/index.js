import Modal from "@material-ui/core/Modal";
import icon_complete from "./assets/icon-complete-sucess.svg";
import "./styles.css";

const ModalConfirm = ({ modalConfirm, setModalConfirm }) => {
  const handleClose = () => {
    setModalConfirm(false);
  };

  return (
    <Modal className="modal-confirm" open={modalConfirm} onClose={handleClose}>
      <div className="modal-card">
        <img src={icon_complete} alt="Ícone completo com sucesso" />
        <h2 className="primary-title">Cadastro Alterado com sucesso</h2>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
