import Container from './Container';

class Sample {
  private readonly _number: string;
  private readonly _type: string;
  private readonly _volume: string;
  private _container?: Container;

  constructor(number: string, type: string, volume: string) {
    this._number = number;
    this._type = type;
    this._volume = volume;
  }

  get number(): string {
    return this._number;
  }

  get type(): string {
    return this._type;
  }

  get volume(): string {
    return this._volume;
  }

  get container(): Container | undefined {
    return this._container;
  }

  set container(value: Container | undefined) {
    this._container = value;
  }
}

export default Sample;
