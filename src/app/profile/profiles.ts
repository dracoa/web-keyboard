export type ButtonMode = 'single' | 'interval' | 'long_press';

export interface Profile {
  name: string;
  buttons: Button[];
  lastUsed?: Date;
}

export interface Button {
  display: string;
  control: number | string; // Mouse_Left 21, Mouse_Right 22
  mode: ButtonMode;
  interval?: number;
  hint?: string;
}

export const Profiles: Profile[] = [
  {name: 'Diablo 3 Daemon Hunter', buttons: [
      {display: '1', control: '1', mode: 'interval', interval: 4 },
      {display: '2', control: '2', mode: 'interval', interval: 1 },
      {display: '3', control: '3', mode: 'interval', interval: 1 },
      {display: '4', control: '4', mode: 'interval', interval: 1 },
      {display: 'L', control: 21, mode: 'single' },
      {display: 'R', control: 22, mode: 'long_press' },
  ]},

];
