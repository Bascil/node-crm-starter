const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => ({
        message: err.message.replace(/[^\w\s]/g, ""),
        field: err.context.label,
      })),
    });
  }
  next();
};

module.exports = validator;
