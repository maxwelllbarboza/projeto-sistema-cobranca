import * as yup from "yup";
import toast from "../helpers/toast";

const insertSchema = yup.object().shape({
  nome: yup
    .string()
    .required(() => toast.messageError("O campo Nome é obrigatório")),
  email: yup
    .string()
    .email(() => toast.messageError("Informe um e-mail válido"))
    .required(() => toast.messageError("O campo E-mail é obrigatório")),
  cpf: yup.required(() => toast.messageError("O campo CPF é obrigatório")),
  telefone: yup
    .string()
    .telefone(() => toast.messageError("Informe um Telefone válido"))
    .required(() => toast.messageError("O campo Telefone é obrigatório")),
});

export default insertSchema;
