import { jest } from '@jest/globals';
import init from '../src/commands/init.js';
import path from 'path';

describe('init command', () => {
  const mockGit = {
    init: jest.fn(),
    getRemotes: jest.fn(),
    addRemote: jest.fn(),
  };

  const mockInquirer = {
    prompt: jest.fn(),
  };

  const mockFs = {
    existsSync: jest.fn(),
    writeFileSync: jest.fn(),
  };

  const mockChalk = {
    green: jest.fn((msg) => msg),
    yellow: jest.fn((msg) => msg),
    red: jest.fn((msg) => msg),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes a repo and creates .gitignore', async () => {
    mockGit.init.mockResolvedValue();
    mockGit.getRemotes.mockResolvedValue([]);
    mockGit.addRemote.mockResolvedValue();

    mockInquirer.prompt
      .mockResolvedValueOnce({ username: 'fajarwz' })
      .mockResolvedValueOnce({ remoteUrl: 'git@github.com:fajarwz/my-project.git' })
      .mockResolvedValueOnce({ createGitignore: true });

    mockFs.existsSync.mockReturnValue(false);

    jest.spyOn(process, 'cwd').mockReturnValue('/path/to/my-project');

    await init({
      inquirer: mockInquirer,
      git: mockGit,
      chalk: mockChalk,
      fs: mockFs,
      path,
    });

    expect(mockGit.init).toHaveBeenCalled();
    expect(mockGit.addRemote).toHaveBeenCalledWith('origin', 'git@github.com:fajarwz/my-project.git');
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      path.join('/path/to/my-project', '.gitignore'),
      expect.stringContaining('node_modules')
    );
  });
});
