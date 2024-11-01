<h1 align="center">Receitalhada</h1>

<h3 align="center">Tecnologias Utilizadas:</h3>

<div align="center">

  <img src="https://skillicons.dev/icons?i=vscode" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=react" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=vite" height="40" alt="vite logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=tailwind" height="40" alt="tailwind logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=bun" height="40" alt="bun logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=typescript" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=jest" height="40" alt="jest logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=mysql" height="40" alt="mysql logo"  />

</div>

<br>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
