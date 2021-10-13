# GreatJSONValidator

### Install
```bash
npm install great-json-validator
```

### Example
Let's see an example with all the data types and all use cases, so that you can see how powerful and easy this validator is:
```javascript
const validator = require('great-json-validator');

let schema = {
    type: 'object',
    additionalProperties: false,
    required: true,
    properties: {
        string: { type: 'string', required: true, format: "iso8601", validate(data) { return true; } },
        string2: { type: 'string', matches: /\d-(?:days|weeks|months|years)/},
        string3: { type: 'string', matches: /^y[1-5]m[1-9](?:[0-2])?$/ },
        number: { type: 'number', required: true, less_than: 10, greater_than: 1, equal_to: 9 },
        undefined: { type: 'undefined', required: true },
        null: { type: 'null', required: true },
        boolean: { type: 'boolean', required: true },
        object: {
            type: 'object',
            additionalProperties: true,
            required: false,
            validate(data, allData) {
                return true;
            },

            validateEach(key, value) {
                return true;
            },
            properties: { number: { type: 'number', required: true }}
        },
        array: { type: 'array', items: { type: 'string', required: false }},
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
    string: "2019-06-26T20:06:18.658Z",
    string2: "12323-days",
    undefined: undefined,
    string3: "y1m9",
    number: 20,
    null: null,
    boolean: true,
    object: {
        number: 2
    },
    array: ['hi', 'hello', 'hey', 2],
    array_object: {
        'item1': 1,
        'item2': '2',
        'item3': '3',
        'item4': '4',
    }
};

console.log(validator(schema, data, { validateAllFields: true }));
```
If you don't care what the errors are or how many there are, we recommend turning off `validateAllFields`, it will stop once it finds an error and don't waste time validate the rest of fields. 

This will log the following information:
```json
{
  "success": false,
  "error": true,
  "errors": [
    {
      "path": "object.number",
      "data": 20,
      "error_code": null,
      "error_message": "object.number is not less than 10"
    },
    {
      "path": "object.array[3]",
      "data": 2,
      "error_code": null,
      "error_message": "object.array[3] is not a string"
    },
    {
      "path": "object.array_object.item1",
      "data": 1,
      "error_code": null,
      "error_message": "object.array_object.item1 is not a string"
    }
  ]
}
```