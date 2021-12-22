import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useClientsContext from '../../hooks/useClientsContext';
import useRequests from '../../hooks/useRequests';
import ModalCadCobranca from '../ModalCadCobranca';
import ModalEditClient from '../ModalEditClient';
import iconclientes from './assets/iconclientes.svg';
import iconeditar from './assets/iconeditar.svg';
import iconexcluir from './assets/iconexcluir.svg';
import './styles.css';

const DetalheClients = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentClientes, setCurrentClientes] = useState({});
  const [currentCobranca, setCurrentCobranca] = useState([]);
  const request = useRequests();
  const { idclient } = useParams();
  const { setOpenModalCobranca, openModalCobranca } = useClientsContext();
  const idformatado = parseInt(idclient);

  function handleStatus(current) {
    if (current === 'Vencida') {
      return 'color-vencida';
    } else if (current === 'Pendente') {
      return 'color-pendente';
    } else {
      return 'color-paga';
    }
  }
  useEffect(() => {
    async function listClients() {
      try {
        const resposta = await request.getOne('clients', idformatado);
        if (resposta.length > 0) {
          setCurrentClientes(resposta[0]);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    listClients();
    //eslint-disable-next-line
  }, [idclient]);

  useEffect(() => {
    async function listCobranca() {
      try {
        const result = await request.getOne('charges', idformatado);
        if (result.length > 0) {
          setCurrentCobranca(result);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    listCobranca();
    //eslint-disable-next-line
  }, [openModalCobranca, setOpenModalCobranca]);

  return (
    <main className='container-detalhes'>
      <div className='sign-detalhes'>
        <div className='sign-tittle'>
          <img src={iconclientes} alt='Icone do cliente' />
          <h1 className='monteserrat'>{currentClientes.nome}</h1>
        </div>

        <div className='inf-up '>
          <div className='first-line-up display-align'>
            <strong className='font-tittle'>Dados do cliente</strong>
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className='btn-editar-cliente'>
              Editar Cliente
            </button>
            {openModal && (
              <ModalEditClient
                currentClientes={currentClientes}
                setCurrentClientes={setCurrentClientes}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
          </div>

          <div className='primeira-linha-clientes display-align'>
            <div className='display-flex-column width-primeira-linha'>
              <strong className='font-tittle-bold padding-8'>E-mail</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.email}
              </strong>
            </div>
            <div className='display-flex-column width-primeira-linha'>
              <strong className='font-tittle-bold'>Telefone</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.telefone}
              </strong>
            </div>

            <div className='display-flex-column width-primeira-linha'>
              <strong className='font-tittle-bold'>CPF</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.cpf}
              </strong>
            </div>
          </div>

          <div className='segunda-linha-clientes display-flex'>
            <div className='display-flex-column width-segunda-linha'>
              <strong className='font-tittle-bold padding-8'>Endereço</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.logradouro}
              </strong>
            </div>
            <div className='display-flex-column width-segunda-linha'>
              <strong className='font-tittle-bold '>Bairro</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.bairro}
              </strong>
            </div>
            <div className='display-flex-column width-segunda-linha'>
              <strong className='font-tittle-bold'>Complemento</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.complemento}
              </strong>
            </div>
            <div className='display-flex-column width-segunda-linha'>
              <strong className='font-tittle-bold '>CEP</strong>
              <strong className='font-tittle-normal '>
                {currentClientes.cep}
              </strong>
            </div>
            <div className='display-flex-column width-segunda-linha'>
              <strong className='font-tittle-bold '>Cidade</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.cidade}
              </strong>
            </div>

            <div className='display-flex-column'>
              <strong className='font-tittle-bold padding-8'>UF</strong>
              <strong className='font-tittle-normal'>
                {currentClientes.estado}
              </strong>
            </div>
          </div>
        </div>

        <div className='inf-down scrhol '>
          <div className='display-align first-line-down'>
            <h3 className='font-tittle'>Cobranças do cliente</h3>
            <button
              className='btn-nova-cobranca'
              onClick={() => [setOpenModalCobranca(true)]}>
              + Nova cobrança
            </button>
          </div>

          <div className='table-head nunito-16'>
            <div className='column-tittle'>ID Cob</div>
            <div className='column-tittle'>Data de venc.</div>
            <div className='column-tittle'>Valor</div>
            <div className='column-tittle'>Status</div>
            <div className='column-tittle'>Descrição</div>
          </div>
          <div className='table '>
            {currentCobranca.map((user) => (
              <div key={user.id} className='table-content  nunito-14'>
                <div className='table-line '>
                  <div className='table-item'>{user.usuario_id}</div>
                  <div className='table-item'>
                    {format(
                      new Date(user.data_vencimento).setHours(
                        new Date(user.data_vencimento).getHours() + 3
                      ),
                      'dd/MM/yyyy'
                    )}
                  </div>
                  <div className='table-item'>
                    {(user.valor / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                  <div className={`table-item ${handleStatus(user.status)}`}>
                    {user.status}
                  </div>
                  <div className='table-item'>{user.descricao}</div>
                  <div className='table-item table-img display-flex'>
                    <div className='display-flex-column-centralizado'>
                      <img src={iconeditar} alt='Editar' />
                      <p className='font-img color-editar'>Editar</p>
                    </div>
                    <div className='display-flex-column-centralizado'>
                      <img src={iconexcluir} alt='Excluir' />
                      <p className='font-img color-excluir'>Ecluir</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalCadCobranca currentClientes={currentClientes} />
    </main>
  );
};
export default DetalheClients;
