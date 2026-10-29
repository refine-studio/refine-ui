<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.png" />
  <img alt="Refine UI: Where Diamonds craft Diamonds. The design system for everything we build for ourselves." src=".github/assets/banner-light.png" />
</picture>

# 💎 Refine UI

Refine UI is the design system the Diamonds use to build internal tools: time trackers, voting bots, dashboards, admin panels, and the experiment you start on a Friday. It takes its look from [refine.studio](https://refine.studio), so every tool we build looks like it came from us.

**📖 Storybook:** [ui.refine.studio](https://ui.refine.studio). Sign in with a GitHub account in the `refine-studio` organisation to open it.

## 🎯 Why it exists

Refine UI is built for us first, so it is free to experiment. It has one brand and its own voice: the refine teal, heavy display type, gradients, glass, soft shadows, the hex field and the diamond mark. You get a solid set of everyday parts, so you can spend your time on the idea and not on another button.

## 📦 What is inside

| Area        | Holds                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------ |
| Foundations | Principles, logo, colour, type, shape and spacing, elevation, motion, light and dark mode, icons |
| Components  | About 45 building blocks: buttons, forms, dialogs, menus, tables, tabs, toasts and more          |
| Widgets     | Composed pieces such as App Shell, Command Menu and Page Header, plus full example screens       |
| Icons       | All of lucide, plus 463 extra icons drawn at lucide's line weight                                |

**Stack:** React 19 · Tailwind CSS 4 · Radix UI · class-variance-authority · lucide-react · Geist Sans and Geist Mono

## 🚀 Install it in another repo

Refine UI is published to GitHub Packages as `@refine-studio/ui`. Only members of the `refine-studio` organisation can install it.

### 1. Create a token

1. Open [GitHub → Settings → Developer settings → Personal access tokens (classic)](https://github.com/settings/tokens).
2. Create a token with the `read:packages` scope.
3. If the organisation uses single sign-on, select **Configure SSO** next to the token and authorise `refine-studio`.
4. Export the token in your shell profile:

   ```sh
   export GITHUB_TOKEN=ghp_your_token
   ```

### 2. Point the scope at GitHub Packages

Add an `.npmrc` next to your `package.json`. Commit it, because it holds no secret, only the variable name:

```ini
@refine-studio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 3. Install the package

```sh
pnpm add @refine-studio/ui
```

Your app needs React 19 and Tailwind CSS 4.

### 4. Import the styles

Import the stylesheet after Tailwind in your global stylesheet. It brings the tokens, the Geist fonts and the animations. It also registers the library's components as a Tailwind source, so you need no extra `@source` line.

```css
@import 'tailwindcss';
@import '@refine-studio/ui/styles.css';
```

### 5. Wrap the app and build

`ThemeProvider` sets light or dark mode on `<html>` and remembers the choice.

```tsx
import { Button, ThemeProvider } from '@refine-studio/ui';

export const App = () => {
  return (
    <ThemeProvider mode="system">
      <Button variant="gem">Ship it</Button>
    </ThemeProvider>
  );
};
```

### 6. Install in CI

In GitHub Actions, the built-in token can read the package. Give the job `packages: read`, and pass the token to the install step:

```yaml
permissions:
  contents: read
  packages: read

steps:
  - run: pnpm install --frozen-lockfile
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Grant your repo access to the package once. Open the package's settings under **Manage Actions access** and add your repository.

### Without the registry

You can also install straight from the repository with a pinned tag. The `prepack` script builds `dist` during the install:

```sh
pnpm add github:refine-studio/refine-ui#v0.1.0
```

## Theming in one breath

There is one brand: refine.studio's teal, zinc neutrals and the website's radii. Two knobs remain, and you can set each on `<html>` or on any subtree.

| Knob    | Values                                              |
| ------- | --------------------------------------------------- |
| Mode    | `.light`, `.dark`, `.on-gem`                        |
| Density | `data-density="compact \| comfortable \| spacious"` |

`ThemeProvider` and `useTheme` manage the document theme, `ThemeSwitcher` gives people a light/dark/system toggle, and `ThemeScope` re-themes a single subtree.

## Develop

```sh
pnpm install
pnpm dev              # Storybook on http://localhost:6006
pnpm test             # Vitest
pnpm typecheck && pnpm lint
pnpm build            # library → dist/
pnpm build-storybook  # static Storybook → storybook-static/
```

Every component lives in `src/components/<name>/` next to its stories. The tokens live in `src/styles/refine-ui.css`. When you add a custom utility or token, also register it in `src/lib/cn.ts` so `tailwind-merge` resolves conflicts with it.

## Release

1. Bump `version` in `package.json`.
2. Tag the commit with `vX.Y.Z` and push the tag.

The `Release` workflow publishes the package to GitHub Packages and creates a GitHub release. Pushing to `main` redeploys Storybook to [ui.refine.studio](https://ui.refine.studio) through GitHub Pages.
