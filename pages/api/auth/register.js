import connectDB from '../../../utils/connectDB'
import Users from '../../../models/user.model'
import validateRegister from '../../../utils/validateRegister'
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await register(req, res)
      break
  }
}

const register = async (req, res) => {
  try {
    const { email, password } = req.body

    const errMsg = validateRegister(req.body)

    if (errMsg) return res.status(400).json({ err: errMsg })

    const user = await Users.findOne({ email })
    if (user) return res.status(400).json({ err: 'Email already exists.' })

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new Users({ ...req.body, password: passwordHash })

    await newUser.save()

    res.json({ msg: 'Register success.' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
