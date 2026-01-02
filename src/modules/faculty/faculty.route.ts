import express from 'express';
import { checkSchema } from 'express-validator';
import * as facultyController from './faculty.controller.js';
import { createFacultyValidationSchema, updateFacultyValidationSchema } from './faculty.validation.js';

/**
 * Express router for Faculty module.
 * Maps HTTP verbs to controller functions.
 */
const facultyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Faculty
 *   description: Faculty management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Faculty:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The faculty ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /faculty:
 *   get:
 *     summary: Retrieve all Facultys
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Facultys retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: facultys retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Faculty'
 */
facultyRouter.get('/', facultyController.getFacultysController);

/**
 * @swagger
 * /faculty/{id}:
 *   get:
 *     summary: Retrieve a single Faculty by ID
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The faculty ID
 *     responses:
 *       200:
 *         description: Faculty retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: faculty retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Faculty'
 *       404:
 *         description: Faculty not found
 */
facultyRouter.get('/:id', facultyController.getFacultyByIdController);

/**
 * @swagger
 * /faculty:
 *   post:
 *     summary: Create a new Faculty
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Add properties here
 *               exampleProperty:
 *                 type: string
 *     responses:
 *       201:
 *         description: Faculty created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: faculty created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Faculty'
 */
facultyRouter.post('/', createFacultyValidationSchema, facultyController.createFacultyController);

/**
 * @swagger
 * /faculty/{id}:
 *   put:
 *     summary: Update an existing Faculty
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The faculty ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Add properties here
 *               exampleProperty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Faculty updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: faculty updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Faculty'
 */
facultyRouter.put('/:id', updateFacultyValidationSchema, facultyController.updateFacultyController);

/**
 * @swagger
 * /faculty/{id}:
 *   delete:
 *     summary: Delete a Faculty record
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The faculty ID to delete
 *     responses:
 *       200:
 *         description: Faculty deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: faculty deleted successfully
 */
facultyRouter.delete('/:id', facultyController.deleteFacultyController);

export default facultyRouter;