import { body } from 'express-validator';

export const signupValidationSchema = [
    // firstName: Required, max 25 chars (matches @db.VarChar(25))
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ max: 25 }).withMessage('First name cannot exceed 25 characters'),

    // lastName: Required, max 25 chars (matches @db.VarChar(25))
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ max: 25 }).withMessage('Last name cannot exceed 25 characters'),

    // username: Required, max 25 chars
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 25 }).withMessage('Username must be between 3 and 25 characters')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

    // email: Required, valid email format, max 254 chars (matches @db.VarChar(254))
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .isLength({ max: 254 }).withMessage('Email is too long')
        .normalizeEmail(),

    // password: Required, usually check for length (even if db is @db.Text)
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    // bio: Optional, max 200 chars (matches @db.VarChar(200))
    body('bio')
        .optional({ checkFalsy: true })
        .isLength({ max: 200 }).withMessage('Bio cannot exceed 200 characters'),
];

export const loginValditionSchema = [
    // email: Required, valid email format, max 254 chars (matches @db.VarChar(254))
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .isLength({ max: 254 }).withMessage('Email is too long')
        .normalizeEmail(),

    // password: Required, usually check for length (even if db is @db.Text)
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];