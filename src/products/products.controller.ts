import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { JoiProductSchema } from '../joi-schemas/joi-product.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    // console.log(req.user);
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.getOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(JoiProductSchema))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return this.productService.update(updateProductDto, id);
  }
}
