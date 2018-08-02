import {Job} from './job';
import {JobManager} from '../job-manager';
import {IConfigurationBase} from '../../configuration/configuration';
import {IHTTPClient} from '../../http/http-client';
import * as Observable from 'zen-observable';
import {JobGroup} from './job-group';

export type CreateJob<T> = () => Promise<Job<T>>;
export type ObserveJob<T> = (createJob: CreateJob<T>, pollingInterval?: number) => Observable<Job<T>>;

// TODO: convert Job<any>[] to a more typed solution
// For this will need to move specifications to discriminated unions
export type CreateJobGroup = () => Promise<JobGroup>;
export type ObserveJobGroup = (createJobGroup: CreateJobGroup, pollingInterval?: number) => Observable<JobGroup>;

export function observeJobCreator<T>(configuration: IConfigurationBase, httpClient: IHTTPClient): ObserveJob<T> {
  const jobManager = new JobManager(configuration, httpClient);

  function observeJob<T>(createJob: CreateJob<T>, pollingInterval = 500): Observable<Job<T>> {
    return new Observable<Job<T>>(observer => {

      const pollJob = (updatedJob: Job<T>) => {
        if (updatedJob.isError()) {
          observer.error(updatedJob);
          return;
        }
        observer.next(updatedJob);
        if (updatedJob.isSuccess()) {
          observer.complete();
          return;
        }

        if (updatedJob.isWaiting()) {
          setTimeout(() => {
            fetchJob(updatedJob);
          }, pollingInterval);
        }
      };

      const onFailure = error => {
        observer.error(error);
      };

      function fetchJob(job: Job<T>) {
        jobManager.getJob<T>(job.id)
          .then(pollJob)
          .catch(onFailure);
      }

      createJob()
        .then(pollJob)
        .catch(onFailure);
    });
  }

  return observeJob;
}


export const observeJobGroupCreator = (configuration: IConfigurationBase, httpClient: IHTTPClient): ObserveJobGroup => {
  const jobManager = new JobManager(configuration, httpClient);

  return (createJobGroup: CreateJobGroup, pollingInterval = 500): Observable<JobGroup> => {
    return new Observable<JobGroup>(observer => {

      const pollJobGroup = (updatedJobGroup: JobGroup) => {
        if (updatedJobGroup.isError()) {
          observer.error(updatedJobGroup);
          return;
        }
        observer.next(updatedJobGroup);
        if (updatedJobGroup.isSuccess()) {
          observer.complete();
          return;
        }

        if (updatedJobGroup.isWaiting()) {
          setTimeout(() => {
            fetchJobGroup(updatedJobGroup);
          }, pollingInterval);
        }
      };

      const onFailure = error => {
        observer.error(error);
      };

      function fetchJobGroup(jobGroup: JobGroup) {
        jobManager.getJobGroup(jobGroup.groupId)
          .then(jobs => new JobGroup({
            groupId: jobGroup.groupId,
            jobs
          }))
          .then(pollJobGroup)
          .catch(onFailure);
      }

      createJobGroup()
        .then(pollJobGroup)
        .catch(onFailure);
    });
  };

};
