import { ArgumentInvalidException } from '@domain-core/exceptions';

import { Host } from './host.value-object';

describe('Host', () => {
  describe('constructor', () => {
    it('should create a new Host object', () => {
      const host = new Host('http://localhost:3005/boleto');
      expect(host).toBeDefined();
      expect(host.value).toBeDefined();
      expect(Host.isValueObject(host)).toBeTruthy;
    });
  });
  describe('validate', () => {
    it('should throw ArgumentInvalidException if host is invalid', () => {
      expect(() => {
        new Host('ftp\\//invalid;com');
      }).toThrowError(ArgumentInvalidException);
      expect(() => {
        new Host('http://');
      }).toThrowError(ArgumentInvalidException);
      expect(() => {
        new Host('hggps:///kkk.teste.com');
      }).toThrowError(ArgumentInvalidException);
      expect(() => {
        new Host('');
      }).toThrowError(ArgumentInvalidException);
    });
  });
});
