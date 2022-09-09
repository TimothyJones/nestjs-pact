import { Test } from '@nestjs/testing';
import { Publisher } from '@pact-foundation/pact-core';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactPublisherProvider } from './pact-publisher.provider';

const mockPublisher = jest.createMockFromModule<Publisher>('@pact-foundation/pact-core');

mockPublisher.publish = jest.fn();

describe('PactPublisherProvider', () => {
  const publicationOptions = { pactBroker: 'example-broker', pactFilesOrDirs: ['./'], consumerVersion: '1' };

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [
        PactPublisherProvider,
        {
          provide: PactModuleProviders.PublicationOptions,
          useValue: publicationOptions,
        },
      ],
    }).compile();
  });

  describe('When calling the provider (in any module)', () => {
    test('then call Publisher with the exact options', () => {
      expect(Publisher).toHaveBeenCalledWith(publicationOptions);
    });
  });
});
