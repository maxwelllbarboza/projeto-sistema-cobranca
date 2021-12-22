import * as yup from "yup";

const signUpDados = yup.object().shape({
  nome: yup.string().required("O campo Nome é obrigatório"),
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("O campo E-mail é obrigatório"),
});

const signUpSenha = yup.object().shape({
  senha: yup
    .string()
    .required("O campo senha é obrigatório")
    .min(5, "A senha deve ter no mínimo 5 caracteres"),
});

export { signUpDados, signUpSenha };
