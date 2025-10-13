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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role, OrderStatus, PaymentStatus, FulfillmentStatus } from '@prisma/client';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('authenticated')
  @ApiOperation({ summary: 'Create order (authenticated)' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createAuthenticated(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: any,
  ) {
    // Get customer ID from user
    const customer = await this.ordersService['prisma'].customer.findUnique({
      where: { userId: user.id },
    });
    
    return this.ordersService.create({
      ...createOrderDto,
      customerId: customer?.id,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SALES, Role.FINANCE)
  @ApiBearerAuth()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('customerId') customerId?: string,
    @Query('status') status?: OrderStatus,
    @Query('paymentStatus') paymentStatus?: PaymentStatus,
    @Query('fulfillmentStatus') fulfillmentStatus?: FulfillmentStatus,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.ordersService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      customerId,
      status,
      paymentStatus,
      fulfillmentStatus,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    });
  }

  @Get('my-orders')
  @ApiOperation({ summary: 'Get current user orders' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getMyOrders(
    @CurrentUser() user: any,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const customer = await this.ordersService['prisma'].customer.findUnique({
      where: { userId: user.id },
    });

    if (!customer) {
      return { orders: [], total: 0 };
    }

    return this.ordersService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      customerId: customer.id,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('number/:orderNumber')
  @ApiOperation({ summary: 'Get order by order number' })
  async findByOrderNumber(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.findByOrderNumber(orderNumber);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SALES)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Post(':id/mark-paid')
  @ApiOperation({ summary: 'Mark order as paid' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FINANCE)
  @ApiBearerAuth()
  async markAsPaid(
    @Param('id') id: string,
    @Body() paymentData: {
      provider: string;
      method: string;
      transactionId: string;
      metadata?: any;
    },
  ) {
    return this.ordersService.markAsPaid(id, paymentData);
  }

  @Post(':id/fulfill')
  @ApiOperation({ summary: 'Fulfill order' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER)
  @ApiBearerAuth()
  async fulfill(
    @Param('id') id: string,
    @Body() fulfillmentData: {
      carrier?: string;
      trackingNo?: string;
      items: Array<{ variantId: string; quantity: number }>;
    },
  ) {
    return this.ordersService.fulfill(id, fulfillmentData);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SALES)
  @ApiBearerAuth()
  async cancel(
    @Param('id') id: string,
    @Body() cancelData: { reason: string },
  ) {
    return this.ordersService.cancel(id, cancelData.reason);
  }
}
