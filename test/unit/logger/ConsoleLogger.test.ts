/* eslint-disable no-console */
import { LogLevel } from '../../../lib/logger/Logger';
import { ConsoleLogger } from '../../../lib/logger/ConsoleLogger';

describe('ConsoleLogger', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'log').mockImplementation();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('compares log level setting properly', () => {
    expect(new ConsoleLogger({ logLevel: 'Debug' }).isSufficientLogLevel(LogLevel.Debug)).toBeTruthy();
    expect(new ConsoleLogger({ logLevel: 'Debug' }).isSufficientLogLevel(LogLevel.Info)).toBeTruthy();
    expect(new ConsoleLogger({ logLevel: 'Debug' }).isSufficientLogLevel(LogLevel.Warn)).toBeTruthy();
    expect(new ConsoleLogger({ logLevel: 'Debug' }).isSufficientLogLevel(LogLevel.Error)).toBeTruthy();
  });

  it('correctly evaluates "INFO" log level', () => {
    expect(new ConsoleLogger({ logLevel: 'Info' }).isSufficientLogLevel(LogLevel.Debug)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'Info' }).isSufficientLogLevel(LogLevel.Info)).toBeTruthy();
    expect(new ConsoleLogger({ logLevel: 'Info' }).isSufficientLogLevel(LogLevel.Warn)).toBeTruthy();
    expect(new ConsoleLogger({ logLevel: 'Info' }).isSufficientLogLevel(LogLevel.Error)).toBeTruthy();
  });

  it('correctly evaluates "WARN" log level', () => {
    expect(new ConsoleLogger({ logLevel: 'Warn' }).isSufficientLogLevel(LogLevel.Debug)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'Warn' }).isSufficientLogLevel(LogLevel.Info)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'Warn' }).isSufficientLogLevel(LogLevel.Warn)).toBeTruthy();
    expect(new ConsoleLogger({ logLevel: 'Warn' }).isSufficientLogLevel(LogLevel.Error)).toBeTruthy();
  });

  it('correctly evaluates "ERROR" log level', () => {
    expect(new ConsoleLogger({ logLevel: 'Error' }).isSufficientLogLevel(LogLevel.Debug)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'Error' }).isSufficientLogLevel(LogLevel.Info)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'Error' }).isSufficientLogLevel(LogLevel.Warn)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'Error' }).isSufficientLogLevel(LogLevel.Error)).toBeTruthy();
  });

  it('correctly evaluates "NONE" log level', () => {
    expect(new ConsoleLogger({ logLevel: 'None' }).isSufficientLogLevel(LogLevel.Debug)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'None' }).isSufficientLogLevel(LogLevel.Info)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'None' }).isSufficientLogLevel(LogLevel.Warn)).toBeFalsy();
    expect(new ConsoleLogger({ logLevel: 'None' }).isSufficientLogLevel(LogLevel.Error)).toBeFalsy();
  });

  it('logs when the log level configuration equal', () => {
    new ConsoleLogger({ logLevel: 'Debug' }).debug('My message');
    expect(console.log).toBeCalledTimes(1);
    new ConsoleLogger({ logLevel: 'Info' }).info('My message');
    expect(console.log).toBeCalledTimes(2);
    new ConsoleLogger({ logLevel: 'Warn' }).warn('My message');
    expect(console.log).toBeCalledTimes(3);
    new ConsoleLogger({ logLevel: 'Error' }).error('My message');
    expect(console.log).toBeCalledTimes(4);
  });

  it('does not log when the log level configuration greater', () => {
    new ConsoleLogger({ logLevel: 'None' }).debug('My message');
    new ConsoleLogger({ logLevel: 'None' }).info('My message');
    new ConsoleLogger({ logLevel: 'None' }).warn('My message');
    new ConsoleLogger({ logLevel: 'None' }).error('My message');
    expect(console.log).toBeCalledTimes(0);
  });
});
