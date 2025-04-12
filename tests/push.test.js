import { jest } from '@jest/globals';
import push from '../src/commands/push.js';

describe('push command', () => {
  const mockGit = {
    status: jest.fn(),
    push: jest.fn(),
    getRemotes: jest.fn(),
  };

  const mockChalk = {
    green: jest.fn(msg => msg),
    blue: jest.fn(msg => msg),
    red: jest.fn(msg => msg),
  };

  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('pushes current branch and prints PR link', async () => {
    mockGit.status.mockResolvedValue({ current: 'feature/cool-stuff' });
    mockGit.getRemotes.mockResolvedValue([
      {
        name: 'origin',
        refs: { fetch: 'git@github.com:test-user/my-repo.git' },
      },
    ]);

    await push({ git: mockGit, chalk: mockChalk });

    expect(mockGit.push).toHaveBeenCalledWith('origin', 'feature/cool-stuff');
    expect(consoleLogSpy).toHaveBeenCalledWith('✅ Pushed to origin/feature/cool-stuff');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '🔗 Open PR: https://github.com/test-user/my-repo/compare/feature/cool-stuff?expand=1'
    );
  });

  it('logs error if no origin remote is found', async () => {
    mockGit.status.mockResolvedValue({ current: 'main' });
    mockGit.getRemotes.mockResolvedValue([]);

    await push({ git: mockGit, chalk: mockChalk });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error: No remote named "origin" found.'
    );
  });

  it('logs error if remote URL is invalid', async () => {
    mockGit.status.mockResolvedValue({ current: 'main' });
    mockGit.getRemotes.mockResolvedValue([
      {
        name: 'origin',
        refs: { fetch: 'https://github.com/invalid-url' },
      },
    ]);

    await push({ git: mockGit, chalk: mockChalk });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error: Remote URL is not in the expected format.'
    );
  });

  it('catches and logs unexpected errors', async () => {
    mockGit.status.mockRejectedValue(new Error('Something went wrong'));

    await push({ git: mockGit, chalk: mockChalk });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error during push:',
      expect.any(Error)
    );
  });
});
