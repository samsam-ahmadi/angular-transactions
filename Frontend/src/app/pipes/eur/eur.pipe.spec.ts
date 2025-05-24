import { EurPipe } from './eur.pipe';

describe('EurPipe', () => {
  it('create an instance', () => {
    const pipe = new EurPipe();
    expect(pipe).toBeTruthy();
  });
});
