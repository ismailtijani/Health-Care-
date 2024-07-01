import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UpdateStudentDto } from '../studentsAuth/dto/update-student.dto';
import { StudentService } from './students.service';
import { JwtGuard } from 'src/shared/guards';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('student')
@UseGuards(JwtGuard)
export class StudentController {
  constructor(private readonly studentsService: StudentService) {}

  /** API Endpoint for retrieving Student information. */
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getStudentProfile(@Req() req: Request) {
    return req.user;
  }

  /** API Endpoint for retrieving all registered Students. */
  @Get()
  getAllStudents() {
    return this.studentsService.findAll();
  }

  /** API Endpoint for retrieving Student information by ID. */
  @Get(':id')
  getStudent(@Param('id') id: string) {
    return this.studentsService.getStudent(+id);
  }

  /** API Endpoint for updating Student information.
   * @param updateStudentDto
   */
  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(+id, updateStudentDto);
  }

  /** API Endpoint for updating Student information. */
  @Patch(':id')
  deactivateStudent(@Param('id') id: string) {
    return this.studentsService.deactivateStudent(+id);
  }

  /** API Endpoint for deactivating Student account. */
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(+id);
  }
}
