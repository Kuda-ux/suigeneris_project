import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  @ApiOperation({ summary: 'Get cart by ID' })
  async getCart(
    @Param('cartId') cartId: string,
    @Query('customerId') customerId?: string,
  ) {
    return this.cartService.getCart(cartId, customerId);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Post('add/authenticated')
  @ApiOperation({ summary: 'Add item to cart (authenticated)' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addToCartAuthenticated(
    @Body() addToCartDto: AddToCartDto,
    @CurrentUser() user: any,
  ) {
    // Get customer ID from user
    const customer = await this.cartService['prisma'].customer.findUnique({
      where: { userId: user.id },
    });
    
    return this.cartService.addToCart(addToCartDto, customer?.id);
  }

  @Patch(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Update cart item quantity' })
  async updateCartItem(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() updateDto: UpdateCartItemDto,
    @Query('customerId') customerId?: string,
  ) {
    return this.cartService.updateCartItem(cartId, itemId, updateDto, customerId);
  }

  @Delete(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeFromCart(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Query('customerId') customerId?: string,
  ) {
    return this.cartService.removeFromCart(cartId, itemId, customerId);
  }

  @Delete(':cartId')
  @ApiOperation({ summary: 'Clear cart' })
  async clearCart(
    @Param('cartId') cartId: string,
    @Query('customerId') customerId?: string,
  ) {
    return this.cartService.clearCart(cartId, customerId);
  }
}
