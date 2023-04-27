class ProductDto {
  constructor({ id, title, price, image }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
  }
}

export default function formatDTO(products) {
  if (Array.isArray(products)) {
    return products.map(obj => new ProductDto(obj));
  } else {
    return new ProductDto(products);
  }
}