import simpleGit from 'simple-git';
import chalk from 'chalk';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs';

const git = simpleGit();

export default async function init() {
  try {
    // Initialize Git repository
    await git.init();
    console.log(chalk.green('✅ Initialized repo'));

    // Check if remote "origin" already exists
    const remotes = await git.getRemotes(true);
    const originRemote = remotes.find(remote => remote.name === 'origin');

    if (!originRemote) {
      // Get the project folder name for default remote URL
      const projectName = path.basename(process.cwd());

      // Prompt for GitHub username
      const { username } = await inquirer.prompt([
        {
          type: 'input',
          name: 'username',
          message: 'Enter your GitHub username:',
          validate: input => input ? true : 'Username cannot be empty',
        },
      ]);

      const defaultRemoteUrl = `git@github.com:${username}/${projectName}.git`;

      // Prompt user for the remote URL
      const { remoteUrl } = await inquirer.prompt([
        {
          type: 'input',
          name: 'remoteUrl',
          message: 'Enter remote repository URL:',
          default: defaultRemoteUrl,
        },
      ]);

      await git.addRemote('origin', remoteUrl);
      console.log(chalk.green(`✅ Added origin: ${remoteUrl}`));
    } else {
      console.log(chalk.yellow('ℹ️ Remote "origin" already exists.'));
    }

    // Check if a .gitignore file already exists
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
      // Prompt to create a default .gitignore file
      const { createGitignore } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createGitignore',
          message: 'Create a default .gitignore file?',
          default: true,
        },
      ]);

      if (createGitignore) {
        const gitignoreContent = `node_modules
.DS_Store
.env
`;
        fs.writeFileSync(gitignorePath, gitignoreContent);
        console.log(chalk.green('✅ .gitignore created.'));
      }
    } else {
      console.log(chalk.yellow('ℹ️  .gitignore already exists.'));
    }
  } catch (error) {
    console.error(chalk.red('Error during init:'), error);
  }
}
