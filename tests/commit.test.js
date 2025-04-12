import { jest } from '@jest/globals';
import commit from '../src/commands/commit.js';

describe('commit()', () => {
  it('should commit with correct message', async () => {
    const mockPrompt = jest.fn().mockResolvedValue({
      type: 'feat',
      scope: 'auth',
      message: 'add login support'
    });

    const gitMock = {
      add: jest.fn().mockResolvedValue(),
      commit: jest.fn().mockResolvedValue()
    };

    const chalkMock = {
      green: jest.fn(str => str),
      red: jest.fn(str => str)
    };

    const inquirerMock = { prompt: mockPrompt };

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await commit({ inquirer: inquirerMock, git: gitMock, chalk: chalkMock });

    expect(gitMock.add).toHaveBeenCalledWith('.');
    expect(gitMock.commit).toHaveBeenCalledWith('feat(auth): add login support');
    expect(consoleSpy).toHaveBeenCalledWith('✅ Committed: feat(auth): add login support');

    consoleSpy.mockRestore();
  });
});
