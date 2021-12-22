import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@material-ui/core/Modal';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validationModalEdit from '../../validations/validationModalEdit';
import useRequests from '../../hooks/useRequests';
import icon from './assets/icon-btn-close.svg';
import iconEyeClose from './assets/icon-eye-close.svg';
import iconEyeOpen from './assets/icon-eye-open.svg';
import './styles.css';
import InputMask from 'react-input-mask';
const ModalEditUser = ({ openModal, setOpenModal, setModalConfirm }) => {
  const [mostrarSenha, setMostrarSenha] = useState(true);
  const [confirmaSenha, setConfirmaSenha] = useState(true);
  const [erroEmail, setErroEmail] = useState('');
  const requests = useRequests();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationModalEdit) });

  useEffect(() => {
    const getUser = async () => {
      const response = await requests.get('user');
      const dadosUsuarios = response;
      reset(dadosUsuarios);
    };
    getUser();
    //eslint-disable-next-line
  }, [reset]);

  const submitEdit = async (data) => {
    const { novaSenha, ...dadosAtualizados } = data;
    const usuarioEditado = await requests.put('users', dadosAtualizados, '');

    if (!usuarioEditado) {
      setErroEmail('O email informado já existe.');
    }

    if (usuarioEditado.message === 'Usuário atualizado com sucesso.') {
      handleClose();
      setModalConfirm((previous) => !previous);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal className='modal-color' open={openModal} onClose={handleClose}>
      <div className='modal-edit'>
        <div className='modal-edit-title'>
          <img
            className='btn-close'
            src={icon}
            alt='Botão fechar'
            onClick={handleClose}
          />
          <h1 className='primary-title'>Edite seu cadastro</h1>
        </div>

        <form className='modal-edit-form' onSubmit={handleSubmit(submitEdit)}>
          <div className='form-edit'>
            <label className='form-nunito' htmlFor='nome'>
              Nome*
            </label>
            <input
              className='default-input default-modal'
              id='nome'
              name='nome'
              {...register('nome')}
              placeholder='Digite seu nome'
              style={
                errors.nome ? { border: '1px solid #e70000' } : {}
              }></input>
            <p className='alert-erro'>{errors.nome?.message}</p>
          </div>

          <div className='form-edit'>
            <label className='form-nunito' htmlFor='email'>
              E-mail*
            </label>
            <input
              className='default-input default-modal'
              id='email'
              name='email'
              type='email'
              {...register('email')}
              placeholder='Digite seu email'
              style={
                errors.email ? { border: '1px solid #e70000' } : {}
              }></input>
            <p className='alert-erro'>
              {erroEmail ? erroEmail : errors.email?.message}
            </p>
          </div>

          <div className='container-flex'>
            <div className='container'>
              <label className='form-nunito' htmlFor='cpf'>
                CPF
              </label>
              <InputMask
                className='default-input-secondary'
                id='cpf'
                name='cpf'
                {...register('cpf')}
                type='text'
                mask='999.999.999-99'
                placeholder='Digite seu cpf'></InputMask>
            </div>
            <div className='container'>
              <label className='form-nunito' htmlFor='telefone'>
                Telefone
              </label>
              <input
                className='default-input-secondary'
                id='telefone'
                name='telefone'
                {...register('telefone')}
                type='number'
                placeholder='Digite seu telefone'></input>
            </div>
          </div>

          <div className='form-edit'>
            <label className='form-nunito' htmlFor='novaSenha'>
              Nova Senha*
            </label>
            <input
              className='default-input default-modal'
              id='novaSenha'
              name='novaSenha'
              {...register('novaSenha')}
              type={mostrarSenha && 'password'}
              placeholder='Digite sua senha'></input>
            <img
              className='btn-eye'
              src={mostrarSenha ? iconEyeClose : iconEyeOpen}
              alt='Ícone olho fechado'
              onClick={() => setMostrarSenha(!mostrarSenha)}
            />
          </div>

          <div className='form-edit'>
            <label className='form-nunito' htmlFor='senha'>
              Confirmar Senha*
            </label>
            <input
              className='default-input default-modal'
              id='senha'
              name='senha'
              {...register('senha')}
              type={confirmaSenha && 'password'}
              placeholder='Digite sua senha'
              style={
                errors.senha ? { border: '1px solid #e70000' } : {}
              }></input>
            <p className='alert-erro'>{errors.senha?.message}</p>
            <img
              className='btn-eye'
              src={confirmaSenha ? iconEyeClose : iconEyeOpen}
              alt='Ícone olho fechado'
              onClick={() => setConfirmaSenha(!confirmaSenha)}
            />
          </div>

          <div className='btn-form'>
            <button className='btn-submit' type='submit'>
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditUser;
