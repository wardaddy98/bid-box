import { toast } from 'react-toastify';
import * as z from 'zod';

const validateUserInput = (formValues: unknown, schema: unknown): boolean => {
  const schemaWithType = schema as z.ZodType;
  const result = schemaWithType.safeParse(formValues);

  if (!result.success) {
    toast.error(result.error.issues[0].message);
    return false;
  }

  return true;
};

export default validateUserInput;
