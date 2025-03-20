const stringField = (min, max, field) => ({
  notEmpty: {
    errorMessage: `${field} is required`,
  },
  isString: true,
  isLength: {
    options: { min, max },
    errorMessage: `${field} must be between ${min} to ${max} characters`,
  },
});

const intField = (min, max, field) => ({
  notEmpty: {
    errorMessage: `${field} is required`,
  },
  isInt: {
    errorMessage: `${field} will be a number`,
  },
  isLength: {
    options: { min, max },
    errorMessage: `${field} must be between ${min} to ${max} characters`,
  },
});

const emailField = {
  notEmpty: {
    errorMessage: "Email is required",
  },
  isEmail: true,
  errorMessage: "Invalid email",
};

const loginSchema = {
  username: stringField(3, 10, "Username"),
  password: stringField(4, 8, "Password"),
};

const addOrSignupSchema = {
  ...loginSchema,
  name: stringField(3, 20, "Name"),
  age: intField(1, 2, "Age"),
  email: emailField,
};

const editUserSchema = {
  username: stringField(3, 10, "Username"),
  name: stringField(3, 20, "Name"),
  age: intField(1, 2, "Age"),
  email: emailField,
};

export { loginSchema, addOrSignupSchema, editUserSchema };