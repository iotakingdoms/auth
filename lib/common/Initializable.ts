export interface Initializable {
  initialize(): Promise<void>;
  terminate(): Promise<void>;
}
