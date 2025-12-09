const { z } = require('zod');

const userUpdatePasswordSchema = z.object({
  body: z.object({
    isOTPValidated: z.boolean({
      required_error: 'OTP validation status is required.',
      invalid_type_error: 'OTP validation must be a boolean.',
    }),
    currentPassword: z.string().min(6, { message: 'Current password must be at least 6 characters long.' }).optional().nullable(),
    newPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});

module.exports = userUpdatePasswordSchema;
