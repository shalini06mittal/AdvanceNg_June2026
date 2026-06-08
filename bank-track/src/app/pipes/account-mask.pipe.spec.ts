import { AccountMaskPipe } from './account-mask.pipe';

describe('AccountMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
