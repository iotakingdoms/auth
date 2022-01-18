import { createRequest, createResponse } from 'node-mocks-http';
import { ILogger } from '../../../../lib/logger/ILogger';
import { HttpHandler, HttpHandlerInput } from '../../../../lib/server/HttpHandler';
import { RouteHandler } from '../../../../lib/server/middleware/RouteHandler';

describe('RouteHandler', () => {
  let logger: ILogger;
  let middleware1: HttpHandler;
  let middleware2: HttpHandler;

  beforeAll(async () => {
    logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    middleware1 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn(() => true),
      handle: jest.fn(async () => ({ swallowed: true })),
    };

    middleware2 = {
      initialize: jest.fn(),
      terminate: jest.fn(),
      canHandle: jest.fn(() => true),
      handle: jest.fn(async () => ({ swallowed: true })),
    };
  });

  describe('Non-nested', () => {
    describe('With root path', () => {
      let handler: RouteHandler;

      beforeAll(async () => {
        handler = new RouteHandler({
          logger,
          path: '/',
          middlewares: [middleware1],
        });
        await handler.initialize();
      });

      afterAll(async () => {
        await handler.terminate();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('does not requests with missing "url" property', async () => {
        const aInput: HttpHandlerInput = {
          request: createRequest({ url: undefined }),
          response: createResponse(),
        };
        expect(handler.canHandle(aInput)).toBeFalsy();
        const output = await handler.handle(aInput);
        expect(output.swallowed).toBeFalsy();
      });

      it('handles requests with matching path', async () => {
        const aInput: HttpHandlerInput = {
          request: createRequest({ url: '/' }),
          response: createResponse(),
        };
        expect(handler.canHandle(aInput)).toBeTruthy();
        const output = await handler.handle(aInput);
        expect(output.swallowed).toBeTruthy();
      });

      it('handles requests with non-matching path', async () => {
        const aInput: HttpHandlerInput = {
          request: createRequest({ url: '/other' }),
          response: createResponse(),
        };
        expect(handler.canHandle(aInput)).toBeTruthy();
        const output = await handler.handle(aInput);
        expect(output.swallowed).toBeTruthy();
      });
    });

    describe('With specific path', () => {
      let handler: RouteHandler;

      beforeAll(async () => {
        handler = new RouteHandler({
          logger,
          path: '/v1',
          middlewares: [middleware1],
        });
        await handler.initialize();
      });

      afterAll(async () => {
        await handler.terminate();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('handles requests with matching path', async () => {
        const aInput: HttpHandlerInput = {
          request: createRequest({ url: '/v1' }),
          response: createResponse(),
        };
        expect(handler.canHandle(aInput)).toBeTruthy();
        const output = await handler.handle(aInput);
        expect(output.swallowed).toBeTruthy();
      });

      it('ignores requests with non-matching path', async () => {
        const aInput: HttpHandlerInput = {
          request: createRequest({ url: '/other' }),
          response: createResponse(),
        };
        expect(handler.canHandle(aInput)).toBeFalsy();
        const output = await handler.handle(aInput);
        expect(output.swallowed).toBeFalsy();
      });
    });
  });

  describe('Nested', () => {
    let handler: RouteHandler;

    beforeAll(async () => {
      handler = new RouteHandler({
        logger,
        path: '/',
        middlewares: [
          new RouteHandler({
            logger,
            path: '/v1',
            middlewares: [middleware1],
          }),
          new RouteHandler({
            logger,
            path: '/v2',
            middlewares: [middleware2],
          }),
        ],
      });
      await handler.initialize();
    });

    afterAll(async () => {
      await handler.terminate();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('forward request to correct handler: v1', async () => {
      const aInput: HttpHandlerInput = {
        request: createRequest({ url: '/v1' }),
        response: createResponse(),
      };
      expect(handler.canHandle(aInput)).toBeTruthy();
      const output = await handler.handle(aInput);
      expect(output.swallowed).toBeTruthy();
      expect(middleware1.handle).toHaveBeenCalled();
      expect(middleware2.handle).not.toHaveBeenCalled();
    });

    it('forward request to correct handler: v2', async () => {
      const aInput: HttpHandlerInput = {
        request: createRequest({ url: '/v2' }),
        response: createResponse(),
      };
      expect(handler.canHandle(aInput)).toBeTruthy();
      const output = await handler.handle(aInput);
      expect(output.swallowed).toBeTruthy();
      expect(middleware1.handle).not.toHaveBeenCalled();
      expect(middleware2.handle).toHaveBeenCalled();
    });
  });
});
