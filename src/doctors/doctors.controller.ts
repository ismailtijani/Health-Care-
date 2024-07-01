import { Controller } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}
}
