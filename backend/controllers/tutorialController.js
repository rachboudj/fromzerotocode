import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTutorial = async (req, res) => {
    const tutorials = await prisma.tutorial.findMany({
        include: {
            course: true,
        },
    });
    res.json(tutorials);
}

export const getTutorialById = async (req, res) => {
    const tutorialId = parseInt(req.params.id, 10);

    try {
        const tutorial = await prisma.tutorial.findUnique({
            where: { 
                id_tutorial: tutorialId,
            },
            include: {
                course: true,
            }
        });
        res.json(tutorial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const getTutorialByCourseAndId = async (req, res) => {
    const { courseId, tutorialId } = req.params;

    try {
        const tutorial = await prisma.tutorial.findFirst({
            where: {
                id_tutorial: parseInt(tutorialId),
                id_course: parseInt(courseId),
            },
        });

        if (!tutorial) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        res.json(tutorial);
    } catch (error) {
        console.error('Error fetching tutorial:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createTutorial = async (req, res) => {
    try {
        const course = parseInt(req.body.course);
    
        const { title, content } = req.body;

        const tutorialObj = await prisma.course.findUnique({
            where: { id_course: course },
        });

        if (!tutorialObj) {
            return res.status(404).json({ error: 'Tuto introuvable' });
        }

        const tutorial = await prisma.tutorial.create({
            data: {
                title,
                content,
                course: { connect: { id_course: parseInt(course) } },
            }
        });

        res.json(tutorial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateTutorial = async (req, res) => {
    const tutorialId = parseInt(req.params.id);
    const { title, content } = req.body;
    const course = parseInt(req.body.course);

    try {
        const updatedTutorial = await prisma.tutorial.update({
            where: { id_tutorial: tutorialId },
            data: {
                title: title,
                content: content,
                id_course: course,
            },
        });

        res.json(updatedTutorial)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification du cours' });
    }
}

export const deleteTutorial = async (req, res) => {
    const tutorialId = parseInt(req.params.id);

    try {
        const deleteTutorial = await prisma.tutorial.delete({
            where: {id_tutorial : tutorialId}
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du tutoriel' });
    }
}