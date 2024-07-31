import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const saltRounds = 10;

export { prisma, bcrypt, jwt, saltRounds };