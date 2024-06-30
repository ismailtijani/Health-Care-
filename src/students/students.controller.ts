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
    return this.studentsService.findOne(+id);
  }

  /** API Endpoint for updating Student information.
   * @param updateStudentDto
   */
  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  /** API Endpoint for deactivating Student account. */
  @Delete(':id')
  deactivateStudent(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
