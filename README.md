# React + TypeScript + Vite

================
IMPORTANT! INSTALL TO RUN: REACT ROUTER DOM
  > npm install react-router-dom
================
  > npm run dev; "o" + enter
================

                       < ---WORK IN PROGRESS.--- >

      Current Progress:
      - pseudo database
      - CRUD function commands
================
- Final Functions should be:
  1. Access Control (NO PASSWORDS; TOO TIME CONSUMING TO DEVELOP) (seperate pages for suppliers and managers)
  2. Listings of Managers, Suppliers, and Storage
  3. Adding/Removing/Updating Storage Items and their details
  4. AI chatbot based on current inventory
    (how many are left, what should be stocked next, what supplier, etc.)(?)
================
- Initial storage data is in ../data/database.ts
  > App.tsx will read the initial data from this file and make a copy via useState
  > No actual back end, sadly

- For temporary demonstration purposes on showing suppliers,
 items, and manager list(and their requirements): 
    go to <localhost>: / | /items | /managers | /suppliers | /items/new | /managers/new | /suppliers/new
===============

  NOTE: FILES THAT ARE NOT NEEDED: /types/index.ts
                                      > Only used as a reference at this point.


























///////////////////////////////////////////////////////////////////////////////////////////////////////////////
This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
