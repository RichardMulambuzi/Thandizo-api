import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Twilio } from 'twilio';
import { Alert } from './alets.model';
import { CreateAlertDto } from './dto/alets.dto';
import { config } from 'dotenv';
config();
@Injectable()
export class AlertService {
  private readonly accountSid = process.env.Account_SID; // Your Twilio Account SID
  private readonly authToken = process.env.Twilio_Auth_Token; // Your Twilio Auth Token
  private readonly fromNumber = process.env.Twilio_Phone_Number; // Your Twilio phone number
  private readonly client = new Twilio(this.accountSid, this.authToken);

  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  async create(createAlertDto: CreateAlertDto): Promise<Alert> {
    const alert = this.alertRepository.create(createAlertDto);
    const savedAlert = await this.alertRepository.save(alert);
    if (!savedAlert) {
      throw new InternalServerErrorException('Failed to create the alert');
    }

    const message = await this.sendMessage(savedAlert, createAlertDto);
    return { ...savedAlert, messageSid: message.sid };
  }

  private async sendMessage(
    alert: Alert,
    createAlertDto: CreateAlertDto,
  ): Promise<any> {
    const messageBody = this.createMessageBody(createAlertDto);
    try {
      return await this.client.messages.create({
        body: messageBody,
        from: this.fromNumber,
        to: alert.source,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send SMS');
    }
  }

  private createMessageBody(createAlertDto: CreateAlertDto): string {
    return `
     ** Alert ***
      ${createAlertDto.alertTitle}
      ----
     ${createAlertDto.alertMessage}
      -----
      Type: ${createAlertDto.alertType}
      ----
      District: ${createAlertDto.district}
      ----
      Area: ${createAlertDto.area}
      -----
      Severity Level: ${createAlertDto.severityLevel}
      ******
    `;
  }

  async findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  async findOne(id: number): Promise<Alert> {
    return this.alertRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAlertDto: CreateAlertDto): Promise<Alert> {
    await this.alertRepository.update(id, updateAlertDto);
    return this.alertRepository.findOne({ where: { id } });
  }
  async deletAaletById(id: number) {
    const alet = await this.findOne(id);

    if (!alet) {
      throw new NotFoundException();
    }

    return await this.alertRepository.remove(alet);
  }
}
