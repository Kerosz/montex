import * as Yup from "yup";

export const ADD_SITE_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long!")
    .max(21, "Name must be 21 characters at most!")
    .matches(/^[a-zA-Z-_]+$/, "Name must only include words separated by - or _")
    .required("Name is a required field!")
    .strict(),
  new_website: Yup.string().required("Site URL is required!"),
  description: Yup.string()
    .min(3, "Description must be at least 3 characters long!")
    .max(256, "Description must be 256 characters at most!"),
});

export const SIGNUP_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Email address has a wrong format")
    .required("Email address is a required field"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long!")
    .max(24, "Password must be 24 characters at most!")
    .required("Password is a required field"),
});
