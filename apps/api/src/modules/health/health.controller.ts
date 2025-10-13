import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  async healthCheck() {
    const checks = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: 'unknown',
        redis: 'unknown',
      },
    };

    // Check database connection
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      checks.services.database = 'healthy';
    } catch (error) {
      checks.services.database = 'unhealthy';
      checks.status = 'error';
    }

    // Check Redis connection
    try {
      await this.cacheService.set('health:check', 'ok', 10);
      const result = await this.cacheService.get('health:check');
      checks.services.redis = result === 'ok' ? 'healthy' : 'unhealthy';
    } catch (error) {
      checks.services.redis = 'unhealthy';
      checks.status = 'error';
    }

    return checks;
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness check' })
  async readinessCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ready' };
    } catch (error) {
      return { status: 'not ready', error: error.message };
    }
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness check' })
  async livenessCheck() {
    return { status: 'alive', timestamp: new Date().toISOString() };
  }
}
