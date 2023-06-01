import { ArgumentInvalidException } from '@domain-core/exceptions';

import { Senha } from './senha.value-object';

describe('Senha', () => {
  describe('constructor', () => {
    it('should create a new Senha object', () => {
      const senha = new Senha('Eduardo Conti');
      expect(senha).toBeDefined();
      expect(senha.value).toBeDefined();
      expect(Senha.isValueObject(senha)).toBeTruthy();
    });
  });
  describe('validate', () => {
    it('should throw ArgumentInvalidException if senha is null', () => {
      expect(() => {
        new Senha('');
      }).toThrowError(ArgumentInvalidException);
    });
  });
});
