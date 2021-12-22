import './styles.css';
import cobranca from './assets/cobranca.svg';
import fechar from './assets/fechar.svg';
import React from 'react';
import { format } from 'date-fns';

export default function DetalheCobrancaModal({
  currentCobranca,
  setOpenDetalheCobrancaModal,
}) {
  return (
    <div className='container-modal-detalhes-cobrancas'>
      <div className='modal-detalhes'>
        <div className='title-modal'>
          <img src={cobranca} className='img-cobranca-modal' alt='cobrança' />
          <h1 className='title-cobranca-modal'>Detalhe da Cobrança</h1>

          <img
            onClick={() => setOpenDetalheCobrancaModal(false)}
            src={fechar}
            className='pointer fechar-modal'
            alt='fechar'
          />
        </div>
        <div className='detalhes-nome'>
          <h2>Nome</h2>
          <p>{currentCobranca.cliente_nome}</p>
        </div>
        <div className='detalhes-descricao'>
          <h2>Descrição</h2>
          <p>{currentCobranca.descricao}</p>
        </div>
        <div className='detalhes-infos'>
          <div className='detalhes-vencimento-valor'>
            <div className='detalhes-vencimento'>
              <h2>Vencimento</h2>
              <p>
                {format(
                  new Date(
                    `${currentCobranca.data_vencimento.split('T')[0]}T03:00:00`
                  ),
                  'dd/MM/yyyy'
                )}
              </p>
            </div>
            <div className='detalhes-valor'>
              <h2>Valor</h2>
              <p>
                R${' '}
                {String((currentCobranca.valor / 100).toFixed(2)).replace(
                  '.',
                  ','
                )}
              </p>
            </div>
          </div>
          <div className='detalhes-id-status'>
            <div className='detalhes-id'>
              <h2>ID cobranças</h2>
              <p>{currentCobranca.id}</p>
            </div>
            <div className='detalhes-status'>
              <h2>Status</h2>
              <p
                className={
                  currentCobranca.status === 'Paga'
                    ? 'cobranca-status-paga'
                    : currentCobranca.status === 'Vencida'
                    ? 'cobranca-status-vencida'
                    : 'cobranca-status-pendente'
                }>
                {currentCobranca.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
