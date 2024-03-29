const validator = require('./index');

//

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