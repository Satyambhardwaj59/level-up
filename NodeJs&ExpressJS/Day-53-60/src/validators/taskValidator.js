const { z } = require('zod');

const statusEnum = z.enum(['todo', 'in-progress', 'completed'], {
  errorMap: () => ({ message: 'Status must be todo, in-progress, or completed' }),
});

const priorityEnum = z.enum(['low', 'medium', 'high'], {
  errorMap: () => ({ message: 'Priority must be low, medium, or high' }),
});

/**
 * Schema for POST /api/v1/tasks
 */
const createTaskSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters'),

  description: z
    .string()
    .trim()
    .max(2000, 'Description cannot exceed 2000 characters')
    .optional()
    .default(''),

  status: statusEnum.optional().default('todo'),

  priority: priorityEnum.optional().default('medium'),

  dueDate: z
    .string()
    .datetime({ message: 'dueDate must be a valid ISO 8601 date string' })
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
});

/**
 * Schema for PUT /api/v1/tasks/:id
 * All fields are optional (partial update)
 */
const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000, 'Description cannot exceed 2000 characters')
    .optional(),

  status: statusEnum.optional(),

  priority: priorityEnum.optional(),

  dueDate: z
    .string()
    .datetime({ message: 'dueDate must be a valid ISO 8601 date string' })
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
});

module.exports = { createTaskSchema, updateTaskSchema };
