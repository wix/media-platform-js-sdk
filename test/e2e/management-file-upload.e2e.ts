/* global describe, it, before, beforeEach, afterEach */

'use strict';

import {expect} from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

import {MediaPlatform} from '../../src/main';
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
    this.fileManager.deleteFileByPath(this.testPath)
      .then(() => done());
  });

  describe('data as string path', function () {

    it('should be uploaded correctly', function (done) {
      this.fileManager.uploadFile(this.testPath, DEFAULT_FIXTURE_PATH)
        .then(files => {
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
      this.fileManager.uploadFile(this.testPath, this.testBuffer)
        .then(files => {
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
      this.fileManager.uploadFile(this.testPath, this.testStream)
        .then(files => {
          expect(files).to.be.an('array');
          expect(files[0].path).to.equal(this.testPath);

          done();
        });
    });

  });

});
