import { createRequest, createResponse } from 'node-mocks-http';
import { Handler } from '../../../lib/common/handler/Handler';
import { Logger } from '../../../lib/logger/Logger';
import { HttpHandler, HttpHandlerInput } from '../../../lib/http/HttpHandler';

describe('HttpHandler', () => {
  let logger: Logger;
  let endpoint1: Handler<HttpHandlerInput, void>;
  let endpoint2: Handler<HttpHandlerInput, void>;

  beforeAll(async () => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };

    endpoint1 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn(() => true),
      handle: jest.fn(async () => {}),
    };

    endpoint2 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn(() => true),
      handle: jest.fn(async () => {}),
    };
  });

  describe('Non-nested', () => {
    describe('With root path', () => {
      let httpHandler: HttpHandler;

      beforeAll(async () => {
        httpHandler = new HttpHandler({
          logger,
          path: '/',
          handlers: [endpoint1],
        });
        await httpHandler.initialize();
      });

      afterAll(async () => {
        await httpHandler.terminate();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('does not handle requests with missing "url" property', async () => {
        const input: HttpHandlerInput = {
          request: createRequest({ url: undefined }),
          response: createResponse(),
        };
        expect(httpHandler.canHandle(input)).toBeFalsy();
        await httpHandler.handle(input);
      });

      it('handles requests with matching path', async () => {
        const input: HttpHandlerInput = {
          request: createRequest({ url: '/' }),
          response: createResponse(),
        };
        expect(httpHandler.canHandle(input)).toBeTruthy();
        await httpHandler.handle(input);
      });

      it('handles requests with non-matching path', async () => {
        const input: HttpHandlerInput = {
          request: createRequest({ url: '/other' }),
          response: createResponse(),
        };
        expect(httpHandler.canHandle(input)).toBeTruthy();
        await httpHandler.handle(input);
      });
    });

    describe('With specific path', () => {
      let httpHandler: HttpHandler;

      beforeAll(async () => {
        httpHandler = new HttpHandler({
          logger,
          path: '/v1',
          handlers: [endpoint1],
        });
        await httpHandler.initialize();
      });

      afterAll(async () => {
        await httpHandler.terminate();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('handles requests with matching path', async () => {
        const input: HttpHandlerInput = {
          request: createRequest({ url: '/v1' }),
          response: createResponse(),
        };
        expect(httpHandler.canHandle(input)).toBeTruthy();
        await httpHandler.handle(input);
      });

      it('ignores requests with non-matching path', async () => {
        const input: HttpHandlerInput = {
          request: createRequest({ url: '/other' }),
          response: createResponse(),
        };
        expect(httpHandler.canHandle(input)).toBeFalsy();
        await httpHandler.handle(input);
      });
    });
  });

  describe('Nested', () => {
    let httpHandler: HttpHandler;

    beforeAll(async () => {
      httpHandler = new HttpHandler({
        logger,
        path: '/',
        handlers: [
          new HttpHandler({
            logger,
            path: '/v1',
            handlers: [endpoint1],
          }),
          new HttpHandler({
            logger,
            path: '/v2',
            handlers: [endpoint2],
          }),
        ],
      });
      await httpHandler.initialize();
    });

    afterAll(async () => {
      await httpHandler.terminate();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('forward request to correct handler: v1', async () => {
      const aInput: HttpHandlerInput = {
        request: createRequest({ url: '/v1' }),
        response: createResponse(),
      };
      expect(httpHandler.canHandle(aInput)).toBeTruthy();
      await httpHandler.handle(aInput);
      expect(endpoint1.handle).toHaveBeenCalled();
      expect(endpoint2.handle).not.toHaveBeenCalled();
    });

    it('forward request to correct handler: v2', async () => {
      const aInput: HttpHandlerInput = {
        request: createRequest({ url: '/v2' }),
        response: createResponse(),
      };
      expect(httpHandler.canHandle(aInput)).toBeTruthy();
      await httpHandler.handle(aInput);
      expect(endpoint1.handle).not.toHaveBeenCalled();
      expect(endpoint2.handle).toHaveBeenCalled();
    });
  });
});
