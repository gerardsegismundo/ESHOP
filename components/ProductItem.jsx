const ProductItem = ({ product }) => {
  const { title, description, price, inStock } = product
  const imgUrl = product.images[0].url

  return (
    <div className='card' style={{ width: '18rem' }}>
      <img className='card-img-top' src={imgUrl} alt={product.title} />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <div>
          <h6>${price}</h6>

          {inStock > 0 ? <h6 className='text-dangert'></h6> : <h6 className='text-dangert'></h6>}
        </div>
        <p className='card-text'>{description}</p>
        <a href='#' className='btn btn-primary'>
          Go somewhere
        </a>
      </div>
    </div>
  )
}

export default ProductItem
