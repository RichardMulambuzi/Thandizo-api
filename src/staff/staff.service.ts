import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { ThandizoUser } from '../shared/User.staff.entity';
import * as bcryptjs from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { LoginDTO } from './DTOs/LoginDtos';
import { CreateUserDto } from './DTOs/CreateUserDtos';
import { UpdateUserDto } from './DTOs/UpdateUserDtos';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(ThandizoUser)
    private readonly staffRepository: Repository<ThandizoUser>,
  ) { }

  async loginStaff(user: LoginDTO, res: Response) {
    const { username, password } = user;

    if (!username?.trim() || !password?.trim()) {
      return res
        .status(400)
        .send({ message: 'Not all required fields have been filled in.' });
    }

    try {
      const staffMember = await this.staffRepository.findOne({
        where: { username },
      });

      if (
        !staffMember ||
        !(await bcryptjs.compare(password, staffMember.password))
      ) {
        return res.status(401).send({ message: 'Invalid credentials.' });
      }

      const accessToken = sign(
        { id: staffMember.id, role: staffMember.roles },
        'access_secret',
        { expiresIn: '1h' },
      );
      const refreshToken = sign(
        { id: staffMember.id, role: staffMember.roles },
        'refresh_secret',
        { expiresIn: '7d' },
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).send({ user: staffMember });
    } catch (error) {
      console.error('Error during login:', error);
      return res
        .status(500)
        .send({ message: 'Login failed. Please try again.' });
    }
  }

  async authStaff(req: Request, res: Response) {
    try {
      const accessToken = req.cookies['accessToken'];
      const payload: any = verify(accessToken, 'access_secret');

      if (!payload) {
        return res.status(401).send({ message: 'Unauthenticated.' });
      }

      const user = await this.staffRepository.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        return res.status(401).send({ message: 'Unauthenticated.' });
      }

      return res.status(200).send(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }

  async refreshStaff(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const payload: any = verify(refreshToken, 'refresh_secret');

      if (!payload) {
        return res.status(401).send({ message: 'Unauthenticated.' });
      }

      const accessToken = sign({ id: payload.id }, 'access_secret', {
        expiresIn: '1h',
      });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).send({ message: 'Refresh success' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Admin not logged in.' });
    }
  }

  async logoutStaff(res: Response) {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(200).send({ message: 'Logged out' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Error while logging out.' });
    }
  }

  async registerStaff(user: CreateUserDto, res: Response) {
    const { fullName, username, phoneNumber, district, area, password, roles } =
      user;

    if (
      !fullName?.trim() ||
      !username?.trim() ||
      !phoneNumber?.trim() ||
      !district?.trim() ||
      !area?.trim() ||
      !password?.trim()
    ) {
      throw new BadRequestException(
        'Not all required fields have been filled in.',
      );
    }

    try {
      const existingUser = await this.staffRepository.findOne({
        where: { username },
      });
      if (existingUser) {
        throw new BadRequestException(
          'User with this username already exists.',
        );
      }

      const hashedPassword = await bcryptjs.hash(password, 12);

      await this.staffRepository.save({
        fullName,
        username,
        phoneNumber,
        district,
        area,
        password: hashedPassword,
        roles,
      });

      const accessToken = sign({ username, roles }, 'access_secret', {
        expiresIn: '1h',
      });

      if (roles.includes('admin')) {
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
      }

      res
        .status(201)
        .json({ message: 'Staff registered successfully', username });
    } catch (error) {
      console.error(error);

      if (error instanceof QueryFailedError) {
        console.error(`Query failed error: ${error.message}`);
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAllStaff() {
    return await this.staffRepository.find();
  }

  async findStaffById(id: number) {
    return await this.staffRepository.findOne({ where: { id } });
  }

  async countStaff(): Promise<number> {
    return await this.staffRepository.count();
  }

  async updateStaffById(staffId: number, user: UpdateUserDto) {
    const staff = await this.findStaffById(staffId);

    if (!staff) {
      throw new NotFoundException();
    }

    Object.assign(staff, user);
    return await this.staffRepository.save(staff);
  }

  async deleteStaffById(staffId: number) {
    const staff = await this.findStaffById(staffId);

    if (!staff) {
      throw new NotFoundException();
    }

    return await this.staffRepository.remove(staff);
  }
}
