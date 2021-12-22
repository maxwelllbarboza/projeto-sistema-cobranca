import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import useSignUpContext from "../../hooks/useSignUpContext";
import imgConfirm from "./assets/confirm.svg";
import off from "./assets/off.svg";
import on from "./assets/on.svg";


const EtapaDados = () => {
  const { formulario, setFormulario, handleNavigate } = useSignUpContext();

  return (
    <form
      className="container-dados"
      onSubmit={(e) => handleNavigate(e, 1)}
      onChange={(e) =>
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
      }
    >
      <h2 className="primary-title">Adicione seus Dados</h2>

      <div className="container-dados-input">
        <label className="normal-nunito">Nome*</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          className="default-input"
          name="nome"
          defaultValue={formulario.nome}
        />
      </div>

      <div className="container-dados-input">
        <label className="normal-nunito">E-mail*</label>
        <input
          type="text"
          placeholder="Digite seu E-mail"
          className="default-input"
          name="email"
          defaultValue={formulario.email}
        />
      </div>
      <div className="btn-dados">
        <ActionButton>Continuar</ActionButton>
      </div>
      <span className="normal-nunito">
        Já possui uma conta? Faça seu{" "}
        <a href="/" className="link-rosa">
          Login
        </a>
      </span>
    </form>
  );
};

const EtapaSenha = () => {
  const [exibir, setExibir] = useState({});
  const { formulario, setFormulario, handleNavigate } = useSignUpContext();

  return (
    <form
      className="container-dados"
      onSubmit={(e) => handleNavigate(e, 2)}
      onChange={(e) =>
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
      }
    >
      <h2 className="primary-title">Escolha uma senha</h2>

      <div className="container-dados-input">
        <label className="normal-nunito">Senha*</label>
        <input
          type={exibir.senha ? "text" : "password"}
          placeholder="••••••••"
          className="default-input"
          name="senha"
          defaultValue={formulario.senha}
        />
        <img
          className="eye"
          src={exibir.senha ? on : off}
          alt=""
          onClick={() => setExibir({ ...exibir, senha: !exibir.senha })}
        />
      </div>

      <div className="container-dados-input">
        <label className="normal-nunito">Repita a senha*</label>
        <input
          type={exibir.confirmacaoSenha ? "text" : "password"}
          placeholder="••••••••"
          className="default-input"
          name="confirmacaoSenha"
          defaultValue={formulario.confirmacaoSenha}
        />
        <img
          className="eye"
          src={exibir.confirmacaoSenha ? on : off}
          alt=""
          onClick={() =>
            setExibir({ ...exibir, confirmacaoSenha: !exibir.confirmacaoSenha })
          }
        />
      </div>
      <div className="btn-dados">
        <ActionButton>Cadastrar</ActionButton>
      </div>
      <span className="normal-nunito">
        Já possui uma conta? Faça seu{" "}
        <a href="/signin" className="link-rosa">
          Login
        </a>
      </span>
    </form>
  );
};

const EtapaCarregando = () => {
  return (
    <>
      <div className="container-sucesso">
        <div className="loader"></div>
        <h2 className="primary-title">Carregando...</h2>
      </div>
    </>
  );
};

const EtapaSucesso = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-sucesso">
        <img src={imgConfirm} alt="" />
        <h2 className="primary-title">Cadastro realizado com sucesso!</h2>
      </div>
      <div className="btn-dados" onClick={() => navigate("/")}>
        <ActionButton>Ir para Login</ActionButton>
      </div>
    </>
  );
};

const Etapas = () => {
  const { page, success } = useSignUpContext();
  return (
    <>
      {page === 0 && <EtapaDados />}
      {page === 1 && <EtapaSenha />}
      {page === 2 && !success && <EtapaCarregando />}
      {page === 2 && success && <EtapaSucesso />}
    </>
  );
};

export default Etapas;
