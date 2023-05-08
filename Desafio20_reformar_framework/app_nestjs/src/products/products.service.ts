import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { UpdateProductDto } from 'src/dto/updateProduct.dto';
import ProductInterface from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly products: ProductInterface[] = [];
  private cont = 1;

  private getIndex(id: number) {
    return this.products.findIndex((product) => product.id == id);
  }

  create(data: CreateProductDto): ProductInterface {
    const product = new ProductInterface();
    product.id = this.cont++;
    product.title = data.title;
    product.price = data.price;
    product.thumbnail = data.thumbnail;
    this.products.push(product);
    return product;
  }

  findAll(): ProductInterface[] {
    return this.products;
  }

  findOne(id: number): ProductInterface {
    const product = this.products.find((product) => product.id == id);
    if (!product)
      throw new HttpException(
        `No existe el producto ${id}`,
        HttpStatus.NOT_FOUND,
      );
    return product;
  }

  remove(id: number): ProductInterface {
    const index = this.getIndex(id);
    if (index === -1)
      throw new HttpException(
        `No existe el producto ${id}`,
        HttpStatus.NOT_FOUND,
      );
    const [removedProduct] = this.products.splice(this.getIndex(id), 1);
    return removedProduct;
  }

  update(id: number, data: UpdateProductDto): ProductInterface {
    const index = this.getIndex(id);
    if (index === -1)
      throw new HttpException(
        `No existe el producto ${id}`,
        HttpStatus.NOT_FOUND,
      );
    const updatedProduct = { ...this.products[index], ...data };
    this.products.splice(index, 1, updatedProduct);
    return updatedProduct;
  }
}
