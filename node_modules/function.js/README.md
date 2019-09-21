# function.js

Functional programming just easier - for npm and bower

## How to use?

### Using npm

``` bash
npm i -S function.js
```

``` javascript
const fn = require("function.js");
```

### Using bower

``` bash
bower i -S function.js
```

``` html
<script src="bower_components/function.js/build/function.js"></script>
```

### Start coding

``` javascript
const sum = (a, b, c, d) => a + b + c + d;

const curried = fn.curry(sum);
const uncurried = fn.uncurry(curried);

curried(1)(2)(3)(4); // 10
uncurried(1, 2, 3, 4); // 10
```

Complete documentation can be found [here](https://github.com/stefanwimmer128/function.js/blob/master/docs/fn.md).
