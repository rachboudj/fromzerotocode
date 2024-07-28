import { prisma, bcrypt, jwt, saltRounds } from '../utils/db.js';

export const register = async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                password: hashedPassword,
            },
        });

        await prisma.userRole.create({
            data: {
                id_user: newUser.id_user,
                id_role: 3,
            },
        });

        res.json({
            Status: "Success",
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription de l'utilisateur." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const accessToken = await generateAccessToken(user);

        res.json({
            Status: "Success",
            user: {
                id: user.id,
                email: user.email,
                password: user.password,
            },
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite" });
    }
};

export const generateAccessToken = async (user) => {

    const userData = await prisma.user.findUnique({
        where: {
            id_user: user.id_user,
        },
        include: {
            roles: {
                include: {
                    role: true,
                },
            },
        },
    });

    const roles = userData.roles.map(userRole => userRole.role.name);

    console.log(roles);

    const accessToken = jwt.sign(
        {
            userId: userData.id_user,
            name: userData.surname,
            roles: roles
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" });

    return accessToken;
};