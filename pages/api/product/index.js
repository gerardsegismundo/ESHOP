import connectDB from '../../../utils/connectDB'
import Products from '../../../models/product.model'

connectDB()

const getProducts = async (req, res) => {
  if (req.method !== 'GET') return

  try {
    const products = await Products.find()
    res.json({
      status: 'success',
      result: products.length,
      products
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

export default getProducts
