import { User } from '../models/userSchema.js'
import { logger } from '../../logger.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const {email, username, password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password:hashedPassword
        })

        if (newUser) {
            await newUser.save()
        }

        logger.info('New user register successfully')
        res.status(201).json(newUser)
    } catch (error) {
        logger.error('Error in registerUser controller', error.message)
        res.status(500).json('Server error')
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password} = req.body
        const user = await User.findOne({ username })

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

        if (!user || !isPasswordCorrect) {
            logger.error('Invalid username or password')
            return res.status(400).json({ error:'Incorrect username or password'})
        }

        const token = generateToken(user._id, res)

        logger.info('User logged in successfully', user.username)

        res.status(200).json({token, username:user.username})
    } catch (error) {
        logger.error('Error in loginUser controller', error.message)
        res.status(500).json('Server error')
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge:0 })
        logger.info('User loged out successfully')
        res.status(200).json({ message: 'Logged out' })
    } catch (error) {
        logger.error('Error in logoutUser controller', error.message)
        res.status(500).json('Server error')
    }
}