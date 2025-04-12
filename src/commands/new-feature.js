import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import chalk from 'chalk';

const git = simpleGit();

export default async function newFeature() {
  try {
    const { featureName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'featureName',
        message: 'Feature name:',
        validate: input => input ? true : 'Feature name cannot be empty',
      },
    ]);

    // Construct branch name
    const branchName = `feature/${featureName.trim()}`;
    
    // Create and checkout the new branch
    await git.checkoutLocalBranch(branchName);
    console.log(chalk.green(`✅ Switched to ${branchName}`));
  } catch (error) {
    console.error(chalk.red('Error during new-feature:'), error);
  }
}
