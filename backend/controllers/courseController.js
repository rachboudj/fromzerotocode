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
                tutorials: true
            }
        });
        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const getUserCourses = async (req, res) => {
    const userId = req.user.userId;

    try {
        const inProgressCourses = await prisma.userCourse.findMany({
            where: {
                id_user: userId,
                status: 'In Progress',
            },
            include: {
                course: true,
            },
        });

        const finishedCourses = await prisma.userCourse.findMany({
            where: {
                id_user: userId,
                status: 'Finished',
            },
            include: {
                course: true,
            },
        });

        const user = await prisma.user.findUnique({
            where: { id_user: userId },
        });

        res.json({ 
            inProgressCourses, 
            finishedCourses,
            user: {
                id_user: user.id_user,
                firstName: user.surname,
                lastName: user.name,
            },
        });
    } catch (error) {
        console.error('Error fetching user courses:', error);
        res.status(500).json({ error: 'An error occurred while fetching user courses' });
    }
};

export const getCourseStatus = async (req, res) => {
    
    try {
        const { courseId } = req.params;
    const userId = req.user.userId;

    console.log("Normalement c'est censé mettre un id : " + userId);
        const userCourse = await prisma.userCourse.findFirst({
            where: {
                id_course: parseInt(courseId),
                id_user: userId,
            },
        });

        console.log(userCourse);

        if (!userCourse) {
            return res.json({ status: null });
        }

        res.json({ status: userCourse.status });
    } catch (error) {
        console.error('Error fetching course progress:', error);
        res.status(500).json({ error: 'An error occurred while fetching the course progress' });
    }
};

export const getCourseByIdAndTutorials = async (req, res) => {
    const { courseId } = req.params;

    try {
        const tutorials = await prisma.tutorial.findMany({
            where: { id_course: parseInt(courseId) },
        });
        res.json(tutorials);
    } catch (error) {
        console.error('Error fetching tutorials:', error);
        res.status(500).json({ error: 'An error occurred while fetching tutorials' });
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


export const updateCourseInProgress = async (req, res) => {
    const courseId = parseInt(req.params.id);
    const userId = req.user.userId;

    try {
        const newUserCourse = await prisma.userCourse.create({
            data: {
                id_course: parseInt(courseId),
                id_user: userId,
                status: 'In Progress',
                progress: 0,
            },
        });

        return res.json({ message: 'Course marked as In Progress', data: newUserCourse }); // Added return

    } catch (error) {
        console.error('Error updating course progress:', error);
        res.status(500).json({ error: 'An error occurred while updating the course progress' });
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

export const updateProgressCourse = async (req, res) => {
    const courseId = req.params.id;
    const progress = req.params.progress;
    const userId = req.user.id;

    console.log(req.params);

    console.log("ID du cours : " + courseId);
    console.log("Progrès du cours : " + progress);
    

    try {
        const updatedUserCourse = await prisma.userCourse.updateMany({
            where: {
                id_course: parseInt(courseId),
                id_user: userId,
            },
            data: {
                progress: parseInt(progress),
            },
        });

        if (updatedUserCourse.count === 0) {
            return res.status(404).json({ error: 'User course not found' });
        }

        res.json({ message: 'Course progress updated' });
    } catch (error) {
        console.error('Error updating course progress:', error);
        res.status(500).json({ error: 'An error occurred while updating the course progress' });
    }
}

export const finishCourse = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const updatedUserCourse = await prisma.userCourse.updateMany({
            where: {
                id_course: parseInt(id),
                id_user: userId,
            },
            data: {
                progress: 100,
                status: 'finished',
            },
        });

        if (updatedUserCourse.count === 0) {
            return res.status(404).json({ error: 'User course not found' });
        }

        res.json({ message: 'Course marked as finished' });
    } catch (error) {
        console.error('Error updating course progress:', error);
        res.status(500).json({ error: 'An error occurred while updating the course progress' });
    }
};

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