import * as Yup from "yup";
import { isString } from "@helpers/assertions";

export const ADD_SITE_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long!")
    .max(21, "Name must be 21 characters at most!")
    .matches(/^[a-zA-Z-_]+$/, "Name must only include words separated by - or _")
    .required("Name is a required field!")
    .strict(),
  site_url: Yup.string().required("Site URL is required!"),
  description: Yup.string()
    .min(3, "Description must be at least 3 characters long!")
    .max(256, "Description must be 256 characters at most!"),
});

export const UPDATE_SITE_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long!")
    .max(21, "Name must be 21 characters at most!")
    .matches(/^[a-zA-Z-_]+$/, "Name must only include words separated by - or _")
    .required("Name is a required field!")
    .strict(),
  url: Yup.string().url("URL has a wrong format!").required("Site URL is required!"),
  description: Yup.string()
    .min(3, "Description must be at least 3 characters long!")
    .max(256, "Description must be 256 characters at most!"),
  comment_policy: Yup.string().url("URL has a wrong format!"),
  nsfw_content: Yup.bool(),
  branding: Yup.bool(),
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

export const CONTACT_SCHEMA = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First Name must be at least 2 characters long!")
    .max(18, "First Name must be 18 characters at most!")
    .required("First Name is a required field!"),
  last_name: Yup.string()
    .min(2, "Last Name must be at least 2 characters long!")
    .max(18, "Last Name must be 18 characters at most!")
    .required("Last Name is a required field!"),
  company_name: Yup.string()
    .min(3, "Company Name must be at least 3 characters long!")
    .max(36, "Company Name must be 36 characters at most!")
    .required("Company Name is a required field!"),
  company_size: Yup.number()
    .min(1, "Company Size must be greater then 1")
    .transform((value, originalValue) => {
      if (isString(originalValue) && originalValue === "") {
        return null;
      }
      return value;
    })
    .nullable()
    .required("Company Size is a required field!"),
  job_title: Yup.string()
    .min(2, "Job Title must be at least 2 characters long!")
    .max(28, "Job Title must be 28 characters at most!")
    .required("Job Title is a required field!"),
  work_email: Yup.string()
    .email("Work Email address has a wrong format")
    .required("Work Email address is a required field"),
  additional_info: Yup.string()
    .min(128, "Additional Information must be at least 128 characters long!")
    .max(2000, "Additional Information must be 2000 characters at most!")
    .required("Additional Information is a required field!"),
});
