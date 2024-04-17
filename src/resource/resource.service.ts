import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResourceDto } from './update.resource.dto';
import { RealTimeUpdateService } from './real-time-update.service';
import { CreateResourceDto } from './create.resource.dto';
import { ResourceInventory } from './model/Inventory.model';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceInventory)
    private readonly resourceRepository: Repository<ResourceInventory>,
    private readonly realTimeUpdateService: RealTimeUpdateService,
  ) {}

  async findAll() {
    return this.resourceRepository.find();
  }

  async findOne(id: number) {
    return this.resourceRepository.findOne({ where: { id } });
  }

  async create(resourceData: CreateResourceDto) {
    const resource = this.resourceRepository.create(resourceData);
    return this.resourceRepository.save(resource);
  }

  async update(id: number, resourceData: UpdateResourceDto) {
    const existingResource = await this.resourceRepository.findOneOrFail({
      where: { id },
    });
    this.resourceRepository.merge(existingResource, resourceData);
    const updatedResource =
      await this.resourceRepository.save(existingResource);
    await this.realTimeUpdateService.processRealTimeUpdates(updatedResource);
    return updatedResource;
  }

  async remove(id: number, quantityToRemove: number) {
    const resource = await this.resourceRepository.findOneOrFail({
      where: { id },
    });
    const updatedQuantity = resource.quantity - quantityToRemove;

    if (updatedQuantity < 0) {
      throw new BadRequestException(
        'Quantity to remove exceeds available quantity',
      );
    }

    resource.quantity = updatedQuantity;
    resource.received += quantityToRemove;

    const updatedResource = await this.resourceRepository.save(resource);
    await this.realTimeUpdateService.processRealTimeUpdates(updatedResource);
    return updatedResource;
  }
}
