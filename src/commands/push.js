import simpleGit from 'simple-git';
import chalk from 'chalk';

const git = simpleGit();

export default async function push() {
  try {
    // Get the current branch name
    const status = await git.status();
    const branch = status.current;

    // Push current branch to remote 'origin'
    await git.push('origin', branch);
    console.log(chalk.green(`✅ Pushed to origin/${branch}`));

    // Get remote URL from Git configuration
    const remotes = await git.getRemotes(true);
    const origin = remotes.find(r => r.name === 'origin');
    if (!origin) {
      console.error(chalk.red('Error: No remote named "origin" found.'));
      return;
    }

    // Extract the fetch URL (e.g., git@github.com:username/repo.git)
    const remoteUrl = origin.refs.fetch;
    // Parse the username and repository name from the URL using regex
    const match = remoteUrl.match(/git@github\.com:(.+?)\/(.+?)\.git/);
    if (!match) {
      console.error(chalk.red('Error: Remote URL is not in the expected format.'));
      return;
    }

    const username = match[1];
    const repo = match[2];
    // Construct a pull request URL (placeholder)
    const prUrl = `https://github.com/${username}/${repo}/compare/${branch}?expand=1`;

    console.log(chalk.blue(`🔗 Open PR: ${prUrl}`));
  } catch (error) {
    console.error(chalk.red('Error during push:'), error);
  }
}
