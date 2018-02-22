/* global describe, it, before, beforeEach, afterEach */

'use strict';

import path from 'path';
import fs from 'fs';
import uuid from 'uuid';
import {expect} from 'chai';
import {MediaPlatform} from '../../src';
import {credentials} from '../server/credentials';

const DEFAULT_FIXTURE_PATH = path.join(__dirname, '..', 'sources', 'image.jpg');
const DEFAULT_PATH_PREFIX = '/test/';

describe('E2E > File Management > File Upload', function () {
  this.timeout(30000);

  before('init test object', function () {
    this.fileManager = new MediaPlatform(credentials).fileManager;
  });

  beforeEach('test unique path', function () {
    this.testPath = DEFAULT_PATH_PREFIX + uuid.v4() + '.jpg';
  });

  afterEach('clean up after test', function (done) {
    this.fileManager.deleteFileByPath(this.testPath, () => done());
  });

  describe('data as string path', function () {

    it('should be uploaded correctly', function (done) {
      this.fileManager.uploadFile(this.testPath, DEFAULT_FIXTURE_PATH, null, (err, files) => {
        expect(err).to.equal(null);
        expect(files).to.be.an('array');
        expect(files[0].path).to.equal(this.testPath);

        done();
      });
    });

  });

  describe('data as Buffer', function () {

    beforeEach('test buffer data', function () {
      this.testBuffer = fs.readFileSync(DEFAULT_FIXTURE_PATH);
    });

    it('should be uploaded correctly', function (done) {
      this.fileManager.uploadFile(this.testPath, this.testBuffer, null, (err, files) => {
        expect(err).to.equal(null);
        expect(files).to.be.an('array');
        expect(files[0].path).to.equal(this.testPath);
        expect(files[0].size).to.equal(this.testBuffer.length);

        done();
      });
    });

  });

  describe('data as Stream', function () {

    beforeEach('test stream data', function () {
      this.testStream = fs.createReadStream(DEFAULT_FIXTURE_PATH);
    });

    it('should be uploaded correctly', function (done) {
      this.fileManager.uploadFile(this.testPath, this.testStream, null, (err, files) => {
        expect(err).to.equal(null);
        expect(files).to.be.an('array');
        expect(files[0].path).to.equal(this.testPath);

        done();
      });
    });

  });

});
