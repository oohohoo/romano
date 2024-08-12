import { execSync } from 'child_process';
import readline from 'readline';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createProject() {
  const projectName = await question('Enter project name: ');
  const targetDir = await question('Enter target directory (or press Enter for current directory): ');
  const boilerplateRepo = 'https://github.com/oohohoo/OHOHO-THE-BOILERPLATE.git';

  const projectPath = targetDir ? path.join(targetDir, projectName) : projectName;

  console.log(`Creating new project: ${projectName} in ${projectPath}`);

  execSync(`git clone ${boilerplateRepo} ${projectPath}`);
  process.chdir(projectPath);

  execSync('rm -rf .git');
  execSync('git init');

  console.log('Running setup script...');
  execSync('pnpm run setup', { stdio: 'inherit' });

  console.log(`Project ${projectName} has been set up successfully in ${projectPath}!`);
  rl.close();
}

createProject().catch(console.error);