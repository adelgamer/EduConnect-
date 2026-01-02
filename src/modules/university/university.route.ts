import express from 'express';
import { checkSchema } from 'express-validator';
import * as universityController from './university.controller.js';
import { createUniversityValidationSchema, updateUniversityValidationSchema } from './university.validation.js';

/**
 * Express router for University module.
 * Maps HTTP verbs to controller functions.
 */
const universityRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: University
 *   description: University management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     University:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The university ID
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
 * /university:
 *   get:
 *     summary: Retrieve all Universitys
 *     tags: [University]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Universitys retrieved successfully
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
 *                   example: universitys retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/University'
 */
universityRouter.get('/', universityController.getUniversitysController);

/**
 * @swagger
 * /university/{id}:
 *   get:
 *     summary: Retrieve a single University by ID
 *     tags: [University]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The university ID
 *     responses:
 *       200:
 *         description: University retrieved successfully
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
 *                   example: university retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/University'
 *       404:
 *         description: University not found
 */
universityRouter.get('/:id', universityController.getUniversityByIdController);

/**
 * @swagger
 * /university:
 *   post:
 *     summary: Create a new University
 *     tags: [University]
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
 *         description: University created successfully
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
 *                   example: university created successfully
 *                 data:
 *                   $ref: '#/components/schemas/University'
 */
universityRouter.post('/', createUniversityValidationSchema, universityController.createUniversityController);

/**
 * @swagger
 * /university/{id}:
 *   put:
 *     summary: Update an existing University
 *     tags: [University]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The university ID to update
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
 *         description: University updated successfully
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
 *                   example: university updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/University'
 */
universityRouter.put('/:id', updateUniversityValidationSchema, universityController.updateUniversityController);

/**
 * @swagger
 * /university/{id}:
 *   delete:
 *     summary: Delete a University record
 *     tags: [University]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The university ID to delete
 *     responses:
 *       200:
 *         description: University deleted successfully
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
 *                   example: university deleted successfully
 */
universityRouter.delete('/:id', universityController.deleteUniversityController);

export default universityRouter;