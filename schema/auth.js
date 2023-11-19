

import yup from "yup";

const signupSchema = new yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải trùng khớp")
    .required(),
});

const signinSchema = new yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export { signupSchema, signinSchema };
