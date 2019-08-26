import * as _ from 'underscore';

// test import ES6 syntax
const test = _.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });

console.log({ test });