# Project Architecture
## Folder Hierarchy
- . (root)
    - .cache (parcel build)
    - .nyc_output (testing results)        
    - bin
        - production
    - dist         
    - docs
        - ARCHITECTURE.md
        - WORKPLACES.md
    - node_modules
    - src
        - api
            - controllers (C)
            - middlewares 
            - models (M)
            - routes (server routes)
            - tests (APIs testing)
        - assets
            - css
            - js
        - config (server configuration)
            - express.js
            - vars.js (.env variables)
        - views (V)
            - *.html
        - server.js (server main script)
    - .env (environment variable)
    - .babelrc (babel config)
    - .nycrc (nyc config)
    - README.md
## Naming Conventions
### Files name
1. Camel Case (fileName)
2. Domain-Driven-Development (fileName.controller | fileName.test)

### Variables name
1. Camel Case (varName)
#### Constant
1. UPPERCASE (CONSTANT)

### Classes name
1. Pascal Case (Person | Animal)