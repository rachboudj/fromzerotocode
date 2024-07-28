import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import upload from "./config/multer.js";

import * as courseController from './controllers/courseController.js';
import * as tutorialController from './controllers/tutorialController.js';
import * as categoryController from './controllers/categoryController.js';
import * as roleController from './controllers/roleController.js';

const prisma = new PrismaClient();
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

// Cours
app.get('/api/courses', courseController.getCourses);
app.get('/api/courses/:id', courseController.getCoursesById);
app.post('/api/courses/new', upload.single('thumbnail'), courseController.createCourse);
app.put('/api/courses/:id/edit', upload.single('thumbnail'), courseController.updateCourse);
app.delete('/api/courses/:id', courseController.deleteCourse);

// Tutorial
app.get('/api/tutorials', tutorialController.getTutorial);
app.get('/api/tutorials/:id', tutorialController.getTutorialById);
app.post('/api/tutorials/new', tutorialController.createTutorial);
app.put('/api/tutorials/:id/edit', tutorialController.updateTutorial);
app.delete('/api/tutorials/:id', tutorialController.deleteTutorial);

// Rôle
app.get('/api/roles', roleController.getRoles);
app.post('/api/roles/new', roleController.createRole);
app.get('/api/roles/:id', roleController.getRoleById);
app.put('/api/roles/:id/edit', roleController.updateRole);
app.delete('/api/roles/:id', roleController.deleteRole);

// Category
app.get('/api/category', categoryController.getCategory);
app.get('/api/category/:id', categoryController.getCategoryById);
app.post('/api/category/new', categoryController.createCategory);
app.put('/api/category/:id/edit', categoryController.updateCategory);
app.delete('/api/category/:id', categoryController.deleteCategory);

app.listen(process.env['APP_PORT'], () => {
    console.log(`Serveur allumé sur le port ${process.env['APP_PORT']}`);
})