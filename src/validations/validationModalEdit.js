import * as yup from "yup";

const validationModalEdit = yup.object().shape({
  nome: yup
    .string()
    .required("Este campo deve ser preenchido")
    .max(20, "O nome deve ter até 20 caracteres"),
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Este campo deve ser preenchido"),
  senha: yup
    .string()
    .oneOf([yup.ref("novaSenha")], "Senhas precisam ser iguais"),
});

export default validationModalEdit;
