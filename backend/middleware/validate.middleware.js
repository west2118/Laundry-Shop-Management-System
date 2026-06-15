import { z } from "zod";

const validate = (schema) => async (req, res, next) => {
  try {
    // Strip unknown fields
    const validatedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Instead of reassigning (which throws in Express 5), mutate the existing objects
    if (validatedData.body) {
      Object.keys(req.body).forEach(k => delete req.body[k]);
      Object.assign(req.body, validatedData.body);
    }
    if (validatedData.query) {
      Object.keys(req.query).forEach(k => delete req.query[k]);
      Object.assign(req.query, validatedData.query);
    }
    if (validatedData.params) {
      Object.keys(req.params).forEach(k => delete req.params[k]);
      Object.assign(req.params, validatedData.params);
    }
    
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    next(error);
  }
};

export default validate;
