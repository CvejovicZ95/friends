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