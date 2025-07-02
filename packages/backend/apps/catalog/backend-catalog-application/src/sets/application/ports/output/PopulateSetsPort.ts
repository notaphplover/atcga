export const populateSetsPortSymbol: symbol = Symbol.for('PopulateSetsPort');

export interface PopulateSetsPort {
  populateSets(): Promise<void>;
}
