estraverse-jsx
==============

#### _estraverse-fb fork without Flow_

Drop-in for estraverse that enables traversal over JSX nodes using monkey-patching technique.

You can use estraverse-jsx in two possible ways:

* by default, you just require it and it injects needed keys into your installed version of estraverse (it's installed automatically if you don't have it yet):
    ```javascript
    const estraverse = require('estraverse-jsx');
    /* same as:
        require('estraverse-fb');
        const estraverse = require('estraverse');
    */

    estraverse.traverse(ast, {
        enter: ...,
        leave: ...
    });
    ```

* alternatively, you can use it manually for selected traversals:
    ```javascript
    const jsxKeys = require('estraverse-jsx/keys');

    estraverse.traverse(ast, {
        enter: ...,
        leave: ...,
        keys: jsxKeys
    })
```

Check out [estraverse page](https://github.com/Constellation/estraverse) for detailed usage.
