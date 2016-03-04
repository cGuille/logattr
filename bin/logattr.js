#!/usr/bin/env node

'use strict';

const LineStream = require('byline').LineStream;
const Extractor = require('../lib/extractor');

process.stdout.on('error', function (error) {
    if (error.code === 'EPIPE') {
        process.exit(0);
    }
    throw error;
});

process.stdin
  .pipe(new LineStream())
  .pipe(new Extractor(process.argv))
  .pipe(process.stdout);
