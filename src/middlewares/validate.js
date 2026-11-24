const createValidator = (source) => (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req[source] ?? {}, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });
  if (error) return next(error);
  req.validated = value;
  next();
};

export const validate = createValidator('body');
export const validateQuery = createValidator('query');

export default validate;