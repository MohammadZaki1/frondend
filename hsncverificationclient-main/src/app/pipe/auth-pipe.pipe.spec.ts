import { AuthPipePipe } from './auth-pipe.pipe';

describe('AuthPipePipe', () => {
  it('create an instance', () => {
    const pipe = new AuthPipePipe();
    expect(pipe).toBeTruthy();
  });
});
