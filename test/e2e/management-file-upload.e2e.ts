/* global describe, it, before, beforeEach, afterEach */

import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

import { MediaPlatform } from '../../src/server';
import { credentials } from '../server/credentials';

const DEFAULT_FIXTURE_PATH = path.join(__dirname, '..', 'sources', 'image.jpg');
const DEFAULT_PATH_PREFIX = '/test/';

describe('E2E > File Management > File Upload', function() {
  let fileManager;
  let testPath;

  // tslint:disable-next-line
  this.timeout(30000);

  before('init test object', () => {
    fileManager = new MediaPlatform(credentials).fileManager;
  });

  beforeEach('test unique path', () => {
    testPath = `${DEFAULT_PATH_PREFIX}${uuid.v4()}.jpg`;
  });

  afterEach('clean up after test', done => {
    fileManager.deleteFileByPath(testPath).then(() => done());
  });

  describe('data as string path', () => {
    it('should be uploaded correctly', done => {
      fileManager.uploadFile(testPath, DEFAULT_FIXTURE_PATH).then(files => {
        expect(files).to.be.an('array');
        expect(files[0].path).to.equal(testPath);

        done();
      });
    });
  });

  describe('data as Buffer', () => {
    let testBuffer;

    beforeEach('test buffer data', () => {
      testBuffer = fs.readFileSync(DEFAULT_FIXTURE_PATH);
    });

    it('should be uploaded correctly', done => {
      fileManager.uploadFile(testPath, testBuffer).then(files => {
        expect(files).to.be.an('array');
        expect(files[0].path).to.equal(testPath);
        expect(files[0].size).to.equal(testBuffer.length);

        done();
      });
    });
  });

  describe('data as Stream', () => {
    let testStream;

    beforeEach('test stream data', () => {
      testStream = fs.createReadStream(DEFAULT_FIXTURE_PATH);
    });

    it('should be uploaded correctly', done => {
      fileManager.uploadFile(testPath, testStream).then(files => {
        expect(files).to.be.an('array');
        expect(files[0].path).to.equal(testPath);

        done();
      });
    });
  });
});
