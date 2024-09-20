import { User } from "../models/userSchema.js";
import { logger } from "../../logger.js";

export const getAllUsers = async () => {
    try {
        const allUsers = await User.find()
        return allUsers
    } catch (error) {
        logger.error('Error fetching all users', error.message)
        throw new Error('Error fetching users')
    }
}

export const getUserById = async (id) => {
    try {
        const singleUser = await User.findById(id)
        if (!singleUser) {
            logger.error('User not found')
            throw new Error('User not found')
        }
        return singleUser;
    } catch (error) {
        logger.error('Error fetching user by ID', error.message)
        throw new Error('Error fetching user by ID')
    }
}

export const getUnreadNotificationsCountByUserId = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user.unreadNotifications.length;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        logger.error('Error fetching user by username', error.message);
        throw new Error('Error fetching user by username');
    }
};
