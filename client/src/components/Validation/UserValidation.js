import * as yup from "yup";

// login valiadtion

const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characeters")
    .matches(/(?=.*[0-9])/, "Password nust contain a number"),
});

// register validation

const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at least than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  fullName: yup
    .string()
    .required("Full name is required ")
    .max(20, "Full name must be less than 20 characters"),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required ")
    .max(20, "Full name must be less than 20 characters"),
  email: yup.string().email().required("Email is required").trim(),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .oneOf([yup.ref("newPassword"), null], "Password must match"),
});

export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
};
