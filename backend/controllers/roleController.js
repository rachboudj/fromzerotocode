import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRoles = async (req, res) => {
    try {
        const roles = await prisma.role.findMany();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const getRoleById = async (req, res) => {
    const roleId = parseInt(req.params.id, 10);

    try {
        const role = await prisma.role.findUnique({
            where: {id_role: roleId}
        })
        res.json(role)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const createRole = async (req, res) => {
    try {
        const name = req.body.name
        const role = await prisma.role.create({
            data : {
                name
            }
        });

        res.json(role)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateRole = async (req, res) => {
    const roleId = parseInt(req.params.id)
    const updatedRoleData = req.body

    try {
        const updatedRole = await prisma.role.update({
            where : { id_role : roleId},
            data : {
                name : updatedRoleData.name
            }
        });

        res.json(updatedRole)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification de la catégorie' });
    }
}

export const deleteRole = async (req, res) => {
    const roleId = parseInt(req.params.id);

    try {
        const deleteRole = await prisma.role.delete({
            where: {id_role: roleId}
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du rôle' });
    }
}