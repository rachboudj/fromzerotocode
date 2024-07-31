import { prisma } from '../utils/db.js';
import { generateAccessToken } from './registerLoginController.js';

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany(
            {
                include: {
                    roles: {
                        include: {
                            role: true
                        }
                    }
                }
            }
        );
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: `Une erreur s\'est produite lors de la récupération des utilisateurs` + error.message });
    }
}

export const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await prisma.user.findUnique({
            where: { id_user: userId },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const editUser = async (req, res) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
        where: { id_user: parseInt(userId) },
        include: { roles: { include: { role: true } } }
    });

    res.render('editUser', { user });
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    const updatedUserData = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id_user: parseInt(userId) },
            data: updatedUserData,
        });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification de l\'utilisateur' });
    }
}

export const getUserRole = async (req, res) => {
    try {
        const userId = req.user.userId;
        const userRoles = await prisma.userRole.findMany({
            where: {
                id_user: parseInt(userId)
            },
            include: {
                role: true
            }
        });

        const hasHaTalmidRole = userRoles.some(userRole => userRole.role.name === "HaTalmid");

        const hasOnlyInscritRole = userRoles.every(userRole => userRole.role.name === "Inscrit") && userRoles.length === 1;

        if (hasHaTalmidRole) {
            res.json({ message: "Accès autorisé" });
        } else {
            res.status(403).json({ message: "Accès refusé" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite" });
    }
}

export const addRoleToUser = async (req, res) => {
    const { userId, roleId } = req.params;

    try {
        await prisma.userRole.create({
            data: {
                user: { connect: { id_user: parseInt(userId) } },
                role: { connect: { id_role: parseInt(roleId) } }
            }
        });

        const updatedUser = await prisma.user.findUnique({
            where: { id_user: parseInt(userId) },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });


        const accessToken = await generateAccessToken(updatedUser);

        res.json({
            message: 'Rôle ajouté avec succès à l\'utilisateur',
            accessToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const deleteRoleFromUser = async (req, res) => {
    const userId = req.params.userId;
    const roleId = req.params.roleId;
    try {
        const user = await prisma.user.findUnique({
            where: { id_user: parseInt(userId) },
            include: { roles: { include: { role: true } } }
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const roleIndex = user.roles.findIndex((role) => role.id_role == roleId);

        if (roleIndex === -1) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }
        user.roles.splice(roleIndex, 1);

        await prisma.userRole.deleteMany({
            where: {
                AND: [
                    { id_user: parseInt(userId) },
                    { id_role: parseInt(roleId) }
                ]
            }
        });

        const updatedUser = await prisma.user.findUnique({
            where: { id_user: parseInt(userId) },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        const accessToken = await generateAccessToken(updatedUser);

        res.json({
            message: 'Rôle supprimé avec succès',
            accessToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    console.log(userId);

    try {
        await prisma.userCourse.deleteMany({
            where: { id_user: userId }
        });

        await prisma.userRole.deleteMany({
            where: { id_user: userId }
        });

        await prisma.user.delete({
            where: { id_user: userId }
        });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}