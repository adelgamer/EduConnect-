import express from 'express';
import { checkSchema } from 'express-validator';
import * as specialtyController from './specialty.controller.js';
import { createSpecialtyValidationSchema, updateSpecialtyValidationSchema } from './specialty.validation.js';

/**
 * Express router for Specialty module.
 * Maps HTTP verbs to controller functions.
 */
const specialtyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Specialty
 *   description: Specialty management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Specialty:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The specialty ID
 *         name:
 *           type: string
 *           description: Full name of the specialty
 *           example: Computer Science
 *         shortName:
 *           type: string
 *           description: Short name or abbreviation
 *           example: CS
 *         description:
 *           type: string
 *           description: Brief description of the specialty
 *           example: Study of computation, automation, and information.
 *         facultyId:
 *           type: string
 *           format: uuid
 *           description: ID of the faculty this specialty belongs to
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
 * /specialty:
 *   get:
 *     summary: Retrieve all Specialties
 *     tags: [Specialty]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Specialties retrieved successfully
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
 *                   example: specialtys retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Specialty'
 */
specialtyRouter.get('/', specialtyController.getSpecialtysController);

/**
 * @swagger
 * /specialty/{id}:
 *   get:
 *     summary: Retrieve a single Specialty by ID
 *     tags: [Specialty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The specialty ID
 *     responses:
 *       200:
 *         description: Specialty retrieved successfully
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
 *                   example: specialty retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Specialty'
 *       404:
 *         description: Specialty not found
 */
specialtyRouter.get('/:id', specialtyController.getSpecialtyByIdController);

/**
 * @swagger
 * /specialty:
 *   post:
 *     summary: Create a new Specialty
 *     tags: [Specialty]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - facultyId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Artificial Intelligence
 *               shortName:
 *                 type: string
 *                 example: AI
 *               description:
 *                 type: string
 *                 example: Advanced study of intelligent agents.
 *               facultyId:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       201:
 *         description: Specialty created successfully
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
 *                   example: specialty created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Specialty'
 */
specialtyRouter.post('/', createSpecialtyValidationSchema, specialtyController.createSpecialtyController);

/**
 * @swagger
 * /specialty/{id}:
 *   put:
 *     summary: Update an existing Specialty
 *     tags: [Specialty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The specialty ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computer Engineering
 *               shortName:
 *                 type: string
 *                 example: CE
 *               description:
 *                 type: string
 *                 example: Integration of electronic engineering and computer science.
 *               facultyId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Specialty updated successfully
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
 *                   example: specialty updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Specialty'
 */
specialtyRouter.put('/:id', updateSpecialtyValidationSchema, specialtyController.updateSpecialtyController);

/**
 * @swagger
 * /specialty/{id}:
 *   delete:
 *     summary: Delete a Specialty record
 *     tags: [Specialty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The specialty ID to delete
 *     responses:
 *       200:
 *         description: Specialty deleted successfully
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
 *                   example: specialty deleted successfully
 */
specialtyRouter.delete('/:id', specialtyController.deleteSpecialtyController);

export default specialtyRouter;