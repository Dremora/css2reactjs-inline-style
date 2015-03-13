'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var css2js = require('..');

function linesFrom(filename) {
    return wholeFile(filename).split('\n')
}

function wholeFile(filename) {
    return fs.readFileSync(__dirname + '/' + filename, {encoding: 'UTF-8'})
}

describe('css2js', function () {
    it('is a function', function () {
        expect(css2js).to.be.a.function;
    });
    describe('example.css line-by-line', function () {
        var cssLines = linesFrom('example.css');
        var expectedLines = linesFrom('example.expected-output');
        cssLines.forEach(function (cssLine, i) {
            var expectedLine = (expectedLines[i]).replace(/,$/, '');
            it(cssLine + '  ==>  ' + expectedLine, function () {
                expect(css2js(cssLine)).to.equal(expectedLine);
            });
        });
    });
    describe('example.css whole file', function () {
        var css = wholeFile('example.css');
        var expected = wholeFile('example.expected-output');
        it('\n' + css + '\n\n     ==>\n\n' + expected, function () {
            expect(css2js(css)).to.equal(expected);
        });
    });
});