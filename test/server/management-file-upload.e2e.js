/* global describe, it, before, beforeEach, afterEach */

'use strict';

const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const expect = require('expect.js');

const credentials = require('./credentials');

const MediaPlatform = require('../../src').MediaPlatform;

const DEFAULT_FIXTURE_PATH = path.join(__dirname, '..', 'sources', 'image.jpg');

describe('E2E > File Management > File Upload', function() {
    this.timeout(30000);

    before('init test object', function() {
        this.fileManager = new MediaPlatform(credentials).fileManager;
    });

    beforeEach('test unique path', function() {
        this.testPath = '/' + uuid.v4() + '.jpg';
    });

    afterEach('clean up after test', function(done) {
        this.fileManager.deleteFileByPath(this.testPath, () => done());
    });

    describe('data as string path', function() {

        it('should be uploaded correctly', function(done) {
            this.fileManager.uploadFile(this.testPath, DEFAULT_FIXTURE_PATH, null, (err, files) => {
                expect(err).to.be(null);
                expect(files).to.be.an('array');
                expect(files[0].path).to.eql(this.testPath);

                done();
            });
        });

    });

    describe('data as Buffer', function() {

        beforeEach('test buffer data', function() {
            this.testBuffer = fs.readFileSync(DEFAULT_FIXTURE_PATH);
        });

        it('should be uploaded correctly', function(done) {
            this.fileManager.uploadFile(this.testPath, this.testBuffer, null, (err, files) => {
                expect(err).to.be(null);
                expect(files).to.be.an('array');
                expect(files[0].path).to.eql(this.testPath);
                expect(files[0].size).to.eql(this.testBuffer.length);

                done();
            });
        });

    });

    describe('data as Stream', function() {

        beforeEach('test stream data', function() {
            this.testStream = fs.createReadStream(DEFAULT_FIXTURE_PATH);
        });

        it('should be uploaded correctly', function(done) {
            this.fileManager.uploadFile(this.testPath, this.testStream, null, (err, files) => {
                expect(err).to.be(null);
                expect(files).to.be.an('array');
                expect(files[0].path).to.eql(this.testPath);

                done();
            });
        });

    });

});
