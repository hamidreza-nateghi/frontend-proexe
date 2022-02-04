import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().trim().strict(),
});

export default schema;
