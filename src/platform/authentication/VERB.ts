import { NS } from './NS';

/**
 * @type {{FILE_UPLOAD: string, FILE_IMPORT: string, FILE_CREATE: string, FILE_GET: string, FILE_LIST: string, FILE_DOWNLOAD: string, FILE_DELETE: string, AV_TRANSCODE: string, AV_REPACKAGE: string, JOB_GET: string, JOB_SEARCH: string, ARCHIVE_CREATE: string, ARCHIVE_EXTRACT: string}}
 */
export const VERB = {
  FILE_UPLOAD: NS.SERVICE + 'file.upload',
  FILE_IMPORT: NS.SERVICE + 'file.import',
  FILE_CREATE: NS.SERVICE + 'file.create',
  FILE_GET: NS.SERVICE + 'file.get',
  FILE_LIST: NS.SERVICE + 'file.list',
  FILE_DOWNLOAD: NS.SERVICE + 'file.download',
  FILE_DELETE: NS.SERVICE + 'file.delete',

  AV_TRANSCODE: NS.SERVICE + 'av.transcode',
  AV_REPACKAGE: NS.SERVICE + 'av.repackage',

  JOB_GET: NS.SERVICE + 'job.get',
  JOB_SEARCH: NS.SERVICE + 'job.search',

  ARCHIVE_CREATE: NS.SERVICE + 'archive.create',
  ARCHIVE_EXTRACT: NS.SERVICE + 'archive.extract',
};
