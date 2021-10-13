"use strict";

const functions = require('./validator-functions');

let DATA = null;
let SCHEMA = null;
let errors = [];

const pushError = (path, data, error_code, error_message) => {
    errors.push({ path, data, error_code, error_message });
}

const validator = (_schema, _data, _options = {}) => {
    DATA = _data;
    SCHEMA = _schema;

    let path = functions.isString(_data) ? 'string'
        : functions.isNumber(_data) ? 'number'
        : functions.isBoolean(_data) ? 'boolean'
        : functions.isUndefined(_data) ? 'undefined'
        : functions.isNull(_data) ? 'null'
        : functions.isObject(_data) ? 'object'
        : functions.isArray(_data) ? 'array' : 'unknown';

    let result = schema_validator(_schema, _data, _options, path);

    return { success: errors.length === 0 ? true : false, error: errors.length !== 0 ? true : false, errors: errors };
}

// Function to check the schema
const schema_validator = (_schema, _data, _options, _path) => {
    let schema = _schema;
    let data = _data;
    let path = _path;


    switch (schema.type) {
        case 'string':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isString(data)) && !functions.isUndefined(data)) {
                pushError(path, data, null, `${path} is not a string`);
                return { error: true, success: false };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isString(data)) {
                pushError(path, data, null, `${path} is not a string`);
                return { error: true, success: false };
            }   

            // Valid options
            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                pushError(path, data, null, `${path} is not in valid_options`);
                return { error: true, success: false };
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                pushError(path, data, null, `${path} is not greater than ${schema.greater_than}`);
                return { error: true, success: false };
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                pushError(path, data, null, `${path} is not less than ${schema.less_than}`);
                return { error: true, success: false };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                pushError(path, data, null, `${path} is not equal_to ${schema.equal_to}`);
                return { error: true, success: false };
            }

            // Matches regex
            if (!functions.isUndefined(schema.matches) && (!data.match(schema.matches))) {
                pushError(path, data, null, `${path} does not match regex`);
                return { error: true, success: false };
            }

            // ISO601 format
            if (!functions.isUndefined(schema.format) && schema.format == 'iso8601' && !(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/.test(data))) {
                pushError(path, data, null, `${path} is not ISO8601 format`);
                return { error: true, success: false };
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    pushError(path, data, null, `${path} does not validate function`);
                    return { error: true, success: false };
                }
            }


            return { error: false, success: true };




        case 'number':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isNumber(data)) && !functions.isUndefined(data)) {
                pushError(path, data, null, `${path} is not number`);
                return { error: true, success: false };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isNumber(data)) {
                pushError(path, data, null, `${path} is not number`);
                return { error: true, success: false };
            }

            if (!functions.isUndefined(schema.valid_options) && (!functions.isArray(schema.valid_options) || !schema.valid_options.includes(data))) {
                pushError(path, data, null, `${path} is not in valid_options`);
                return { error: true, success: false };
            }

            // Greater than
            if (!functions.isUndefined(schema.greater_than) && (data <= schema.greater_than)) {
                pushError(path, data, null, `${path} is not greater than ${schema.greater_than}`);
                return { error: true, success: false };
            }

            // Less than
            if (!functions.isUndefined(schema.less_than) && (data >= schema.less_than)) {
                pushError(path, data, null, `${path} is not less than ${schema.less_than}`);
                return { error: true, success: false };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                pushError(path, data, null, `${path} is not equal to ${schema.equal_to}`);
                return { error: true, success: false };
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    pushError(path, data, null, `${path} is not in validate function`);
                    return { error: true, success: false };
                }
            }


            return { error: false, success: true };






        case 'boolean':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isBoolean(data)) && !functions.isUndefined(data)) {
                pushError(path, data, null, `${path} is not boolean`);
                return { error: true, success: false };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isBoolean(data)) {
                pushError(path, data, null, `${path} is not boolean`);
                return { error: true, success: false };
            }

            // Equal to
            if (!functions.isUndefined(schema.equal_to) && (data !== schema.equal_to)) {
                pushError(path, data, null, `${path} is not equal to ${schema.equal_to}`);
                return { error: true, success: false };
            }
            


            return { error: false, success: true };






        case 'undefined':
            if (!functions.isUndefined(data)) {
                pushError(path, data, null, `${path} is not undefined`);
                return { error: true, success: false };
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
                pushError(path, data, null, `${path} is not an object`);
                return { error: true, success: false };
            }
            
            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isObject(data)) {
                pushError(path, data, null, `${path} is not an object`);
                return { error: true, success: false };
            }
            

            let properties = functions.isUndefined(schema.properties) ? {} : Object.keys(schema.properties);
            
            if (!schema.additionalProperties && functions.arrayDiff(Object.keys(data), properties, false).length != 0) {
                pushError(path, data, null, `${path} has additional properties`);
                return { error: true, success: false };
            }
            
            
            for (let i = 0; i < properties.length; i++) {
                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(properties[i], data[properties[i]], DATA)) {
                        pushError(path, data, null, `${path} fails validateEach`);
                        return { error: true, success: false };
                    }
                }

                let schema_validate = schema_validator(schema.properties[properties[i]], data[properties[i]], _options, `${path}.${properties[i]}`);

                // If we don't want to validate more than one option
                if (schema_validate.error && !_options.validateAllFields) {
                    return schema_validate;
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    pushError(path, data, null, `${path} fails validate function`);
                    return { error: true, success: false };
                }
            }

            return { error: false, success: true };







        case 'array':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isArray(data)) && !functions.isUndefined(data)) {
                pushError(path, data, null, `${path} is not array`);
                return { error: true, success: false };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isArray(data)) {
                pushError(path, data, null, `${path} is not array`);
                return { error: true, success: false };
            }

            let item_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < data.length; i++) {
                let schema_validate = schema_validator(item_schema, data[i], _options, `${path}[${i}]`);

                // If we don't want to validate more than one option
                if (schema_validate.error && !_options.validateAllFields) {
                    return schema_validate;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(data[i], DATA)) {
                        pushError(path, data, null, `${path} fails validateEach`);
                        return { error: true, success: false };
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    pushError(path, data, null, `${path} fails validate function`);
                    return { error: true, success: false };
                }
            }
            
            return { error: false, success: true };







        case 'array-object':
            if ((functions.isBoolean(schema.required) && !schema.required) && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                pushError(path, data, null, `${path} is not array-object`);
                return { error: true, success: false };
            }

            if ((functions.isBoolean(schema.required) && !schema.required) && functions.isUndefined(data)) {
                return { error: false, success: true };
            }

            if (!functions.isObject(data)) {
                pushError(path, data, null, `${path} is not array-object`);
                return { error: true, success: false };
            }


            let attributes = Object.keys(data);
            let value_schema = functions.isUndefined(schema.items) ? {} : schema.items;

            for (let i = 0; i < attributes.length; i++) {
                let schema_validate = schema_validator(value_schema, data[attributes[i]], _options, `${path}.${attributes[i]}`);

                // If we don't want to validate more than one option
                if (schema_validate.error && !_options.validateAllFields) {
                    return schema_validate;
                }

                // Function validate Each if passed
                if (!functions.isUndefined(schema.validateEach) && functions.isFunction(schema.validateEach)) {
                    if (!schema.validateEach(attributes[i], data[attributes[i]], DATA)) {
                        pushError(path, data, null, `${path} fails validateEach`);
                        return { error: true, success: false };
                    }
                }
            }

            // Function validate if passed
            if (!functions.isUndefined(schema.validate) && functions.isFunction(schema.validate)) {
                if (!schema.validate(data, DATA)) {
                    pushError(path, data, null, `${path} fails validate function`);
                    return { error: true, success: false };
                }
            }

            return { error: false, success: true };


        default:
            pushError(path, data, null, `${path}: Invalid data type`);
            return { error: true, success: false };
    }
}



module.exports = validator;