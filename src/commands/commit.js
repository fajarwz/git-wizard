import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import chalk from 'chalk';

const git = simpleGit();

export default async function commit() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Type:',
        choices: ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test'],
      },
      {
        type: 'input',
        name: 'scope',
        message: 'Scope (optional):',
      },
      {
        type: 'input',
        name: 'message',
        message: 'Message:',
        validate: input => input ? true : 'Commit message cannot be empty',
      },
    ]);

    const { type, scope, message } = answers;
    const commitMsg = scope.trim() 
      ? `${type}(${scope.trim()}): ${message.trim()}`
      : `${type}: ${message.trim()}`;

    await git.add('.');
    await git.commit(commitMsg);
    console.log(chalk.green(`✅ Committed: ${commitMsg}`));
  } catch (error) {
    console.error(chalk.red('Error during commit:'), error);
  }
}
