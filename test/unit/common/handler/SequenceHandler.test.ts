import { Logger } from '../../../../lib/logger/Logger';
import { Handler } from '../../../../lib/common/handler/Handler';
import { SequenceHandler } from '../../../../lib/common/handler/SequenceHandler';
import { mockLogger } from '../../mocks/logger/Logger';
import { mockHandler } from '../../mocks/common/handler/Handler';

describe('SequenceHandler', () => {
  let logger: jest.Mocked<Logger>;
  let nestedHandler1: jest.Mocked<Handler<string, void>>;
  let nestedHandler2: jest.Mocked<Handler<string, void>>;
  let nestedHandler3: jest.Mocked<Handler<string, void>>;
  let sequenceHandler: SequenceHandler<string>;

  beforeAll(() => {
    logger = mockLogger();
    nestedHandler1 = mockHandler();
    nestedHandler2 = mockHandler();
    nestedHandler3 = mockHandler();

    sequenceHandler = new SequenceHandler<string>({
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
    await sequenceHandler.initialize();
    expect(nestedHandler1.initialize).toHaveBeenCalled();
    expect(nestedHandler2.initialize).toHaveBeenCalled();
    expect(nestedHandler3.initialize).toHaveBeenCalled();
  });

  afterEach(async () => {
    expect(nestedHandler1.terminate).not.toHaveBeenCalled();
    expect(nestedHandler2.terminate).not.toHaveBeenCalled();
    expect(nestedHandler3.terminate).not.toHaveBeenCalled();
    await sequenceHandler.terminate();
    expect(nestedHandler1.terminate).toHaveBeenCalled();
    expect(nestedHandler2.terminate).toHaveBeenCalled();
    expect(nestedHandler3.terminate).toHaveBeenCalled();
  });

  describe('typical life cycle', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('executed canHandle on all nested handlers', () => {
      expect(nestedHandler1.canHandle).not.toHaveBeenCalled();
      expect(nestedHandler2.canHandle).not.toHaveBeenCalled();
      expect(nestedHandler3.canHandle).not.toHaveBeenCalled();
      sequenceHandler.canHandle('something');
      expect(nestedHandler1.canHandle).toHaveBeenCalled();
      expect(nestedHandler2.canHandle).toHaveBeenCalled();
      expect(nestedHandler3.canHandle).toHaveBeenCalled();
    });

    it('executes nested handlers in sequential order', async () => {
      nestedHandler1.handle.mockImplementationOnce(async (): Promise<void> => {
        expect(nestedHandler1.handle).toHaveBeenCalled();
        expect(nestedHandler2.handle).not.toHaveBeenCalled();
        expect(nestedHandler3.handle).not.toHaveBeenCalled();
      });

      nestedHandler2.handle.mockImplementationOnce(async (): Promise<void> => {
        expect(nestedHandler1.handle).toHaveBeenCalled();
        expect(nestedHandler2.handle).toHaveBeenCalled();
        expect(nestedHandler3.handle).not.toHaveBeenCalled();
      });

      nestedHandler3.handle.mockImplementationOnce(async (): Promise<void> => {
        expect(nestedHandler1.handle).toHaveBeenCalled();
        expect(nestedHandler2.handle).toHaveBeenCalled();
        expect(nestedHandler3.handle).toHaveBeenCalled();
      });

      expect(nestedHandler1.handle).not.toHaveBeenCalled();
      expect(nestedHandler2.handle).not.toHaveBeenCalled();
      expect(nestedHandler3.handle).not.toHaveBeenCalled();

      await sequenceHandler.handle('something');

      expect(nestedHandler1.handle).toHaveBeenCalledWith('something');
      expect(nestedHandler2.handle).toHaveBeenCalledWith('something');
      expect(nestedHandler3.handle).toHaveBeenCalledWith('something');
    });

    it('does not invoke handle for nestedHandler that can not handle the input', async () => {
      nestedHandler2.canHandle.mockImplementationOnce((): boolean => false);
      expect(nestedHandler1.handle).not.toHaveBeenCalled();
      expect(nestedHandler2.handle).not.toHaveBeenCalled();
      expect(nestedHandler3.handle).not.toHaveBeenCalled();

      await sequenceHandler.handle('something');

      expect(nestedHandler1.handle).toHaveBeenCalledWith('something');
      expect(nestedHandler2.handle).not.toHaveBeenCalled();
      expect(nestedHandler3.handle).toHaveBeenCalledWith('something');
    });
  });
});
