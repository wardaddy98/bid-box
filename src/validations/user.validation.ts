import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email!'),
  password: z.string().min(1, 'Password is required!'),
});

export const createUserSchema = z
  .object({
    name: z.string().min(1, 'Name is required!'),
    email: z.email('Invalid email!'),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={[}\]|\\:;"'<>,.?/~`]).{8,16}$/,
        'Password must contain uppercase, number, symbol and be 8-16 characters!',
      ),
    confirmPassword: z.string().min(1, 'Confirm password is required!'),
    adminCode: z.string().optional(),
    isAdmin: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match!',
      });
    }

    if (data.isAdmin && !data.adminCode) {
      ctx.addIssue({
        code: 'custom',
        path: ['adminCode'],
        message: 'Admin code is required for admin users!',
      });
    }

    if (data.adminCode && data.isAdmin && data.adminCode.length !== 4) {
      ctx.addIssue({
        code: 'custom',
        path: ['adminCode'],
        message: 'Admin code should be 4 digits!',
      });
    }
  });

export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={[}\]|\\:;"'<>,.?/~`]).{8,16}$/,
        'Password must contain uppercase, number, symbol and be 8-16 characters!',
      ),
    confirmPassword: z.string().min(1, 'Confirm password is required!'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match!',
      });
    }
  });
