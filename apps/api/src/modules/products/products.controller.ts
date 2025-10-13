import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER)
  @ApiBearerAuth()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
    @Query('featured') featured?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const where: any = { published: true };
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (categoryId) where.categoryId = categoryId;
    if (brandId) where.brandId = brandId;
    if (featured === 'true') where.featured = true;

    let orderByClause: any = { createdAt: 'desc' };
    
    switch (orderBy) {
      case 'name_asc':
        orderByClause = { name: 'asc' };
        break;
      case 'name_desc':
        orderByClause = { name: 'desc' };
        break;
      case 'created_asc':
        orderByClause = { createdAt: 'asc' };
        break;
    }

    return this.productsService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where,
      orderBy: orderByClause,
    });
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  getFeatured(@Query('limit') limit?: string) {
    return this.productsService.getFeaturedProducts(
      limit ? parseInt(limit) : undefined
    );
  }

  @Get('category/:slug')
  @ApiOperation({ summary: 'Get products by category' })
  getByCategory(
    @Param('slug') slug: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string,
    @Query('brandIds') brandIds?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const filters: any = {};
    
    if (brandIds) {
      filters.brandIds = brandIds.split(',');
    }
    
    if (minPrice || maxPrice) {
      filters.priceRange = {
        min: minPrice ? parseFloat(minPrice) : 0,
        max: maxPrice ? parseFloat(maxPrice) : 999999,
      };
    }

    return this.productsService.getProductsByCategory(slug, {
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      orderBy,
      filters,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/variants')
  @ApiOperation({ summary: 'Add variant to product' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER)
  @ApiBearerAuth()
  addVariant(
    @Param('id') id: string,
    @Body() createVariantDto: CreateVariantDto,
  ) {
    return this.productsService.addVariant(id, createVariantDto);
  }
}
