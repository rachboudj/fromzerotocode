import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategory = async (req, res) => {
    const category = await prisma.category.findMany();
    res.json(category);
}

export const getCategoryById = async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);

    try {
        const category = await prisma.category.findUnique({
            where: { id_category: categoryId }
        });
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const createCategory = async (req, res) => {

    try {
        const { title, description, statut } = req.body;
        const category = await prisma.category.create({
            data: {
                title,
                description,
                statut
            }
        });

        res.json(category)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const updatedCategoryData = req.body

    try {
        const updatedCategory = await prisma.category.update({
            where: { id_category: categoryId },
            data: {
                title: updatedCategoryData.title,
                description: updatedCategoryData.description,
                statut: updatedCategoryData.statut,
            },
        });

        res.json(updatedCategory)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification de la catégorie' });
    }
}

export const deleteCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id);

    try {
        const deleteCategory = await prisma.category.delete({
            where: {id_category : categoryId}
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la catégorie' });
    }
}