"use strict";

const functions = require('./validator-functions');

let DATA = null;
let SCHEMA = null;

const validator = (_schema, _data, _options) => {
    DATA = _data;
    SCHEMA = _schema;
    
    return schema_validator(_schema, _data);
}

// Function to check the schema
const schema_validator = (_schema, _data) => {
    let schema = _schema;
    let data = _data;


    switch (schema.type) {
        case 'string':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isString(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not a string` };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isString(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not a string` };
            }   

            // Valid options
            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not in valid_options` };
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not greater than` };
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not less than` };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not equal to` };
            }

            // Matches regex
            if (!functions.isUndefined(schema.matches) && (!data.match(schema.matches))) {
                return { error: true, success: false, error_message: `Validation failed: ${data} does not match regex` };
            }

            // ISO601 format
            if (!functions.isUndefined(schema.format) && schema.format == 'iso8601' && !(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/.test(data))) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not ISO8601 format` };
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `Validation failed: ${data} does not validate function` };
                }
            }


            return { error: false, success: true };




        case 'number':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isNumber(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not number` };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isNumber(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not number` };
            }

            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not in valid_options` };
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not greater than` };
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not less than` };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not equal to` };
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `Validation failed: ${data} is not in validate function` };
                }
            }


            return { error: false, success: true };






        case 'boolean':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isBoolean(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not boolean` };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isBoolean(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not boolean` };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not equal to` };
            }
            


            return { error: false, success: true };






        case 'undefined':
            return { error: !functions.isUndefined(data), success: functions.isUndefined(data), data: { field: schema } };







        case 'null':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isNull(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not null` };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isNull(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not null` };
            }


            return { error: false, success: true };






        case 'object':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not an object` };
            }
            
            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isObject(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not an object` };
            }
            

            let properties = functions.isUndefined(schema.properties) ? {} : Object.keys(schema.properties);
            
            if (!schema.additionalProperties && functions.arrayDiff(Object.keys(data), properties, false).length != 0) {
                return { error: true, success: false, error_message: `Validation failed: ${data} has additional properties` };
            }
            
            
            for (let i = 0; i < properties.length; i++) {
                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(properties[i], data[properties[i]], DATA)) {
                        return { error: true, success: false, error_message: `Validation failed: ${data} fails validateEach` };
                    }
                }

                let schema_validate = schema_validator(schema.properties[properties[i]], data[properties[i]]);

                if (schema_validate.error) {
                    return schema_validate;
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `Validation failed: ${JSON.stringify(data)} fails validate function` };
                }
            }

            return { error: false, success: true };







        case 'array':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isArray(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not array` };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isArray(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not array` };
            }

            let item_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < data.length; i++) {
                let schema_validate = schema_validator(item_schema, data[i]);

                if (schema_validate.error) {
                    return schema_validate;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(data[i], DATA)) {
                        return { error: true, success: false, error_message: `Validation failed: ${data} fails validateEach` };
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `Validation failed: ${data} fails validate function` };
                }
            }
            
            return { error: false, success: true };







        case 'array-object':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not array-object` };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isObject(data)) {
                return { error: true, success: false, error_message: `Validation failed: ${data} is not array-object` };
            }


            let attributes = Object.keys(data);
            let value_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < attributes.length; i++) {
                let schema_validate = schema_validator(value_schema, data[attributes[i]]);

                if (schema_validate.error) {
                    return schema_validate;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(attributes[i], data[attributes[i]], DATA)) {
                        return { error: true, success: false, error_message: `Validation failed: ${data} fails validateEach` };
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `Validation failed: ${data} fails validate function` };
                }
            }

            return { error: false, success: true };


        default:
            return { error: true, success: false, error_message: `Invalid data type` };
    }
}



module.exports = validator;