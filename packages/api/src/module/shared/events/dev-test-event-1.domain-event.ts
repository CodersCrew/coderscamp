export type DevTestEvent1 = {
  type: 'DevTestEvent1';
  data: { id: number; counter: number; desc: string };
};

export const devTestEvent1 = (data: DevTestEvent1['data']): DevTestEvent1 => ({
  type: 'DevTestEvent1',
  data,
});
