import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await this.redis.setex(key, ttl, serialized);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  async increment(key: string, value = 1): Promise<number> {
    return this.redis.incrby(key, value);
  }

  async expire(key: string, ttl: number): Promise<void> {
    await this.redis.expire(key, ttl);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  async flushPattern(pattern: string): Promise<void> {
    const keys = await this.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Cart-specific methods
  async reserveStock(variantId: string, warehouseId: string, quantity: number, cartId: string, ttl = 1200): Promise<void> {
    const key = `stock:reserved:${variantId}:${warehouseId}:${cartId}`;
    await this.set(key, { quantity, reservedAt: new Date() }, ttl);
  }

  async unreserveStock(variantId: string, warehouseId: string, cartId: string): Promise<void> {
    const key = `stock:reserved:${variantId}:${warehouseId}:${cartId}`;
    await this.del(key);
  }

  async getReservedStock(variantId: string, warehouseId: string): Promise<number> {
    const pattern = `stock:reserved:${variantId}:${warehouseId}:*`;
    const keys = await this.keys(pattern);
    
    let totalReserved = 0;
    for (const key of keys) {
      const reservation = await this.get<{ quantity: number }>(key);
      if (reservation) {
        totalReserved += reservation.quantity;
      }
    }
    
    return totalReserved;
  }

  // Session management
  async setSession(sessionId: string, data: any, ttl = 86400): Promise<void> {
    const key = `session:${sessionId}`;
    await this.set(key, data, ttl);
  }

  async getSession<T>(sessionId: string): Promise<T | null> {
    const key = `session:${sessionId}`;
    return this.get<T>(key);
  }

  async deleteSession(sessionId: string): Promise<void> {
    const key = `session:${sessionId}`;
    await this.del(key);
  }

  // Rate limiting
  async checkRateLimit(identifier: string, limit: number, window: number): Promise<{ allowed: boolean; remaining: number }> {
    const key = `rate_limit:${identifier}`;
    const current = await this.increment(key);
    
    if (current === 1) {
      await this.expire(key, window);
    }
    
    const allowed = current <= limit;
    const remaining = Math.max(0, limit - current);
    
    return { allowed, remaining };
  }
}
