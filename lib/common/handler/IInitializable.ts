export interface IInitializable {
  initialize(): Promise<void>;
  terminate(): Promise<void>;
}
