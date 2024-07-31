import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import upload from "./config/multer.js";
import authenticateToken from './utils/authMiddleware.js';


import * as registerLoginController from './controllers/registerLoginController.js';
import * as userController from './controllers/userController.js';
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

// Connexion + inscription
app.post('/register', registerLoginController.register);
app.post('/login', registerLoginController.login);

// Utilisateur
app.get('/api/users', userController.getUsers);
app.get('/api/users/:id', userController.getUserById);
app.put('/api/users/:id/edit', userController.updateUser);
app.get('/api/userRole', userController.getUserRole);
app.post('/api/users/:userId/roles/:roleId', userController.addRoleToUser);
app.delete('/api/users/:userId/roles/:roleId', userController.deleteRoleFromUser);
app.delete('/api/users/:userId', authenticateToken, userController.deleteUser);

// Cours
app.get('/api/courses', courseController.getCourses);
app.get('/api/courses/:id', courseController.getCoursesById);
app.get('/api/user-courses', authenticateToken, courseController.getUserCourses);
app.get('/api/user-courses/:courseId/progress', authenticateToken, courseController.getCourseStatus);
app.get('/api/courses/:courseId/tutorials', courseController.getCourseByIdAndTutorials);
app.post('/api/courses/new', upload.single('thumbnail'), courseController.createCourse);
app.put('/api/courses/:id/edit', upload.single('thumbnail'), courseController.updateCourse);
app.put('/api/user-courses/:id/progress/:progress', authenticateToken, courseController.updateProgressCourse);
app.put('/api/user-courses/:id/finish', authenticateToken, courseController.finishCourse);
app.post('/api/user-courses/:id/start', authenticateToken, courseController.updateCourseInProgress);
app.delete('/api/courses/:id', courseController.deleteCourse);

// Tutorial
app.get('/api/tutorials', tutorialController.getTutorial);
app.get('/api/tutorials/:id', tutorialController.getTutorialById);
app.get('/api/courses/:courseId/tutorials/:tutorialId', tutorialController.getTutorialByCourseAndId);
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