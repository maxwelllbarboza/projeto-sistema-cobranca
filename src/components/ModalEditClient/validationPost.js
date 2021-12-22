import * as yup from "yup";

const validationPost = yup.object().shape({
  nome: yup
    .string()
    .required("Este campo deve ser preenchido")
    .max(20, "O nome deve ter até 20 caracteres"),
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Este campo deve ser preenchido"),
  novaSenha: yup
    .string()
    .required("Este campo deve ser preenchido")
    .min(5, "A senha deve ter até 5 caracteres"),
  confirmaSenha: yup
    .string()
    .required("Este campo deve ser preenchido")
    .min(5, "A senha deve ter até 5 caracteres"),
});

export default validationPost;
