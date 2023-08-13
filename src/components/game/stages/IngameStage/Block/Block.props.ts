export interface IBlock {
  background?: string;
  number: number;
  animation?:
    | 'no-animation'
    | 'nothing-rotate'
    | 'blink-nothing'
    | 'scaleDown-nothing';
}
