import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get('/')
  getHomePage() {
    return 'Home Page';
  }
}
