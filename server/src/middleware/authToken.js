import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js'; 

const configPath = path.resolve('config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401); 
  jwt.verify(token, config.secret_key, async (err, decoded) => {
    if (err) return res.sendStatus(403); 

   
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.sendStatus(404);

    req.user = user;
    next();
  });
};

