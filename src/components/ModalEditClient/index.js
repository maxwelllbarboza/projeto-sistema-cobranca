import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import iconcadastro from './assets/iconcadastro.svg';
import iconfechar from './assets/iconfechar.svg';
import InputMask from  'react-input-mask';
import './styles.css';


const ModalEditClient = ({ openModal, setOpenModal, currentClientes, setCurrentClientes }) => {
  const { setToken, exibirSucesso } = useGlobalContext();
  const navigate = useNavigate();
  const requests = useRequests();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    if (currentClientes) {  
      console.log(currentClientes)     
      setForm({
        nome: currentClientes.nome,
        email: currentClientes.email,
        cpf: currentClientes.cpf,
        telefone: currentClientes.telefone,       
        cep: currentClientes.cep,       
        logradouro: currentClientes.logradouro,
        complemento: currentClientes.complemento,
        bairro: currentClientes.bairro,
        cidade: currentClientes.cidade,
        estado: currentClientes.estado        
      });
    }      
  }, [currentClientes]);

  function handleChange(target) {
    const newValues = { ...form, [target.name]: target.value };
    setForm(newValues);
  }

  async function insertContact(body) {
    return await requests.put('clients', body, currentClientes.id);
  }

  async function handleSubmit(event) {
    event.preventDefault();       
    const body = {
      nome: form.nome,
      email: form.email,
      cpf: form.cpf,
      telefone: form.telefone,
      cep: form.cep,
      logradouro: form.logradouro,
      complemento: form.complemento,
      bairro: form.bairro,
      cidade: form.cidade,
      estado: form.estado
    };

    const result = await insertContact(body);
    if (result) {
      setToken(result.token);
      setOpenModal(false);
      navigate('/clients');
      exibirSucesso('Edições do cadastro concluídas com sucesso');
    }
  }

  return (
    <div className='container-modal'>
      <div className='modal-content'>
        <div className='flex-end'>
          <img
            src={iconfechar}
            className='pointer'
            onClick={() => setOpenModal(false)}
            alt='icone fechar'
          />
        </div>
        <div className='display-align tittle-modal'>
          <img src={iconcadastro} alt='icone cadastro' />
          <h1 className='font-tit-cad'>Editar Cliente</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='display-flex-column space-input'>
            <label className='label-input'>Nome*</label>
            <input
              type='text'
              name='nome'
              value={form.nome}
              onChange={(e) => handleChange(e.target)}
              required
              placeholder='Digite o nome'
            />
          </div>

          <div className='display-flex-column space-input'>
            <label className='label-input'>E-mail*</label>
            <input
              type='text'
              name='email'
              value={form.email}
              onChange={(e) => handleChange(e.target)}
              required
              placeholder='Digite o e-mail'
            />
          </div>

          <div className='alinhar-cpf-tel display-align input-between space-input'>
            <div className='inputs display-flex-column '>
              <label className='label-input'>CPF*</label>
              <InputMask
                mask = "999.999.999-99"
                type='text'
                name='cpf'
                value={form.cpf}
                onChange={(e) => handleChange(e.target)}
                required
                placeholder='Digite o CPF'
                className='input-pequeno'
              />              
            </div>

            <div className='display-flex-column'>
              <label className='label-input'>Telefone*</label>
              <InputMask
                mask = "(99)99999-9999"
                type='text'
                name='telefone'
                value={form.telefone}
                onChange={(e) => handleChange(e.target)}
                required
                placeholder='Digite o telefone'
                className='input-pequeno'
              />
            </div>
          </div>

          <div className='display-flex-column space-input'>
            <label className='label-input'>Endereço</label>
            <input
              type='text'
              name='logradouro'
              value={form.logradouro}
              onChange={(e) => handleChange(e.target)}
              placeholder='Digite o endereço'
            />
          </div>

          <div className='display-flex-column space-input'>
            <label className='label-input'>Complemento</label>
            <input
              type='text'
              name='complemento'
              value={form.complemento}
              onChange={(e) => handleChange(e.target)}
              placeholder='Digite o complemento'
            />
          </div>

          <div className='display-align space-input input-between'>
            <div className='inputs display-flex-column'>
              <label className='label-input'>CEP</label>
              <InputMask
                mask = "99999-999"
                type='text'
                name='cep' 
                value={form.cep}               
                onChange={(e) => handleChange(e.target)}
                placeholder='Digite o CEP'
                className='input-pequeno'
              />
            </div>

            <div className='display-flex-column'>
              <label className='label-input'>Bairro</label>
              <input
                type='text'
                name='bairro'
                value={form.bairro}
                onChange={(e) => handleChange(e.target)}
                placeholder='Digite o bairro'
                className='input-pequeno'
              />
            </div>
          </div>

          <div className='display-align space-input-btn input-between'>
            <div className='display-flex-column'>
              <label className='label-input'>Cidade*</label>
              <input
                type='text'
                name='cidade'
                value={form.cidade}
                onChange={(e) => handleChange(e.target)}
                placeholder='Digite a cidade'
                className='input-cidade'
              />
            </div>

            <div className='display-flex-column'>
              <label className='label-input'>UF*</label>
              <input
                type='text'
                name='estado'
                value={form.estado}
                onChange={(e) => handleChange(e.target)}
                placeholder='Digite a UF'
                className='input-estado'
              />
            </div>
          </div>

          <div className='display-align input-between'>
            <button
              className='pointer cancel-button'
              onClick={() => setOpenModal(false)}>
              Cancelar
            </button>
            <button className='pointer apply-button'>Aplicar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModalEditClient;
