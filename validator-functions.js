// Returns if a value is a string
module.exports = {
    isString(value) {
        return typeof value === 'string' || value instanceof String;
    },

    isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    },

    isArray(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    },

    isFunction(value) {
        return typeof value === 'function';
    },

    isObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    },

    isUndefined(value) {
        return typeof value === 'undefined';
    },

    isNull(value) {
        return value === null;
    },

    isBoolean(value) {
        return typeof value === 'boolean';
    },

    isRegExp(value) {
        return value && typeof value === 'object' && value.constructor === RegExp;
    },

    isDate(value) {
        return value instanceof Date;
    },

    // Returns the difference between two arrays
    arrayDiff(a1, a2, double_sided = true) {
        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                if (double_sided) {
                    a[a2[i]] = true;
                }
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    },

    schemaPathFinder(_schema, path) {
        let schema = _schema;

        if (path.length < 1) {
            return schema;
        }
        
        for (let i = 0; i < path.length; i++) {
            if (schema.type === "object") {
                if (!module.exports.isObject(schema.properties) || !schema.properties[path[i]]) {
                    throw new Error("Schema error");
                }

                schema = schema.properties[path[i]];

                continue;
            } else if (schema.type === "array") {
                if (!module.exports.isObject(schema.properties) || !schema.properties[path[i]]) {
                    throw new Error("Schema error");
                }
            }
        }
    }
} 
