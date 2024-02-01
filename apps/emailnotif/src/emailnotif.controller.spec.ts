import { Test, TestingModule } from '@nestjs/testing';
import { EmailnotifController } from './emailnotif.controller';
import { EmailnotifService } from './emailnotif.service';

describe('EmailnotifController', () => {
  let emailnotifController: EmailnotifController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailnotifController],
      providers: [EmailnotifService],
    }).compile();

    emailnotifController = app.get<EmailnotifController>(EmailnotifController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emailnotifController.getHello()).toBe('Hello World!');
    });
  });
});
