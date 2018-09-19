---
layout: simple
---
The [Jobs API](https://support.wixmp.com/en/article/jobs) forms the basis for all long-running, asynchronous operations in Wix Media Platform.

> In order to query jobs in Wix Media Platform, your application needs to have a _[Permissions](https://support.wixmp.com/en/article/jobs#relevant-permission-settings)_
 that allows it to search and poll jobs.

## Job Lifecycle

A job is created by a service that performs a long running operation: archive creation and extraction, file import, video transcoding and video packaging.

1. When a job is created, it is queued for execution, and its status is initially set to 'pending'.
2. Once the job execution commences, the job status is updated to 'working'.
3. On job completion, the job status is updated to either 'success' or 'error', and the 'result' property is populated (prior to the job's completion, the 'result' field is null).

## `Job` Attributes
The Job object has the following properties:  
 
| Field Name   | Type           | Description                     |
|---------------|----------------| --------------------------------|
| id            | string         | Job ID                          |
| groupId       | string         | Job Group ID. Every job has its group ID - some groups only have one job in them|
| type          | string         | Job type, one of: urn:job:av.transcode, urn:job:av.package, urn:job:archive.create, urn:job:archive.extract, urn:job:import.file |
| issuer        | string         | Application ID of the job issuer                             |
| status        | string         | Job status, one of: pending, working, success, error |
| sources       | Array\<Source> | Job's source files. For example, a transcode job will have a video source file listed in its sources |
| specification | Specification  | Job-specific parameters, consties between different job types (see below)                          |
| result        | Result         | Job output, consties between different job types |
| dateCreated   | string         | Job's creation date in the following format: "2017-07-25T10:10:30Z" |
| dateUpdated   | string         | Time of the job's last update in the following format: "2017-07-25T10:29:50Z"|
 

 
## `Specification` - Job Specific Information
The job specification is the set of parameters of the API request that initiates the job. 
Each job type has a different set of parameters. Therefore, the Job's `Specficiation` attribute is automatically casted
 to a different type for each job type.

### `CreateArchiveSpecification`
The job's `Specification` is casted to this object when `job.type === urn:job:archive.create`.  

| Field Name   | Type           | Description                            |
|--------------|----------------| ---------------------------------------|
| sources      | Array\<Source> | A list of the files that were archived |
| destination  | Destination    | The directory to which the archive file is uploaded |
| archiveType  | string         | The archive file's extension           |

  
### `ExtractArchiveSpecification` 
The job's `Specification` is casted to this object when `job.type === urn:job:archive.extract`.  

| Field Name           | Type                 | Description                                           |
|----------------------|----------------------| ------------------------------------------------------|
| source               | Source               | The source archive file that is extracted             |
| destination          | Destination          | The destination path to which the files are extracted |
| extractedFilesReport | ExtractedFilesReport | The [extracted files report](extracted-files-report) (`null` if a report wasn't requested)           |



### `FileImportSpecification`
The job's `Specification` is casted to this object when `job.type === urn:job:import.file`.  

| Field Name   | Type        | Description                             |
|--------------|-------------| ----------------------------------------|
| sourceUrl    | string      | The URL from which the file is imported |
| destination  | Destination | The destination path to which the file is imported |


### `TranscodeSpecification`
> A trasncoding request results in multiple jobs - one for every requested quality.  

The job's `Specification` is casted to this object when `job.type === urn:job:av.transcode`.  

| Field Name   | Type         | Description                            |
|--------------|--------------| ---------------------------------------|
| destination  | Destination  | The directory in which the output video files are created |
| quality      | string       | The quality of the video, example: "720" |
| qualityRange | QualityRange | The quality range that was specified in the transcoding request |
| video        | Video        | The output video information           |
| audio        | Audio        | The output audio information           |

## Job Polling
You can track job either by getting a specific job or job group, searching for a job, or creating a [webhook](https://support.wixmp.com/en/article/about-webhooks).  

### Get Job
```typescript
jobManager.getJob<T = any>(jobId: string): Promise<Job<T>>
```

#### Parameters: 
- `jobId` (string): ID of the requested job.

returns Promise;  
  
### Get Job Group

```typescript
jobManager.getJobGroup<T = any>(groupId: string): Promise<Job<T>[]>
```

#### Parameters: 
- `jobGroupId` (string): ID of the requested job group.

returns Promise

### Search Jobs
You can search for jobs based on their issuer, file sources, type, status and more.  
Following is a code example - searching for all of the successful transcoding jobs in which the output was uploaded to /video/output/porcupines/.
 Below is the full reference.

```javascript
const searchJobsRequest = new SearchJobsRequest()
		.setPageSize(40)
		.setOrderBy("date")
		.descending()
		.setType("urn:job:av.transcode")
		.setStatus("success")
		.setPath("/video/output/porcupines/");

jobManager.searchJobs(searchJobsRequest)
  .then(
    searchJobsResponse => {
      console.log('job search successful: next token is ' + searchJobsResponse.nextPageToken);
      for (let x in searchJobsResponse.jobs) {
        // TODO: handle jobs
      }
    },
    error => {
      console.error('job search failed: ' + error.message);
      return Promise.reject(error);
    } 
);

```

#### `SearchJobsRequest` - Create the Search Request

```javascript
const searchJobsRequest = new SearchJobsRequest()
		.setPageSize(pageSize)
		.setOrderBy(orderBy)
		.ascending()        // or .descending()
		.setIssuer(issuer)
		.setType(type)
		.setStatus(status)
		.setGroupId(groupId)
		.setFileID(fileId)
		.setPath(path);
```


#### Parameters:
- `nextPageToken` (string): if this is not the first query with these parameters, you can get the nextPageToken from the previous request (see below in `SearchJobsResponse`).
- `pageSize` (integer): maximum number of jobs to appear in the response, defaults to 20.
- `orderBy` (string): whether to order the list by `"dateCreated"` or `"dateUpdated"`.  
- `issuer` (string): filter by application ID of the issuer.
- `type` (string): filter by one of the possible job types, as described above.
- `status` (string): filter by job status.
- `groupId` (string): filter by job group ID.
- `fileId` (string): filter by file ID of the job's file source.
- `path` (string): filter by path of the job's file sources.  

The _SearchJobsRequest_ is passed as a parameter to the `searchJobs` method.

#### `searchJobs()` - Send the Request

Once you have created a `SearchJobsRequest`, pass it as a parameter to the `searchJobs()` method:  
```typescript
jobManager.searchJobs(searchJobsRequest): Promise<SearchJobsResponse>
```

#### Parameters: 
- `searchJobsRequest` (SearchJobsRequest): the search request parameters, as described above.

returns Promise 

#### `SearchJobsResponse` - Handle the Response
The `SearchJobsResponse` object is passed to the resolved Promise. 
It includes the list of jobs that matched the query parameters and the query's next page token, if the number of results
 exceeds the page size.

| Field Name   | Type        | Description                             |
|--------------|-------------| ----------------------------------------|
| jobs    | Job[]            | The list of jobs that match the query parameters |
| nextPageToken  | string | The next page token, can be passed in the next request if the number of results exceeds the page size |


## Job Result
The job result is `null` as long as the job is not completed. 
On job completion, it's occupied with the job result's information, according to the job type.
A successful job's result structure is
```json
 {  
  "code": 0,
  "message": "OK",
  "payload": {
    // the payload object is specific to each job type
  }
}
```
 
[extracted-files-report]: /archive-files#extractedfilesreport---set-an-extracted-files-report
