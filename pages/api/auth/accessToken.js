import connectDB from '../../../utils/connectDB'
import Users from '../../../models/user.model'
import { createAccessToken } from '../../../utils/generateToken'
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
  try {
    const { refresh_token } = req.cookies
    if (!refresh_token) return res.status(400).json({ err: 'Access denied.' })

    const result = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
    if (!result) return res.status(400).json({ err: 'Access denied.' })

    const user = await Users.findById(result.id)
    if (!user) return res.status(400).json({ err: 'User does not exist.' })

    const access_token = createAccessToken({ id: user._id })

    res.json({
      access_token,
      user: {
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
        root: user.root
      }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ err: err.message })
  }
}
