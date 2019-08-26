# Fitness tracker with Xiaomi Miband2

## Prerequisites
Make sure that your machine have installed all of the stuff below
1. Node.js (v8.10.0+ prefered)
2. NPM (v6.10.3 prefered)
3. Python3
4. .env file (contact author to get environment vars)

## Installation
Download the source code from 

`https://github.com/nmtoan251998/fitness-tracker.git`

Or

``` javascript
$ git clone https://github.com/nmtoan251998/fitness-tracker.git

$ cd fitness-tracker

$ npm install
```

After the server installation, go next to the Miband2 hacking source code
``` javascript
$ cd src/utils

$ git clone https://github.com/nmtoan251998/miband2.git

$ cd miband2

$ pip install -r requirements.txt
```

### Error with npm audit
If you see error when installing npm packages as the below message
``` javascript
added 4 packages from 8 contributors and audited 15934 packages in 19.166s
found 2 vulnerabilities (1 low, 1 high)
run `npm audit fix` to fix them, or `npm audit` for details
```
All you have to do is just to run 

``` javasciprt
$ npm audit fix
```

## Available scripts
Run client on dev mode (create markup files)
``` javascript
$ npm run dev:client
```

Run server on dev mode
``` javascript
$ npm run dev:server
```

Build
``` javascript
$ npm run production
```

Start on production mode
``` javascript
$ npm run start
```

Test server APIs (unit test)
``` javascript
$ npm run test-coverage
```
