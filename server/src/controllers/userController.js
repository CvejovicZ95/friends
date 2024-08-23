import { User } from '../models/userSchema.js'
import { Post } from "../models/postsSchema.js"
import { logger } from '../../logger.js'
import { generateToken } from '../utils/generateToken.js'
import { sendOrderConfirmation } from '../../mailgun.js'
import { getAllUsers, getUserById } from '../service/usersService.js'
import bcrypt from 'bcrypt'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../server/images'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage }).single('profilePhoto');

export const registerUser = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                logger.error('Error uploading photo');
                return res.status(400).json({ message: 'Error uploading photo' });
            } else if (err) {
                logger.error('Server error uploading photo');
                return res.status(500).json({ message: 'Server error uploading photo' });
            }

            try {
                const { email, username, password } = req.body;

                const profilePhotoImagePath = req.file.filename;

                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: 'Email is already taken' });
                }

                const existingUsername = await User.findOne({ username });
                if (existingUsername) {
                    return res.status(400).json({ error: 'Username is already taken' });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword,
                    profilePhotoImagePath
                });

                await newUser.save();

                const registrationDetails = `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #2e6da4; border-bottom: 2px solid #2e6da4; padding-bottom: 10px;">Hvala na registraciji!</h2>
                        <p>Poštovani <strong>${username}</strong>,</p>
                        <p>Vaša registracija na našoj platformi je uspešno završena. Radujemo se što ste se pridružili našem timu!</p>
                        <h3 style="color: #2e6da4; margin-top: 20px;">Vaši detalji:</h3>
                        <p><strong>E-mail:</strong> ${email}</p>
                        <p><strong>Korisničko ime:</strong> ${username}</p>
                        <h3 style="color: #2e6da4; margin-top: 20px;">Šta dalje?</h3>
                        <p>Sada možete da se prijavite koristeći svoje korisničko ime i lozinku.</p>
                        <p>Ako imate bilo kakvih pitanja, slobodno nas kontaktirajte.</p>
                        <h3 style="color: #2e6da4; text-align: center;">Friends Applicaton Team</h3>
                    </div>
                `;

                await sendOrderConfirmation({ email: newUser.email, details: registrationDetails });

                logger.info(`${newUser.username} registered as new user successfully`);
                res.status(201).json(newUser);
            } catch (error) {
                logger.error('Error during user registration process', error.message);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    } catch (error) {
        logger.error('Error in registerUser controller', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            logger.error('User not found');
            return res.status(400).json({ error: 'Incorrect username or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            logger.error('Incorrect password');
            return res.status(400).json({ error: 'Incorrect username or password' });
        }

        const token = generateToken(user._id, res);

        logger.info(`${username} logged in successfully`);
        res.status(200).json({ token, username: user.username, profilePhotoImagePath: user.profilePhotoImagePath });
        
    } catch (error) {
        logger.error('Error in loginUser controller', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        logger.info('User logged out successfully');
        res.cookie('token', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        logger.error('Error in logoutUser controller', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const getAllUsersController = async (req, res) => {
    try {
        const allUsers = await getAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const getUserByIdController = async (req, res) => {
    try {
        const singleUserId = req.params.id
        const singleUser = await getUserById(singleUserId)
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const getUserProfileWithPosts = async (req, res) => {
    try {
        const username = req.params.username;

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await Post.find({ user: user._id }).populate('user', 'username profilePhotoImagePath');

        const userProfile = {
            ...user.toObject(),
            posts
        };

        res.status(200).json(userProfile);
    } catch (error) {
        logger.error('Error fetching user profile with posts:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
