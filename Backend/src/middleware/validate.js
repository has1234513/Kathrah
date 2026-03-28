import { ZodError } from 'zod';

/**
 * Validate request against a Zod schema.
 * Schema should have optional `body`, `query`, `params` keys.
 *
 * @param {import('zod').ZodObject} schema
 */
export function validate(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Overwrite with coerced/parsed values
      if (parsed.body)   req.body   = parsed.body;
      if (parsed.query)  req.query  = parsed.query;
      if (parsed.params) req.params = parsed.params;

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(422).json({
          error: 'Validation failed',
          issues: err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(err);
    }
  };
}
