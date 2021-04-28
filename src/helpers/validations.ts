import * as Yup from "yup";

export const ADD_SITE_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long!")
    .max(32, "Name must be 32 characters at most!")
    .required("Name is a required field!")
    .strict(),
  new_website: Yup.string()
    .url("Site link has a wrong format!")
    .required("Site URL is required!"),
  description: Yup.string()
    .min(3, "Description must be at least 3 characters long!")
    .max(256, "Description must be 256 characters at most!"),
});
