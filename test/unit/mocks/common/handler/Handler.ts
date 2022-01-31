import { Handler } from '../../../../../lib/common/handler/Handler';

export const mockHandler = (): jest.Mocked<Handler<any, any>> => ({
  initialize: jest.fn(),
  terminate: jest.fn(),
  canHandle: jest.fn((input: any): any => true),
  handle: jest.fn(async (input: any): Promise<any> => {}),
});
