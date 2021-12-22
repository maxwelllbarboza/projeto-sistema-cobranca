import * as yup from "yup";

const validationModalEdit = yup.object().shape({
  descricao: yup.string().required("Este campo deve ser preenchido"),
  data_vencimento: yup.string().required("Este campo deve ser preenchido"),
  valor: yup.string().required("Este campo deve ser preenchido"),
});

export default validationModalEdit;
