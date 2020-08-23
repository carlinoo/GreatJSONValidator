"use strict";

const functions = require('./validator-functions');

// Function to check the schema
const schema_validator = (_schema, _data) => {
    let schema = _schema;
    let data = _data;

    switch (schema.type) {
        case 'string':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isString(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return true;
            }

            if (!functions.isString(data)) {
                return false;
            }   

            // Valid options
            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                return false;
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                return false;
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                return false;
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return false;
            }

            // Matches regex
            if (!functions.isUndefined(schema.matches) && (!data.match(schema.matches))) {
                return false;
            }

            // ISO601 format
            if (!functions.isUndefined(schema.format) && schema.format == 'iso8601' && !(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/.test(data))) {
                return false;
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data)) {
                    return false;
                }
            }


            return true;




        case 'number':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isNumber(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return true;
            }

            if (!functions.isNumber(data)) {
                return false;
            }

            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                return false;
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                return false;
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                return false;
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return false;
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data)) {
                    return false;
                }
            }


            return true;






        case 'boolean':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isBoolean(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return true;
            }

            if (!functions.isBoolean(data)) {
                return false;
            }
            


            return true;






        case 'undefined':
            return functions.isUndefined(data);







        case 'null':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isNull(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return true;
            }

            if (!functions.isNull(data)) {
                return false;
            }


            return true;






        case 'object':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return false;
            }
            
            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return true;
            }

            if (!functions.isObject(data)) {
                return false;
            }
            

            let properties = functions.isUndefined(schema.properties) ? {} : Object.keys(schema.properties);
            
            if (!schema.additionalProperties && functions.arrayDiff(Object.keys(data), properties, false).length != 0) {
                return false;
            }
            
            
            for (let i = 0; i < properties.length; i++) {
                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(properties[i], data[properties[i]])) {
                        return false;
                    }
                }

                if (!schema_validator(schema.properties[properties[i]], data[properties[i]])) {
                    return false;
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data)) {
                    return false;
                }
            }

            return true;







        case 'array':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isArray(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return true;
            }

            if (!functions.isArray(data)) {
                return false;
            }

            let item_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < data.length; i++) {
                if (!schema_validator(item_schema, data[i])) {
                    return false;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(data[i])) {
                        return false;
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data)) {
                    return false;
                }
            }
            
            return true;







        case 'array-object':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return true;
            }

            if (!functions.isObject(data)) {
                return false;
            }


            let attributes = Object.keys(data);
            let value_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < attributes.length; i++) {
                if (!schema_validator(value_schema, data[attributes[i]])) {
                    return false;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(attributes[i], data[attributes[i]])) {
                        return false;
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data)) {
                    return false;
                }
            }

            return true;


        default:
            return false;
    }
}



module.exports = schema_validator;