import { Logger } from '../../../../lib/logger/Logger';
import { Handler } from '../../../../lib/common/handler/Handler';
import { WaterfallHandler } from '../../../../lib/common/handler/WaterfallHandler';

describe('WaterfallHandler', () => {
  let logger: Logger;
  let nestedHandler1: jest.Mocked<Handler<string, void>>;
  let nestedHandler2: jest.Mocked<Handler<string, void>>;
  let nestedHandler3: jest.Mocked<Handler<string, void>>;
  let waterfallHandler: WaterfallHandler<string>;

  beforeAll(() => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };

    nestedHandler1 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn((input: string): boolean => true),
      handle: jest.fn(async (input: string): Promise<void> => {}),
    };

    nestedHandler2 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn((input: string): boolean => true),
      handle: jest.fn(async (input: string): Promise<void> => {}),
    };

    nestedHandler3 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn((input: string): boolean => true),
      handle: jest.fn(async (input: string): Promise<void> => {}),
    };

    waterfallHandler = new WaterfallHandler<string>({
      logger,
      handlers: [
        nestedHandler1,
        nestedHandler2,
        nestedHandler3,
      ],
    });
  });

  beforeEach(async () => {
    expect(nestedHandler1.initialize).not.toHaveBeenCalled();
    expect(nestedHandler2.initialize).not.toHaveBeenCalled();
    expect(nestedHandler3.initialize).not.toHaveBeenCalled();
    await waterfallHandler.initialize();
    expect(nestedHandler1.initialize).toHaveBeenCalled();
    expect(nestedHandler2.initialize).toHaveBeenCalled();
    expect(nestedHandler3.initialize).toHaveBeenCalled();
  });

  afterEach(async () => {
    expect(nestedHandler1.terminate).not.toHaveBeenCalled();
    expect(nestedHandler2.terminate).not.toHaveBeenCalled();
    expect(nestedHandler3.terminate).not.toHaveBeenCalled();
    await waterfallHandler.terminate();
    expect(nestedHandler1.terminate).toHaveBeenCalled();
    expect(nestedHandler2.terminate).toHaveBeenCalled();
    expect(nestedHandler3.terminate).toHaveBeenCalled();

    jest.clearAllMocks();
  });

  it('executed canHandle on all nested handlers', () => {
    expect(nestedHandler1.canHandle).not.toHaveBeenCalled();
    expect(nestedHandler2.canHandle).not.toHaveBeenCalled();
    expect(nestedHandler3.canHandle).not.toHaveBeenCalled();
    waterfallHandler.canHandle('something');
    expect(nestedHandler1.canHandle).toHaveBeenCalled();
    expect(nestedHandler2.canHandle).toHaveBeenCalled();
    expect(nestedHandler3.canHandle).toHaveBeenCalled();
  });

  it('only invokes the first handler that can handle this input', async () => {
    nestedHandler1.canHandle.mockImplementationOnce((): boolean => false);
    await waterfallHandler.handle('something');
    expect(nestedHandler1.handle).not.toHaveBeenCalled();
    expect(nestedHandler2.handle).toHaveBeenCalledWith('something');
    expect(nestedHandler3.handle).not.toHaveBeenCalled();
  });

  it('does not invoke any handler if none can handle this input', async () => {
    nestedHandler1.canHandle.mockImplementationOnce((): boolean => false);
    nestedHandler2.canHandle.mockImplementationOnce((): boolean => false);
    nestedHandler3.canHandle.mockImplementationOnce((): boolean => false);
    await waterfallHandler.handle('something');
    expect(nestedHandler1.handle).not.toHaveBeenCalled();
    expect(nestedHandler2.handle).not.toHaveBeenCalled();
    expect(nestedHandler3.handle).not.toHaveBeenCalled();
  });
});
