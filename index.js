"use strict";

const functions = require('./validator-functions');

let DATA = null;
let SCHEMA = null;
let errors = [];

const pushError = (path, error) => {
    errors.push({ path, error });
}

const validator = (_schema, _data, _options) => {
    DATA = _data;
    SCHEMA = _schema;

    let path = functions.isString(_data) ? 'string'
        : functions.isNumber(_data) ? 'number'
        : functions.isBoolean(_data) ? 'boolean'
        : functions.isUndefined(_data) ? 'undefined'
        : functions.isNull(_data) ? 'null'
        : functions.isObject(_data) ? 'object'
        : functions.isArray(_data) ? 'array' : 'unknown';

    return schema_validator(_schema, _data, path, pushError);
}

// Function to check the schema
const schema_validator = (_schema, _data, _path, addError) => {
    let schema = _schema;
    let data = _data;
    let path = _path;


    switch (schema.type) {
        case 'string':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isString(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `${path} is not a string`, path: path };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isString(data)) {
                return { error: true, success: false, error_message: `${path} is not a string`, path: path };
            }   

            // Valid options
            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                return { error: true, success: false, error_message: `${path} is not in valid_options`, path: path };
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                return { error: true, success: false, error_message: `${path} is not greater than`, path: path };
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                return { error: true, success: false, error_message: `${path} is not less than`, path: path };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return { error: true, success: false, error_message: `${path} is not equal to`, path: path };
            }

            // Matches regex
            if (!functions.isUndefined(schema.matches) && (!data.match(schema.matches))) {
                return { error: true, success: false, error_message: `${path} does not match regex`, path: path };
            }

            // ISO601 format
            if (!functions.isUndefined(schema.format) && schema.format == 'iso8601' && !(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/.test(data))) {
                return { error: true, success: false, error_message: `${path} is not ISO8601 format`, path: path };
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `${path} does not validate function`, path: path };
                }
            }


            return { error: false, success: true };




        case 'number':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isNumber(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `${path} is not number`, path: path };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isNumber(data)) {
                return { error: true, success: false, error_message: `${path} is not number`, path: path };
            }

            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                return { error: true, success: false, error_message: `${path} is not in valid_options`, path: path };
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                return { error: true, success: false, error_message: `${path} is not greater than ${schema.greater_than}`, path: path };
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                return { error: true, success: false, error_message: `${path} is not less than ${schema.less_than}`, path: path };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return { error: true, success: false, error_message: `${path} is not equal to ${schema.equal_to}`, path: path };
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `${path} is not in validate function`, path: path };
                }
            }


            return { error: false, success: true };






        case 'boolean':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isBoolean(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `${path} is not boolean`, path: path };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isBoolean(data)) {
                return { error: true, success: false, error_message: `${path} is not boolean`, path: path };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                return { error: true, success: false, error_message: `${path} is not equal to`, path: path };
            }
            


            return { error: false, success: true };






        case 'undefined':
            if (!functions.isUndefined(data)) {
                return { error: true, success: false, path: path };
            }



            return { error: false, success: true };



        case 'null':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isNull(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `${path} is not null`, path: path };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isNull(data)) {
                return { error: true, success: false, error_message: `${path} is not null`, path: path };
            }


            return { error: false, success: true };






        case 'object':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `${path} is not an object`, path: path };
            }
            
            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isObject(data)) {
                return { error: true, success: false, error_message: `${path} is not an object`, path: path };
            }
            

            let properties = functions.isUndefined(schema.properties) ? {} : Object.keys(schema.properties);
            
            if (!schema.additionalProperties && functions.arrayDiff(Object.keys(data), properties, false).length != 0) {
                return { error: true, success: false, error_message: `${path} has additional properties`, path: path };
            }
            
            
            for (let i = 0; i < properties.length; i++) {
                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(properties[i], data[properties[i]], DATA)) {
                        return { error: true, success: false, error_message: `${path} fails validateEach`, path: path };
                    }
                }

                let schema_validate = schema_validator(schema.properties[properties[i]], data[properties[i]], `${path}.${properties[i]}`);

                if (schema_validate.error) {
                    return schema_validate;
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `Validation failed: ${JSON.stringify(data)} fails validate function`, path: path };
                }
            }

            return { error: false, success: true };







        case 'array':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isArray(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `${path} is not array`, path: path };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isArray(data)) {
                return { error: true, success: false, error_message: `${path} is not array`, path: path };
            }

            let item_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < data.length; i++) {
                let schema_validate = schema_validator(item_schema, data[i], `${path}[${i}]`);

                if (schema_validate.error) {
                    return schema_validate;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(data[i], DATA)) {
                        return { error: true, success: false, error_message: `${path} fails validateEach`, path: path };
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `${path} fails validate function`, path: path };
                }
            }
            
            return { error: false, success: true };







        case 'array-object':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return { error: true, success: false, error_message: `${path} is not array-object`, path: path };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isObject(data)) {
                return { error: true, success: false, error_message: `${path} is not array-object`, path: path };
            }


            let attributes = Object.keys(data);
            let value_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < attributes.length; i++) {
                let schema_validate = schema_validator(value_schema, data[attributes[i]], `${path}.${attributes[i]}`);

                if (schema_validate.error) {
                    return schema_validate;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(attributes[i], data[attributes[i]], DATA)) {
                        console.log(attributes[i])
                        return { error: true, success: false, error_message: `${path} fails validateEach`, path: path };
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    return { error: true, success: false, error_message: `${path} fails validate function`, path: path };
                }
            }

            return { error: false, success: true };


        default:
            return { error: true, success: false, error_message: `Invalid data type`, path: path };
    }
}



module.exports = validator;