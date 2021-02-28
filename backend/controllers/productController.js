import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc        Fetch all products
// @route       GET /api/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pagenumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc        Fetch single product
// @route       GET /api/products/:id
// @access      Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('המוצר לא נמצא')
  }
})

// @desc        Delete a product
// @route       DELETE /api/products/:id
// @access      Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json('המוצר הוסר')
  } else {
    res.status(404)
    throw new Error('המוצר לא נמצא')
  }
})

// @desc        Create a product
// @route       POST /api/products
// @access      Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'מוצר בעריכה',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'N/A',
    category: 'בעריכה',
    countInStock: 0,
    numReviews: 0,
    description: 'בעריכה',
  })

  const createdProduct = await product.save()

  res.status(201).json(createdProduct)
})

// @desc        Update a product
// @route       PUT /api/products/:id
// @access      Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    published,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.published = published

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('המוצר לא נמצא')
  }
})

// @desc        Create new review
// @route       POST /api/products/:id/reviews
// @access      Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('לא ניתן להוסיף יותר מביקורת אחת')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json({ message: 'הביקורת נוספה בהצלחה' })
  } else {
    res.status(404)
    throw new Error('המוצר לא נמצא')
  }
})

// @desc        Get top rated products
// @route       GET /api/products/top
// @access      Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
}
