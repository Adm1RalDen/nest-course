import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll() {
    return this.productModel.find().exec();
  }

  async getOne(id: string) {
    return this.productModel.findById(id);
  }

  async create(productDto: CreateProductDto) {
    const newProduct = await new this.productModel(productDto);
    return newProduct.save();
  }

  async delete(id: string) {
    const deleted = await this.productModel.findByIdAndDelete(id);
    if (deleted) {
      return { error: null, status: 'success' };
    }
    throw new NotFoundException();
  }

  async update(productDto: UpdateProductDto, id: string) {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
