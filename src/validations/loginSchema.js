import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("O campo E-mail é obrigatório"),
  senha: yup
    .string()
    .min(5, "A senha deve ter no mínimo 5 caracteres")
    .required("Informe a senha"),
});

export default loginSchema;
