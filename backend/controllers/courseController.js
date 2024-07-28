import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCourses = async (req, res) => {
    const courses = await prisma.course.findMany({
        include: {
            category: true,
            tutorials: true
        },
    });
    res.json(courses);
}

export const getCoursesById = async (req, res) => {
    const coursesId = parseInt(req.params.id, 10);

    try {
        const course = await prisma.course.findUnique({
            where: { 
                id_course: coursesId,
            },
            include: {
                category: true,
            }
        });
        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const createCourse = async (req, res) => {
    const category = parseInt(req.body.category);

    try {
        const { title, description, date } = req.body;
        const thumbnail = req.file ? req.file.path : null;

        const categoryObj = await prisma.category.findUnique({
            where: { id_category: category },
        });

        if (!categoryObj) {
            return res.status(404).json({ error: 'Catégorie introuvable' });
        }

        const course = await prisma.course.create({
            data: {
                title,
                description,
                thumbnail,
                date : new Date(date),
                category: { connect: { id_category: parseInt(category) } },
            }
        });

        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCourse = async (req, res) => {
    const courseId = parseInt(req.params.id);
    const { title, description } = req.body;
    const thumbnail = req.file ? req.file.path : null;
    const category = parseInt(req.body.id_category);

    try {
        const updatedCourse = await prisma.course.update({
            where: { id_course: courseId },
            data: {
                title: title,
                description: description,
                thumbnail: thumbnail || undefined,
                id_category: category,
            },
        });

        res.json(updatedCourse)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification du cours' });
    }
}

export const deleteCourse = async (req, res) => {
    const courseId = parseInt(req.params.id);

    try {
        const deleteCourse = await prisma.course.delete({
            where: {id_course : courseId}
        })
        res.status(200).json(deleteCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la catégorie' });
    }
}