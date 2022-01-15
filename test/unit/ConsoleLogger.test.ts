/* eslint-disable no-console */
import { ConsoleLogger } from '../../lib/logger/ConsoleLogger';

describe('ConsoleLogger', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'log').mockImplementation();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('compares log level setting properly', () => {
    expect(new ConsoleLogger({ level: 'DEBUG' }).isSufficientLevel('DEBUG')).toBeTruthy();
    expect(new ConsoleLogger({ level: 'DEBUG' }).isSufficientLevel('INFO')).toBeTruthy();
    expect(new ConsoleLogger({ level: 'DEBUG' }).isSufficientLevel('WARN')).toBeTruthy();
    expect(new ConsoleLogger({ level: 'DEBUG' }).isSufficientLevel('ERROR')).toBeTruthy();
  });

  it('correctly evaluates "INFO" log level', () => {
    expect(new ConsoleLogger({ level: 'INFO' }).isSufficientLevel('DEBUG')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'INFO' }).isSufficientLevel('INFO')).toBeTruthy();
    expect(new ConsoleLogger({ level: 'INFO' }).isSufficientLevel('WARN')).toBeTruthy();
    expect(new ConsoleLogger({ level: 'INFO' }).isSufficientLevel('ERROR')).toBeTruthy();
  });

  it('correctly evaluates "WARN" log level', () => {
    expect(new ConsoleLogger({ level: 'WARN' }).isSufficientLevel('DEBUG')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'WARN' }).isSufficientLevel('INFO')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'WARN' }).isSufficientLevel('WARN')).toBeTruthy();
    expect(new ConsoleLogger({ level: 'WARN' }).isSufficientLevel('ERROR')).toBeTruthy();
  });

  it('correctly evaluates "ERROR" log level', () => {
    expect(new ConsoleLogger({ level: 'ERROR' }).isSufficientLevel('DEBUG')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'ERROR' }).isSufficientLevel('INFO')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'ERROR' }).isSufficientLevel('WARN')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'ERROR' }).isSufficientLevel('ERROR')).toBeTruthy();
  });

  it('correctly evaluates "NONE" log level', () => {
    expect(new ConsoleLogger({ level: 'NONE' }).isSufficientLevel('DEBUG')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'NONE' }).isSufficientLevel('INFO')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'NONE' }).isSufficientLevel('WARN')).toBeFalsy();
    expect(new ConsoleLogger({ level: 'NONE' }).isSufficientLevel('ERROR')).toBeFalsy();
  });

  it('logs when the log level configuration equal', () => {
    new ConsoleLogger({ level: 'DEBUG' }).debug('My message');
    expect(console.log).toBeCalledTimes(1);
    new ConsoleLogger({ level: 'INFO' }).info('My message');
    expect(console.log).toBeCalledTimes(2);
    new ConsoleLogger({ level: 'WARN' }).warn('My message');
    expect(console.log).toBeCalledTimes(3);
    new ConsoleLogger({ level: 'ERROR' }).error('My message');
    expect(console.log).toBeCalledTimes(4);
  });

  it('does not log when the log level configuration greater', () => {
    new ConsoleLogger({ level: 'NONE' }).debug('My message');
    new ConsoleLogger({ level: 'NONE' }).info('My message');
    new ConsoleLogger({ level: 'NONE' }).warn('My message');
    new ConsoleLogger({ level: 'NONE' }).error('My message');
    expect(console.log).toBeCalledTimes(0);
  });
});
