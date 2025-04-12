import { jest } from '@jest/globals';
import newFeature from '../src/commands/new-feature.js';

describe('newFeature command', () => {
  const mockGit = {
    checkoutLocalBranch: jest.fn(),
  };

  const mockInquirer = {
    prompt: jest.fn(),
  };

  const mockChalk = {
    green: jest.fn((msg) => msg),
    red: jest.fn((msg) => msg),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates and switches to a new feature branch', async () => {
    mockInquirer.prompt.mockResolvedValueOnce({ featureName: 'awesome-update' });

    await newFeature({
      inquirer: mockInquirer,
      git: mockGit,
      chalk: mockChalk,
    });

    expect(mockGit.checkoutLocalBranch).toHaveBeenCalledWith('feature/awesome-update');
    expect(mockChalk.green).toHaveBeenCalledWith('✅ Switched to feature/awesome-update');
  });

  it('handles empty input validation', async () => {
    const validate = newFeature.toString().match(/validate: ([^,]+),/)[1]; // to check presence of validator
    const validationFn = eval(`(${validate})`);
    expect(validationFn('')).toBe('Feature name cannot be empty');
    expect(validationFn('login')).toBe(true);
  });

  it('handles errors gracefully', async () => {
    mockInquirer.prompt.mockRejectedValue(new Error('Prompt failed'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await newFeature({
      inquirer: mockInquirer,
      git: mockGit,
      chalk: mockChalk,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      mockChalk.red('Error during new-feature:'),
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
