# Git Wizard

> A blog about the development of this package can be found here:: [Building a CLI Tool in JavaScript: Streamlining Tasks With Simple Commands | Fajarwz](https://fajarwz.com/blog/building-a-cli-tool-in-javascript-streamlining-tasks-with-simple-commands/).

**Git Wizard** is a command-line tool built with JavaScript and Node.js to streamline and automate common Git workflows. Whether you're a solo developer or working in a team, this tool simplifies repetitive Git tasks, reducing cognitive load and improving consistency in your development process.

With Git Wizard, you can easily initialize Git repositories, commit changes, create feature branches, and push your code—all with a few simple commands.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Initialize a new Git repository**: Automatically initialize a new Git repo in any project folder.
- **Create feature branches**: Quickly set up branches for new features, bug fixes, or experiments.
- **Commit changes with ease**: Easily commit changes with detailed messages.
- **Push to remote**: Push your local changes to a remote repository (GitHub, GitLab, etc.).
- **Automated workflows**: Simplify your development process by chaining commands together.
  
---

## Installation

To install Git Wizard, you'll need to have **Node.js** (v14 or later) and **npm** installed on your machine.

### Install Globally

You can install **Git Wizard** globally via npm:

```bash
npm install -g @fajarwz/git-wizard
```

This will allow you to run the tool from anywhere in your terminal using the `git-wizard` or `gw` command.

## Usage

Once installed, you can run the following commands in your terminal:

```bash
git-wizard [command]
```

Or simply:

```bash
gw [command]
```

## Commands

### init

Initialize a new Git repository in the current directory.

```bash
gw init
```

### new-feature

Create a new feature branch for development.

```bash
gw new-feature
```

### commit

Commit staged changes with a message.

```bash
gw commit
```

### push

Push changes to the remote repository.

```bash
gw push
```

## Run tests

```bash
npm test
```

## Contributing
We welcome contributions! If you'd like to help improve Git Wizard.

## License
Git Wizard is licensed under the [ISC License](./LICENSE).
