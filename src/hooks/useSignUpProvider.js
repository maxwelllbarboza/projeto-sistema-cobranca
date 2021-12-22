// import { useLocalStorage } from "react-use";
import { useState } from "react";
import useRequest from "./useRequest";
import useGlobalContext from "../hooks/useGlobalContext";
import { signUpDados, signUpSenha } from "../validations/singUpSchema";

const steps = [
  {
    title: "Cadastre-se",
    subtitle: "Por favor, escreva seu nome e e-mail",
  },
  {
    title: "Escolha uma senha",
    subtitle: "Escolha uma senha segura",
  },
  {
    title: "Cadastro realizado com sucesso",
    subtitle: "E-mail e senha cadastrados com sucesso",
  },
];

const useSignUpProvider = () => {
  const [page, setPage] = useState(0);
  const [success, setSuccess] = useState(false);
  const [formulario, setFormulario] = useState({});
  const { exibirErro } = useGlobalContext();

  const request = useRequest();

  async function handleNavigate(event, index) {
    event.preventDefault();

    if (success) {
      setSuccess(false);
      setPage(0);
    }

    if (page === index) return;

    try {
      if (page === 0 && index === 1) {
        await signUpDados.validate(formulario);
        setPage(index);
        return;
      }

      if (page === 1 && index === 2) {
        if (formulario.confirmacaoSenha !== formulario.senha) {
          throw new Error("As senhas devem coincidir");
        }

        await signUpSenha.validate(formulario);
        const { confirmacaoSenha, ...body } = formulario;

        setPage(2);
        const requisicaoSucesso = await request.api("POST", { body }, "users");
        if (!requisicaoSucesso) {
          setPage(0);
          return;
        }
        setSuccess(true);
        setFormulario({});
        return;
      }

      if (index !== 2 && index < page && !success) {
        setPage(index);
      }
    } catch (error) {
      exibirErro(error.message);
    }
  }

  return {
    page,
    setPage,
    steps,
    formulario,
    setFormulario,
    handleNavigate,
    success,
  };
};

export default useSignUpProvider;
