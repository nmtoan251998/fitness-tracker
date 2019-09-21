# function.js Documentation

<a name="fn"></a>

## fn
function.js namespace

**Kind**: global constant  
**Author:** Stefan Wimmer <stefanwimmer128@gmail.com>  

* [fn](#fn)
    * [.curry(func)](#fn.curry) ⇒ <code>function</code>
    * [.uncurry(curried)](#fn.uncurry) ⇒ <code>function</code>
    * [.bind(fn, args, thisArg)](#fn.bind) ⇒ <code>function</code>
    * [.compose(...func)](#fn.compose) ⇒ <code>function</code>
    * [.map(func)](#fn.map) ⇒ <code>function</code>
    * [.filter(func)](#fn.filter) ⇒ <code>function</code>
    * [.find(func)](#fn.find) ⇒ <code>function</code>
    * [.findIndex(func)](#fn.findIndex) ⇒ <code>function</code>
    * [.reject(func)](#fn.reject) ⇒ <code>function</code>
    * [.reduce(func)](#fn.reduce) ⇒ <code>function</code>
    * [.pluck(arr, [key])](#fn.pluck) ⇒ <code>Array</code> &#124; <code>function</code>
    * [.each(func)](#fn.each) ⇒ <code>function</code>
    * [.every(func)](#fn.every) ⇒ <code>function</code>
    * [.some(func)](#fn.some) ⇒ <code>function</code>
    * [.sum(arr)](#fn.sum) ⇒ <code>Number</code>
    * [.version()](#fn.version) ⇒ <code>String</code>

<a name="fn.curry"></a>

### fn.curry(func) ⇒ <code>function</code>
Curries function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Curried function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Function to curry |

<a name="fn.uncurry"></a>

### fn.uncurry(curried) ⇒ <code>function</code>
Just the opposite of fn.curry

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Uncurried function  

| Param | Type | Description |
| --- | --- | --- |
| curried | <code>function</code> | Curried function to uncurry |

<a name="fn.bind"></a>

### fn.bind(fn, args, thisArg) ⇒ <code>function</code>
Binds function to custom "this" with arguments

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Bound function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to bind |
| args | <code>Array</code> | Arguments to bind |
| thisArg | <code>Object</code> | this to bind to |

<a name="fn.compose"></a>

### fn.compose(...func) ⇒ <code>function</code>
Composes functions

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Composed function  

| Param | Type | Description |
| --- | --- | --- |
| ...func | <code>function</code> | Functions to compose |

<a name="fn.map"></a>

### fn.map(func) ⇒ <code>function</code>
Curried Array.prototype.map function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to map  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.filter"></a>

### fn.filter(func) ⇒ <code>function</code>
Curried Array.prototype.filter function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to filter  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.find"></a>

### fn.find(func) ⇒ <code>function</code>
Curried Array.prototype.find function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to find  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.findIndex"></a>

### fn.findIndex(func) ⇒ <code>function</code>
Curried Array.prototype.findIndex function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to findIndex  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.reject"></a>

### fn.reject(func) ⇒ <code>function</code>
Curried Array.prototype.reject function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to reject  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.reduce"></a>

### fn.reduce(func) ⇒ <code>function</code>
Curried Array.prototype.reduce function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the starting point and then the Array to reduce  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.pluck"></a>

### fn.pluck(arr, [key]) ⇒ <code>Array</code> &#124; <code>function</code>
pluck extracts a specific "key" from all objects within the array.

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>Array</code> &#124; <code>function</code> - Returns array with all extracted values if all parameters are given, if not a function which takes the key argument is returned  

| Param | Type | Description |
| --- | --- | --- |
| arr |  | Array to pluck |
| [key] | <code>String</code> | (Optional) Key for extraction |

<a name="fn.each"></a>

### fn.each(func) ⇒ <code>function</code>
Curried Array.prototype.forEach function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to forEach  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.every"></a>

### fn.every(func) ⇒ <code>function</code>
Curried Array.prototype.every function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to every  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.some"></a>

### fn.some(func) ⇒ <code>function</code>
Curried Array.prototype.some function

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>function</code> - Function that takes the Array to some  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback function |

<a name="fn.sum"></a>

### fn.sum(arr) ⇒ <code>Number</code>
Calculate sum of all numbers in the Array

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>Number</code> - Calculated sum  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | Array to calculate sum of |

<a name="fn.version"></a>

### fn.version() ⇒ <code>String</code>
function.js version

**Kind**: static method of <code>[fn](#fn)</code>  
**Returns**: <code>String</code> - function.js version  
