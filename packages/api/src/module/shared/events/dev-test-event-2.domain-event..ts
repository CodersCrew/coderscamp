export type DevTestEvent2 = {
  type: 'DevTestEvent2';
  data: { id: number; counter: number; desc: string };
};

export const devTestEvent2 = (data: DevTestEvent2['data']): DevTestEvent2 => ({
  type: 'DevTestEvent2',
  data,
});
