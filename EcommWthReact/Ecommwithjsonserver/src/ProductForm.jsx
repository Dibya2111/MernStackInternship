import { useState } from 'react'

function ProductForm({ onAddProduct }) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [rating, setRating] = useState('')
  const [reviewCount, setReviewCount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      imageUrl,
      rating: parseFloat(rating),
      reviewCount: parseInt(reviewCount),
    }
    onAddProduct(newProduct)
    // Reset form fields
    setTitle('')
    setPrice('')
    setDescription('')
    setImageUrl('')
    setRating('')
    setReviewCount('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Title:</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <p>Price:</p>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <p>Description:</p>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <p>Image URL:</p>
      <input
        type="url"
        value={imageUrl}
        name='imageUrl'
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <p>Rating:</p>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <p>Review Count:</p>
      <input
        type="number"
        value={reviewCount}
        onChange={(e) => setReviewCount(e.target.value)}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  )
}

export default ProductForm
