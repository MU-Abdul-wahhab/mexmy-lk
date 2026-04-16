import { Test, TestingModule } from '@nestjs/testing';
import { EmailProducer } from './email.producer';

describe('EmailProducer', () => {
  let provider: EmailProducer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailProducer],
    }).compile();

    provider = module.get<EmailProducer>(EmailProducer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
