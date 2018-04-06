# Job
## Attributes

| Field Name   | Type           | Description                     |
|---------------|----------------| --------------------------------|
| id            | string         | Job ID                          |
| groupId       | string         | Job Group ID. Every job has its group ID - some groups only have one job in them|
| type          | string         | Job type, one of: urn:job:av.transcode, urn:job:av.package, urn:job:archive.create, urn:job:archive.extract, urn:job:import.file |
| issuer        | string         | Application ID of the job issuer                             |
| status        | string         | Job status, one of: pending, working, success, error |
| sources       | [Source[]][source] | Job's source files. For example, a transcode job will have a video source file listed in its sources |
| specification | Specification  | Job-specific parameters, varies between different job types (see below)  |
| result        | Result         | Job output, varies between different job types |
| dateCreated   | string         | Job's creation date in the following format: "2017-07-25T10:10:30Z" |
| dateUpdated   | string         | Time of the job's last update in the following format: "2017-07-25T10:29:50Z"|

> This object has no public methods.


# Job Specification Objects


## CreateArchiveSpecification
### Attributes

| Field Name  | Type           | Description                     |
|-------------|----------------| --------------------------------|
| sources     | [Source[]][source] | List of files to be archived |
| destination | [Destination][destination]| The directory to which the archive file will be uploaded |
| archiveType | string         | One of the valid file extensions: zip, tar, tar.gz , or tar.bz2 |

> This object has no public methods.

## ExtractArchiveSpecification
### Attributes

| Field Name  | Type           | Description                     |
|-------------|----------------| --------------------------------|
| source     | [Source][source] | The source archive file to be extracted|
| destination | [Destination][destination]| The directory to which the extracted files will be uploaded |

> This object has no public methods.

## FileImportSpecification
### Attributes

| Field Name  | Type        | Description                     |
|-------------|-------------| --------------------------------|
| sourceUrl   | string      | The external URL to import the file from |
| destination | [Destination][destination] | The directory to which the imported file will be uploaded |

> This object has no public methods.

[source]: /api-reference#source
[destination]: /api-reference#destination
