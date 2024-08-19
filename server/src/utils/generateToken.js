import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

const configPath = path.resolve(currentDir, '../../config.json')
const configData = fs.readFileSync(configPath)
const config = JSON.parse(configData)

export const generateToken = (user, res) => {
  const token = jwt.sign({ _id: user._id }, config.secret_key, {
    expiresIn: '30m'
  });

  res.cookie('token', token, {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none'
  });

  return token;
};
