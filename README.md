# romano

tgerge

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [Building for Production](#building-for-production)
7. [Testing](#testing)
8. [Linting and Formatting](#linting-and-formatting)
9. [Version Management](#version-management)
10. [CI/CD Setup](#cicd-setup)
11. [WordPress Integration](#wordpress-integration)
12. [Contributing](#contributing)

## Introduction

OHOHO-THE-BOILERPLATE is a comprehensive starter kit designed to streamline your web development process. It combines modern tools and best practices to provide a solid foundation for building scalable and maintainable web applications.

## Features

- TypeScript support
- Module bundling with esbuild
- GSAP for animations
- Smooth scrolling with Smooth Scrollbar
- Page transitions with Barba.js
- Linting with ESLint
- Code formatting with Prettier
- Testing with Playwright
- Version management with Changesets
- CI/CD pipeline with GitHub Actions
- WordPress integration capabilities

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ohoho-the-boilerplate.git new-project-name
   cd new-project-name
   ```

2. Remove the existing Git history and initialize a new repository:
   ```
   rm -rf .git
   git init
   ```

3. Install dependencies:
   ```
   pnpm install
   ```

4. Start the development server:
   ```
   pnpm run dev
   ```
   This will start a development server on http://localhost:3000 and automatically open it in your default browser.

5. For production build:
   ```
   pnpm run build
   ```
   ```

## Project Structure
ohoho-the-boilerplate/
├── src/
│ ├── css/
│ ├── js/
│ └── index.ts
├── public/
│ ├── index.html
│ └── index2.html
├── dist/
├── tests/
└── package.json


- `src/`: Source files (CSS, JavaScript, TypeScript)
- `public/`: Static assets and HTML templates
- `dist/`: Output directory for compiled files
- `tests/`: Test files

## Development Workflow

1. Write your HTML in `public/*.html`
2. Style your pages in `src/css/*.css`
3. Implement functionality in `src/js/*.js`
4. Use `src/index.ts` to import and initialize modules
5. The development server will automatically reload as you make changes
6. The project uses multiple CSS files:
   - `src/css/normalize.css` for cross-browser consistency
   - `src/css/main.css` for global styles
   - `src/css/app.css` for application-specific styles
   Modify these as needed for your project.

7. The `src/js/init.js` file contains initialization logic for various features. Review and modify this file to customize the project's functionality.


## Building for Production

Run the build command:
pnpm run build

This will compile, bundle, and optimize your code for production in the `dist/` directory.

## Testing

Run tests with:
pnpm test

For UI testing:
pnpm run test:ui

## Linting and Formatting

- Check formatting: `pnpm run format:check`
- Fix formatting: `pnpm run format:fix`
- Lint code: `pnpm run lint`
- Fix linting issues: `pnpm run lint:fix`

## Version Management

We use [changesets](https://github.com/changesets/changesets) to manage versions and changelogs. If you're making a change, run:

pnpm changeset


Follow the prompts to describe your changes.

## CI/CD Setup

1. Run the setup script: `node setup.js`
2. Go to your GitHub repository settings and set up the following secrets:
   - GITHUB_TOKEN (automatically provided by GitHub)
   - Any other secrets required by your workflows
3. Review and customize the workflows in `.github/workflows` as needed
4. Push your changes to GitHub

After completing these steps, your CI/CD pipelines will be active for your project.

## WordPress Integration

This boilerplate can be integrated with WordPress using Pinegrow:

1. Open your project in Pinegrow
2. Edit HTML, CSS, and JS files within Pinegrow
3. Connect to WordPress: "Project" > "Connect to WordPress"
4. Use Pinegrow's WordPress features to add dynamic elements
5. Export your theme: "WordPress" > "Export Theme"

For detailed WordPress integration steps, refer to the Pinegrow documentation.

## Pinegrow Integration

This boilerplate is designed to work seamlessly with Pinegrow for visual editing and WordPress integration:

1. Open the project folder in Pinegrow.
2. Use Pinegrow's visual editor to modify HTML, CSS, and JS files.
3. Utilize Pinegrow's WordPress features for theme development.
4. When ready, use Pinegrow to export your WordPress theme.

For detailed Pinegrow usage instructions, refer to the Pinegrow documentation.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes
4. Run `pnpm changeset` to document your changes
5. Commit your changes: `git commit -am 'Add some feature'`
6. Push to the branch: `git push origin feature-branch-name`
7. Submit a pull request

Please ensure your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the ISC License.

