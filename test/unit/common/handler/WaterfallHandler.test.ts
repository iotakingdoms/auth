import { IHandler } from '../../../../lib/common/handler/IHandler';
import { WaterfallHandler } from '../../../../lib/common/handler/WaterfallHandler';

describe('WaterfallHandler', () => {
  let nestedHandler1: jest.Mocked<IHandler<string, string>>;
  let nestedHandler2: jest.Mocked<IHandler<string, string>>;
  let nestedHandler3: jest.Mocked<IHandler<string, string>>;
  let waterfallHandler: WaterfallHandler<string, string>;

  beforeAll(() => {
    nestedHandler1 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn((input: string): boolean => true),
      handle: jest.fn(async (input: string): Promise<string> => 'handled1'),
    };

    nestedHandler2 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn((input: string): boolean => true),
      handle: jest.fn(async (input: string): Promise<string> => 'handled2'),
    };

    nestedHandler3 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn((input: string): boolean => true),
      handle: jest.fn(async (input: string): Promise<string> => 'handled3'),
    };

    waterfallHandler = new WaterfallHandler<string, string>({
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
    const output = await waterfallHandler.handle('something');
    expect(output).toHaveLength(1);
    expect(output[0]).toBe('handled2');
    expect(nestedHandler1.handle).not.toHaveBeenCalled();
    expect(nestedHandler2.handle).toHaveBeenCalledWith('something');
    expect(nestedHandler3.handle).not.toHaveBeenCalled();
  });

  it('does not invoke any handler if none can handle this input', async () => {
    nestedHandler1.canHandle.mockImplementationOnce((): boolean => false);
    nestedHandler2.canHandle.mockImplementationOnce((): boolean => false);
    nestedHandler3.canHandle.mockImplementationOnce((): boolean => false);
    const output = await waterfallHandler.handle('something');
    expect(output).toHaveLength(0);
    expect(nestedHandler1.handle).not.toHaveBeenCalled();
    expect(nestedHandler2.handle).not.toHaveBeenCalled();
    expect(nestedHandler3.handle).not.toHaveBeenCalled();
  });
});
