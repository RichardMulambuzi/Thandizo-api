import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { Request, Response } from 'express';
import { RolesGuard } from 'src/roles.guard';
import { CreateUserDto } from './DTOs/CreateUserDtos';
import { UpdateUserDto } from './DTOs/UpdateUserDtos';
import { LoginDTO } from './DTOs/LoginDtos';
@Controller('Staff')
@ApiTags('Staff')
@UseGuards(RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('/register-staff')
  @ApiOperation({ summary: 'Register new Staff' })
  @ApiResponse({ status: 200, description: 'Staff registered successfully' })
  // @UseGuards(AuthMiddleware) // Ensure user is logged in before role check
  // @Roles(LPHStaffRole.ADMIN) // Only admin can register staff
  async registerStaff(
    @Body() createStaffDTO: CreateUserDto,
    @Res() res: Response,
  ) {
    return this.staffService.registerStaff(createStaffDTO, res);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Staff Login' })
  @ApiResponse({ status: 200, description: 'Staff logged in successfully' })
  async loginStaff(@Body() user: LoginDTO, @Res() res: Response) {
    return this.staffService.loginStaff(user, res);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh Staff logged in status' })
  @ApiResponse({
    status: 200,
    description: 'Staff login status refreshed successfully',
  })
  // @UseGuards( AuthMiddleware ) // Optional: Ensure user is logged in before role check
  // @Roles( LPHStaffRole.ADMIN, LPHStaffRole.MANAGER, LPHStaffRole.DOCTOR ) // Any logged-in user can refresh
  async refreshStaff(@Req() req: Request, @Res() res: Response) {
    return this.staffService.refreshStaff(req, res);
  }
  @Get('/logout')
  @ApiOperation({ summary: 'Staff Logout' })
  @ApiResponse({ status: 200, description: 'Staff logout successfully' })
  async logoutStaff(@Res() res: Response) {
    return this.staffService.logoutStaff(res);
  }

  @Get('/view-all-staff')
  @ApiOperation({ summary: 'Get all registered staff' })
  @ApiResponse({ status: 200, description: 'Return all staff' })
  // @Roles( LPHStaffRole.ADMIN ) // Only admin can get all staff
  async findAllStaff() {
    return this.staffService.findAllStaff();
  }
  @Get('/view-staff/:id')
  @ApiOperation({ summary: 'Get registered staff by id' })
  @ApiResponse({ status: 200, description: 'Return staff' })
  // @Roles( LPHStaffRole.ADMIN ) // Only admin can get a specific staff by id
  async findStaffById(@Param('id') id: number) {
    return this.staffService.findStaffById(id);
  }
  @Get('/count-all-staff')
  @ApiOperation({ summary: 'Get total number of LPH staff' })
  @ApiResponse({
    status: 200,
    description: 'Total number of staff generated successfully',
  })
  // @Roles( LPHStaffRole.ADMIN ) // Only admin can delete staff
  async countAllStaff() {
    return this.staffService.countStaff();
  }
  @Put('/update-staff/:id')
  @ApiOperation({ summary: 'Update staff' })
  @ApiResponse({ status: 200, description: 'Staff updated successfully' })
  // @Roles( LPHStaffRole.ADMIN ) // Only admin can update staff
  async updateStaffById(
    @Param('id') id: number,
    @Body() updateStaffDTO: UpdateUserDto,
  ) {
    return this.staffService.updateStaffById(+id, updateStaffDTO);
  }

  @Delete('/delete-staff/:id')
  @ApiOperation({ summary: 'Delete remove Staff' })
  @ApiResponse({ status: 200, description: 'Staff deleted successfully' })
  // @Roles( LPHStaffRole.ADMIN ) // Only admin can delete staff
  async deleteStaffById(@Param('id') id: number) {
    return this.staffService.deleteStaffById(id);
  }
}
