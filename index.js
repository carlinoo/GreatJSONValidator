"use strict";

const functions = require('./validator-functions');

// Function to check the schema
const schema_validator = (_schema, _data) => {
    let schema = _schema;
    let data = _data;

    switch (schema.type) {
        case 'string':
            if (schema.required) {
                return functions.isString(data);
            } else {
                return functions.isString(data) || functions.isUndefined(data);
            }





        case 'number':
            if (schema.required) {
                return functions.isNumber(data);
            } else {
                return functions.isNumber(data) || functions.isUndefined(data);
            }






        case 'boolean':
            if (schema.required) {
                return functions.isBoolean(data);
            } else {
                return functions.isBoolean(data) || functions.isUndefined(data);
            }






        case 'undefined':
            return functions.isUndefined(data);







        case 'null':
            if (schema.required) {
                return functions.isNull(data);
            } else {
                return functions.isNull(data) || functions.isUndefined(data);
            }






        case 'object':
            if (!schema.required && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return false;
            }
            
            if (!schema.required && functions.isUndefined(data)) {
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
                if (!schema_validator(schema.properties[properties[i]], data[properties[i]])) {
                    return false;
                }
            }

            return true;







        case 'array':
            if (!schema.required && (!functions.isArray(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if (!schema.required && functions.isUndefined(data)) {
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
            }
            
            return true;







        case 'array-object':
            if (!schema.required && (!functions.isObject(data)) && !functions.isUndefined(data)) {
                return false;
            }

            if (!schema.required && functions.isUndefined(data)) {
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
            }

            return true;


        default:
            return false;
    }
}



module.exports = schema_validator;