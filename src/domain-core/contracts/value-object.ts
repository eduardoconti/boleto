export type Primitives = string | number | boolean | Date;

export interface DomainPrimitive<T extends Primitives | unknown> {
  value: T;
}
type ValueObjectProps<T> = T extends Primitives ? DomainPrimitive<T> : T;
export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === undefined) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(vo);
  }

  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (
      (typeof props === 'string' && !props.trim().length) ||
      (props instanceof Date && isNaN(props.getTime()))
    ) {
      throw new Error('Property cannot be empty');
    }
  }
  protected abstract validate(props: ValueObjectProps<T>): void;
}
