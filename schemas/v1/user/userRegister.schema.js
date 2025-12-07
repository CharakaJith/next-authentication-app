const { z } = require('zod');
const userTitle = require('../../../enum/user/title.enum');

const userRegisterSchema = z.object({
  body: z.object({
    title: z.enum(userTitle.values, { message: 'Invalid title specified.' }),
    firstName: z.string().min(3, { message: 'First name must be at least 3 characters long.' }),
    lastName: z.string().min(3, { message: 'Last name must be at least 3 characters long.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});

module.exports = userRegisterSchema;
