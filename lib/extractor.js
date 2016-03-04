"use strict";

const TransformStream = require('stream').Transform;

const EXTRACTION_REGEXP = /(\w+)='(.*?)'/g;

class Extractor extends TransformStream {
    constructor(keys) {
        super();
        this.keys = keys;
    }

    _transform (chunk, encoding, callback) {
        const chunkString = chunk.toString(encoding !== 'buffer' ? encoding : null);
        const entries = this.extractFrom(chunkString);

        const values = [];
        this.keys.forEach(function (key) {
            const value = entries[key];
            if (value) {
                values.push("'" + value + "'");
            }
        });

        callback(null, values.join(' ') + '\n');
    }

    extractFrom(string) {
        const entries = {};
        let result;

        while (result = EXTRACTION_REGEXP.exec(string)) {
            entries[result[1]] = result[2];
        }

        return entries;
    }
}

module.exports = Extractor;
