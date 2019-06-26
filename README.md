# GreatJSONValidator

### Install
```bash
npm install great-json-validator
```

###Example

```javascript
const validator = require('great-json-validator');

let schema = {
    type: 'object',
    additionalProperties: false,
    required: true,
    properties: {
        string: { type: 'string', required: true },
        number: { type: 'number', required: true },
        undefined: { type: 'undefined', required: true },
        null: { type: 'null', required: true },
        boolean: { type: 'boolean', required: true },
        object: {
            type: 'object',
            required: false,
            additionalProperties: true
        },
        array: { type: 'array', required: false, items: { type: 'string', required: false }},
        array_object: {
            required: true,
            type: 'array-object',
            items: {
                type: 'string',
                required: true
            }
        }
    }
}

let data = {
    string: 'string',
    number: 1,
    null: null,
    boolean: true,
    object: {
        number: 2
    },
    array: ['hi', 'hello', 'hey'],
    array_object: {
        'sdfnf': 'e',
        'wef': '3',
        'sdffwenf': '2',
        'sdsdfffnf': '1',
    }
};

console.log(validator(schema, data));
```
