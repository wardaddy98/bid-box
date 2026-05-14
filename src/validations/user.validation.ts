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
    // profileImage: z.string().optional(),
    // googleId: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });
