import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  /**
   * Retrieves a value from the cache based on the given key.
   * @param key The key used to retrieve the value from the cache.
   * @returns A Promise that resolves to the retrieved value if it exists, or `undefined` otherwise.
   */
  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  /**
   * Sets a value in the cache with the specified key and payload.
   * @param key The key used to store the value in the cache.
   * @param payload The value to be stored in the cache.
   * @param ttl The time-to-live (TTL) for the cached value in seconds. Default is 3600 (1 hour).
   * @returns A Promise that resolves once the value is successfully set in the cache.
   */

  async set<T>(key: string, payload: T, ttl = 3600): Promise<void> {
    await this.cacheManager.set(key, payload, ttl);
  }

  /**
   * Removes a value from the cache based on the given key.
   * @param key The key used to remove the value from the cache.
   * @returns A Promise that resolves once the value is successfully removed from the cache.
   */
  async remove(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
