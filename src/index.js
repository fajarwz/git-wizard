#!/usr/bin/env node
import { program } from 'commander';
import init from './commands/init.js';
import newFeature from './commands/new-feature.js';
import commit from './commands/commit.js';
import push from './commands/push.js';
import simpleGit from 'simple-git';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const git = simpleGit();

program.name('git-wizard').description('🛠️ A CLI tool to automate Git workflows').version('1.0.0');

program.command('init').description('🧹 Initialize a new Git repository and set remote URL')
  .action(() => init({ inquirer, git: simpleGit(), chalk, fs, path }));
program.command('new-feature').description('🌱 Create and switch to a new feature branch')
  .action(() => newFeature({ inquirer, git, chalk }));
program.command('commit').description('✍️ Create a conventional commit using interactive prompts')
  .action(() => commit({ inquirer, git, chalk }));
program.command('push').description('🚀 Push the current branch and open a pull request URL')
  .action(() => push({ git, chalk }));

program.parse(process.argv);
