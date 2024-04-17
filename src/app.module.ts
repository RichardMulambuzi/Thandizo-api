import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffService } from './staff/staff.service';
import { StaffController } from './staff/staff.controller';
import { ThandizoUser } from './shared/User.staff.entity';
import { RealTimeUpdateService } from './resource/real-time-update.service';
import { ResourceController } from './resource/resource.controller';
import { ResourceService } from './resource/resource.service';
import { PopulationDataController } from './population/population.controler';
import { PopulationData } from './population/population.model';
import { PopulationDataService } from './population/population.service';
import { ResourceInventory } from './resource/model/Inventory.model';
import { Alert } from './alets/alets.model';
import { AlertService } from './alets/alet.service';
import { AlertController } from './alets/alets.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cof8sl779t8c73cen460-a.oregon-postgres.render.com',
      port: 5432,
      username: 'thandizo_db_user',
      password: 'YeD9ChRVvpiL7wigCxEc1SC7fsCrTSXk',
      database: 'thandizo_db',
      entities: [ThandizoUser, ResourceInventory, Alert, PopulationData], // Use the ThandizoUser entity here
      synchronize: true, // Set to false in production
      ssl: true, // Enable SSL/TLS
      extra: {
        ssl: {
          rejectUnauthorized: false, // Set to true if the server's certificate should be verified
        },
      }, // Set to false in production
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT, 10) || 5432,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   url: process.env.DATABASE_URL,
    //   entities: [ThandizoUser],
    //   synchronize: process.env.TYPEORM_SYNC === 'true', // Should be false in production
    // }),
    TypeOrmModule.forFeature([
      ThandizoUser,
      ResourceInventory,
      PopulationData,
      Alert,
    ]),
  ],
  providers: [
    PopulationDataService,
    StaffService,
    AppService,
    RealTimeUpdateService,
    ResourceService,
    AlertService,
  ],
  controllers: [
    PopulationDataController,
    StaffController,
    ResourceController,
    AppController,
    AlertController,
  ],
})
export class AppModule {}
