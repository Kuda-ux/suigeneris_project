import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { variants, media, ...productData } = createProductDto;

    // Generate slug from name
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return this.prisma.product.create({
      data: {
        ...productData,
        slug,
        variants: variants ? {
          create: variants.map(variant => ({
            ...variant,
            variantSku: variant.variantSku || this.generateVariantSku(productData.sku, variant.attributes),
          })),
        } : undefined,
        media: media ? {
          create: media.map((m, index) => ({
            ...m,
            position: index,
          })),
        } : undefined,
      },
      include: {
        brand: true,
        category: true,
        variants: true,
        media: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    include?: Prisma.ProductInclude;
  }) {
    const { skip, take, where, orderBy, include } = params;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take,
        where,
        orderBy,
        include: include || {
          brand: true,
          category: true,
          variants: {
            include: {
              inventoryLevels: {
                include: {
                  warehouse: true,
                },
              },
            },
          },
          media: {
            orderBy: { position: 'asc' },
          },
          reviews: {
            where: { status: 'PUBLISHED' },
            select: {
              rating: true,
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    // Calculate aggregated data for each product
    const productsWithAggregates = products.map(product => {
      const reviews = product.reviews || [];
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
        : 0;

      // Calculate total available stock across all variants and warehouses
      const totalStock = product.variants?.reduce((total, variant) => {
        const variantStock = variant.inventoryLevels?.reduce((vTotal, level) => {
          return vTotal + (level.onHand - level.reserved);
        }, 0) || 0;
        return total + variantStock;
      }, 0) || 0;

      // Get price range
      const prices = product.variants?.map(v => Number(v.price)) || [];
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

      return {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length,
        totalStock,
        priceRange: {
          min: minPrice,
          max: maxPrice,
        },
      };
    });

    return { products: productsWithAggregates, total };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: {
          include: {
            parent: true,
          },
        },
        variants: {
          include: {
            inventoryLevels: {
              include: {
                warehouse: true,
              },
            },
          },
        },
        media: {
          orderBy: { position: 'asc' },
        },
        reviews: {
          where: { status: 'PUBLISHED' },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        compatibility: {
          include: {
            compatibleProduct: {
              include: {
                brand: true,
                media: {
                  take: 1,
                  orderBy: { position: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Calculate aggregated data
    const avgRating = product.reviews.length > 0 
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length 
      : 0;

    return {
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: product.reviews.length,
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        variants: {
          include: {
            inventoryLevels: {
              include: {
                warehouse: true,
              },
            },
          },
        },
        media: {
          orderBy: { position: 'asc' },
        },
        reviews: {
          where: { status: 'PUBLISHED' },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { variants, media, ...productData } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        updatedAt: new Date(),
      },
      include: {
        brand: true,
        category: true,
        variants: true,
        media: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async addVariant(productId: string, createVariantDto: CreateVariantDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const variantSku = createVariantDto.variantSku || 
      this.generateVariantSku(product.sku, createVariantDto.attributes);

    return this.prisma.variant.create({
      data: {
        ...createVariantDto,
        productId,
        variantSku,
      },
    });
  }

  async getFeaturedProducts(limit = 8) {
    return this.findAll({
      take: limit,
      where: {
        featured: true,
        published: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProductsByCategory(categorySlug: string, params: {
    skip?: number;
    take?: number;
    orderBy?: string;
    filters?: any;
  }) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        children: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Include child categories
    const categoryIds = [category.id, ...category.children.map(c => c.id)];

    const where: Prisma.ProductWhereInput = {
      categoryId: { in: categoryIds },
      published: true,
    };

    // Apply filters
    if (params.filters) {
      if (params.filters.brandIds?.length) {
        where.brandId = { in: params.filters.brandIds };
      }
      if (params.filters.priceRange) {
        where.variants = {
          some: {
            price: {
              gte: params.filters.priceRange.min,
              lte: params.filters.priceRange.max,
            },
          },
        };
      }
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    
    switch (params.orderBy) {
      case 'price_asc':
        orderBy = { variants: { _min: { price: 'asc' } } };
        break;
      case 'price_desc':
        orderBy = { variants: { _min: { price: 'desc' } } };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
      case 'name_desc':
        orderBy = { name: 'desc' };
        break;
    }

    return this.findAll({
      skip: params.skip,
      take: params.take,
      where,
      orderBy,
    });
  }

  private generateVariantSku(productSku: string, attributes: any): string {
    const attrString = Object.entries(attributes)
      .map(([key, value]) => `${key}${value}`)
      .join('-')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase();
    
    return `${productSku}-${attrString}`;
  }
}
