import { User } from '../models/userSchema.js'
import { logger } from '../../logger.js'
import { generateToken } from '../utils/generateToken.js'
import { sendOrderConfirmation } from '../../mailgun.js'
import bcrypt from 'bcrypt'


export const registerUser = async (req, res) => {
    try {
        const {email, username, password} = req.body

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

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
`

            await sendOrderConfirmation({ email: newUser.email, details: registrationDetails })
        

        logger.info(`${newUser.username} registered as new user successfully`)
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

        logger.info(`${username} logged in successfully`, user.username)

        res.status(200).json({token, username:user.username})
    } catch (error) {
        logger.error('Error in loginUser controller', error.message)
        next(error)
    }
}

export const logoutUser = async (req, res) => {
    try {
        logger.info('User logged out successfully')
        res.cookie('token', '', { maxAge:0 })
        res.status(200).json({ message: 'Logged out' })
    } catch (error) {
        logger.error('Error in logoutUser controller', error.message)
        next(error)
    }
}