import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { StockMovementService } from './stock-movement.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly stockMovementService: StockMovementService,
  ) {}

  @Get('levels')
  @ApiOperation({ summary: 'Get inventory levels' })
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER, Role.SALES)
  async getInventoryLevels(
    @Query('variantId') variantId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('lowStockOnly') lowStockOnly?: boolean,
  ) {
    return this.inventoryService.getInventoryLevels({
      variantId,
      warehouseId,
      lowStockOnly,
    });
  }

  @Get('available/:variantId')
  @ApiOperation({ summary: 'Get available stock for a variant' })
  async getAvailableStock(
    @Param('variantId') variantId: string,
    @Query('warehouseId') warehouseId?: string,
  ) {
    return this.inventoryService.getAvailableStock(variantId, warehouseId);
  }

  @Post('stock-movements')
  @ApiOperation({ summary: 'Create a stock movement' })
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER)
  @HttpCode(HttpStatus.CREATED)
  async createStockMovement(
    @Body() dto: CreateStockMovementDto,
    @CurrentUser() user: any,
  ) {
    return this.stockMovementService.createMovement(dto, user.id);
  }

  @Post('reserve')
  @ApiOperation({ summary: 'Reserve stock for cart' })
  @HttpCode(HttpStatus.OK)
  async reserveStock(
    @Body() body: {
      variantId: string;
      warehouseId: string;
      quantity: number;
      referenceId?: string;
    },
  ) {
    return this.stockMovementService.reserveStock(
      body.variantId,
      body.warehouseId,
      body.quantity,
      body.referenceId,
    );
  }

  @Post('unreserve')
  @ApiOperation({ summary: 'Unreserve stock' })
  @HttpCode(HttpStatus.OK)
  async unreserveStock(
    @Body() body: {
      variantId: string;
      warehouseId: string;
      quantity: number;
      referenceId?: string;
    },
  ) {
    return this.stockMovementService.unreserveStock(
      body.variantId,
      body.warehouseId,
      body.quantity,
      body.referenceId,
    );
  }

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer stock between warehouses' })
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER)
  @HttpCode(HttpStatus.OK)
  async transferStock(
    @Body() body: {
      fromWarehouseId: string;
      toWarehouseId: string;
      variantId: string;
      quantity: number;
    },
    @CurrentUser() user: any,
  ) {
    return this.stockMovementService.transferStock(
      body.fromWarehouseId,
      body.toWarehouseId,
      body.variantId,
      body.quantity,
      user.id,
    );
  }

  @Get('stock-movements')
  @ApiOperation({ summary: 'Get stock movements' })
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER, Role.FINANCE)
  async getStockMovements(
    @Query('variantId') variantId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('type') type?: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.stockMovementService.getStockMovements({
      variantId,
      warehouseId,
      type,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  @Get('valuation')
  @ApiOperation({ summary: 'Get stock valuation' })
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER, Role.FINANCE)
  async getStockValuation(@Query('warehouseId') warehouseId?: string) {
    return this.inventoryService.getStockValuation(warehouseId);
  }

  @Get('out-of-stock')
  @ApiOperation({ summary: 'Get out of stock items' })
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER, Role.SALES)
  async getOutOfStockItems() {
    return this.inventoryService.getOutOfStockItems();
  }

  @Get('turnover')
  @ApiOperation({ summary: 'Get inventory turnover report' })
  @Roles(Role.ADMIN, Role.INVENTORY_MANAGER, Role.FINANCE)
  async getInventoryTurnover(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('warehouseId') warehouseId?: string,
  ) {
    return this.inventoryService.getInventoryTurnover(
      new Date(startDate),
      new Date(endDate),
      warehouseId,
    );
  }
}
