import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

const configPath = path.resolve('config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.secret_key, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
