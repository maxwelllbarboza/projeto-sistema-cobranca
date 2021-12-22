import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import useClientsContext from '../../hooks/useClientsContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import checkboxGray from './assets/checkbox-gray.svg';
import checkboxGreen from './assets/checkbox-green.svg';
import btnClose from './assets/icon-close.svg';
import page from './assets/icon-page.svg';
import './style.css';

const ModalEditCobranca = ({ currentClientes }) => {
  const resetForm = {
    nome: '',
    cliente_id: 0,
    usuario_id: 0,
    data_vencimento: '',
    status: '',
    descricao: '',
    valor: 0,
  };

  const { currentClient, openModalCobranca, setOpenModalCobranca } =
    useClientsContext();
  const { exibirErro, exibirSucesso } = useGlobalContext();
  const [contaPaga, setContaPaga] = useState(false);
  const requests = useRequests();
  const [form, setForm] = useState(resetForm);

  function handleChange(target) {
    const newValues = { ...form, [target.name]: target.value };
    setForm(newValues);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const status = contaPaga ? 'Paga' : 'Pendente';
    console.log(form);

    if (form.data_vencimento === '') {
      exibirErro('O campo Data é obrigatório');
      return;
    }
    if (form.valor === '' || form.valor === 0) {
      exibirErro('O campo Valor é obrigatório');
      return;
    }
    if (form.descricao === '') {
      exibirErro('O campo Descrição é obrigatório');
      return;
    }

    const body = {
      cliente_nome: currentClientes ? currentClientes.nome : currentClient.nome,
      cliente_id: currentClientes ? currentClientes.id : currentClient.id,
      usuario_id: currentClientes
        ? currentClientes.usuario_id
        : currentClient.usuario_id,
      data_vencimento: form.data_vencimento.replaceAll('/', '-'),
      status: status,
      descricao: form.descricao,
      valor: parseInt(form.valor),
    };
    const postCobranca = await requests.post('charges', body, true);
    if (!postCobranca) {
      exibirErro('Não foi possível cadastrar');
    }
    setForm(resetForm);
    if (postCobranca.message === 'Cobrança cadastrada com sucesso.') {
      handleClose();
      exibirSucesso('Cobrança cadastrada com sucesso.');
    }
  }

  const handleClose = () => {
    setOpenModalCobranca(false);
  };

  return (
    <Modal className='backgroud' open={openModalCobranca} onClose={handleClose}>
      <div className='container-cobranca'>
        <img
          className='btnClose cursor-pointer'
          src={btnClose}
          alt='Botão fechar'
          onClick={handleClose}
        />
        <div className='container-title'>
          <img src={page} alt='Página em branco' />
          <h2>Cadastro de Cobrança</h2>
        </div>

        <form className='form-cobranca' onSubmit={handleSubmit}>
          <div className='flex-column'>
            <label className='nunito-19 margin-botton-4' htmlFor='nome'>
              Nome*
            </label>
            <input
              className='input-default-cobranca'
              id='nome'
              name='cliente_nome'
              value={
                currentClientes ? currentClientes.nome : currentClient.nome
              }
            />
          </div>

          <div className='flex-column'>
            <label className='nunito-19 margin-botton-4' htmlFor='descricao'>
              Descrição*
            </label>
            <textarea
              className='input-default-cobranca input-descricao'
              id='descricao'
              name='descricao'
              value={form.descricao}
              onChange={(e) => handleChange(e.target)}
              placeholder='Digite a descrição'></textarea>
          </div>

          <div className='flex-row'>
            <div className='flex-column'>
              <label className='nunito-19 margin-botton-4' htmlFor='nome'>
                Vencimento*
              </label>
              <input
                className='input-default-cobranca input-vencimento'
                type='date'
                name='data_vencimento'
                value={form.data_vencimento}
                onChange={(e) => handleChange(e.target)}
              />
            </div>

            <div className='flex-column'>
              <label className='nunito-19 margin-botton-4' htmlFor='valor'>
                Valor*
              </label>
              <input
                className='input-default-cobranca input-valor'
                id='valor'
                name='valor'
                type='number'
                value={form.valor}
                onChange={(e) => handleChange(e.target)}
                placeholder='Digite o Valor'
              />
            </div>
          </div>

          <div className='flex-column'>
            <label className='nunito-19'>Status*</label>
            <button
              className='btn-pago'
              name='paga'
              type='button'
              onClick={() => setContaPaga(true)}>
              {contaPaga ? (
                <img src={checkboxGreen} alt='Check verde' />
              ) : (
                <img src={checkboxGray} alt='Check cinza' />
              )}{' '}
              Cobrança Paga
            </button>
            <button
              className='btn-pendente'
              name='pendente'
              type='button'
              onClick={() => setContaPaga(false)}>
              {!contaPaga ? (
                <img src={checkboxGreen} alt='Check verde' />
              ) : (
                <img src={checkboxGray} alt='Check cinza' />
              )}{' '}
              Cobrança Pendente
            </button>
          </div>

          <div className='flex-row'>
            <button
              className='btn-cancelar cursor-pointer'
              onClick={handleClose}>
              Cancelar
            </button>
            <button className='btn-aplicar cursor-pointer' type='submit'>
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditCobranca;
