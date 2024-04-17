import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceInventory } from './model/Inventory.model';

@Injectable()
export class RealTimeUpdateService {
  private readonly logger = new Logger(RealTimeUpdateService.name);

  constructor(
    @InjectRepository(ResourceInventory)
    private readonly resourceRepository: Repository<ResourceInventory>,
  ) {}

  async processRealTimeUpdates(resource: ResourceInventory): Promise<void> {
    try {
      await this.updateResourceInDatabase(resource);
      if (this.isResourceRunningLow(resource)) {
        await this.triggerNotifications(resource);
      }
      await this.updateRealTimeDashboard();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async updateResourceInDatabase(
    resource: ResourceInventory,
  ): Promise<void> {
    const updatedResource = await this.resourceRepository.save(resource);
    this.logger.log(
      `Resource updated in database: ${updatedResource.resourceName}`,
    );
  }

  private async triggerNotifications(
    resource: ResourceInventory,
  ): Promise<void> {
    const timestamp = new Date();
    console.log(`Low inventory for ${resource.resourceName} at ${timestamp}`);
    resource.lastUpdated = timestamp;
    await this.resourceRepository.save(resource);
    console.log(
      `Logged notification for ${resource.resourceName} at ${timestamp}`,
    );
  }

  private async updateRealTimeDashboard(): Promise<void> {
    const resources = await this.resourceRepository.find();
    for (const resource of resources) {
      console.log(`Updated dashboard entry for ${resource.resourceName}`);
    }
  }

  private isResourceRunningLow(resource: ResourceInventory): boolean {
    return resource.quantity < resource.needed;
  }

  private handleError(error: Error): void {
    this.logger.error(`Error processing real-time updates: ${error.message}`);
  }
}
