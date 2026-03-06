const { z } = require('zod');

const authSchema = z.object({
  body: z.object({ 
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['USER', 'ADMIN']).optional()
  })
});
const taskSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional()
  })
});
module.exports = { authSchema, taskSchema };