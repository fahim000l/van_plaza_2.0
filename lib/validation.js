export const createUserValidate = (values) => {
  const errors = {};

  if (!values.userName) {
    errors.userName = "User Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }

  if (!values.cPassword) {
    errors.cPassword = "Password is required";
  } else if (values.password !== values.cPassword) {
    errors.cPassword = "Password did not matched";
    errors.password = "Password did not matched";
  } else if (values.cPassword.length < 8) {
    errors.cPassword = "Password must contain at least 8 characters";
  }

  return errors;
};

export const userLogInValidation = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }

  return errors;
};
