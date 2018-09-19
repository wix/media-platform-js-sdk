[Archive API Documentation](https://support.wixmp.com/en/article/archive-service)

> In order to create and extract archive files, your application needs to have a _[Permission](https://support.wixmp.com/en/article/archive-service#relevant-permission-settings)_
 that allows it to upload files to the destination directory, as well as manage archive files.

## Create Archive

WixMP supports archiving multiple files to a single file of one of the following formats:
zip, tar, tar.gz , or tar.bz2.  

### Create Archive Code Example
The following code example shows all the steps required for creating an archive file. 
Below you'll find a step-by-step guide. 
```javascript
var CreateArchiveRequest = require("media-platform-js-sdk").archive.CreateArchiveRequest;

var createArchiveRequest = new CreateArchiveRequest()
                    .setSources(sources)
                    .addSource(new Source().setFileId("file-id"))
                    .setDestination(new Destination().setPath("/fish/file.zip").setAcl("public"))
                    .setArchiveType("zip");

mediaPlatform.archiveManager.createArchive(createArchiveRequest);
```

### `Source` - Set Archive Source Files
The files that you wish to archive can be represented by either their file ID or their path. 
Create an array of `Source` and add the files you wish to archive to the list, as follows:

```javascript
var sources = [];

sources.push(new Source().setFileId(fileId));
sources.push(new Source().setPath(path));
//...
```
__Parameters__:
- `fileId` (string) - the file ID of a file you wish to add to the archive.
- `path` (string) - the path of the file you wish to add to the archive (example: `"/this/file.txt"`).  

### `Destination` - Set the Archive File's Destination
Define the directory to which the archive file will be uploaded, and whether it is private or public.

```javascript
var destination = new Destination()
        .setDirectory(directory)
        .setAcl(acl);
```
__Parameters__:
- `directory` (string) - the destination directory (example: `"/to/here/"`).  
- `acl` (string) - can be either `"public"` or `"private"`.


### `CreateArchiveRequest` - Create the Archive Request
Now create a _createArchiveRequest_, that will be passed as a parameter to the `createArchive` method later.

```javascript
var createArchiveRequest = new CreateArchiveRequest()
        .setSources(sources)
        .addSource(source)
        .setDestination(destination)
        .setArchiveType(archiveType);
```     
  __Parameters__:
- `sources` (array\<Source>) - contains the files to be archived, as described above.  
- `source` (Source) - the file to be added, as described above. 
- `destination` (Destination) - an object that defines the archive file's destination path and ACL.
- `archiveType` (string) - the required file extension of the archive file (example: `"zip"`).
      
### Creating the Archive
The _CreateArchiveRequest_ is passed as a parameter to the `createArchive` method.  
Creating an archive is an asynchronous action that creates a [job][job-docs] in Wix Media Platform.  
The `createArchive` object is passed to the resolved Promise.

```typescript
archiveManager.createArchive(createArchiveRequest?: ICreateArchiveRequest): Promise<Job<CreateArchiveSpecification>> 
```
__Parameters__: 
- `createArchiveRequest` (CreateArchiveRequest) - as described above.  

returns Promise
***

## Extract Archive

Instead of uploading multiple files separately, you can upload a single archive file and later extract its content to a destination directory.  

You can also request an Extracted Files Report in either .csv or .json format, that details the files that were extracted from the archive.

### Extract Archive Code Example
The following code example shows all the steps required for extracting an archive file. 
Below you'll find a step-by-step guide. 

```javascript

var ExtractArchiveRequest = require("media-platform-js-sdk").archive.ExtractArchiveRequest;

var extractArchiveRequest = new ExtractArchiveRequest()
                    .setSource(new Source().setFileId("file-id"))
                    .setDestination(new Destination().setDirectory("/porcupines/porcupine_images/").setAcl("public"))
                    .setExtractedFilesReport(extractedFilesReport);
                    
mediaPlatform.archiveManager.extractArchive(extractArchiveRequest)
  .then(
    response => {},
    error => {}
  );
```

### `Source` - Set Source Archive File
The archive file that you wish to extract can be represented by either its file ID or its path. 
Create a `Source` and specify the file you wish to extract:

```javascript
var source = new Source().setFileId(fileId);
// OR
var source = new Source().setPath(path);
```

__Parameters__:
- `fileId` (string) - the file ID of a file you wish to add to the archive.
- `path` (string) - the path of the archive file you wish to extract (example: `"/this/archive.zip"`).  

### `Destination` - Set the Extracted Files' Destination
Define the directory to which the extracted files will be uploaded, and whether they are private or public.

```javascript
var destination = new Destination()
            .setDirectory(directory)
            .setAcl(acl);
```
__Parameters__:
- `directory` (string) - the destination directory (example: `"/this/directory/"`).  
- `acl` (string) - can be either `"public"` or `"private"`.

### `ExtractedFilesReport` - Set an Extracted Files Report
If you wish to create an extracted files report, create an `ExtractedFilesReport` and pass it as a parameter to the `setExtractedFilesReport` method:

```javascript
var ExtractedFilesReport = require("media-platform-js-sdk").archive.ExtractedFilesReport;

var extractedFilesReport = new ExtractedFilesReport()
                    .setDestination(destination)
                    .setFormat(format);
```
__Parameters__:
- `destination` (Destination) - sets the destination path and ACL of the report file. 
The path and ACL may be different than those of the extracted files.
- `format` (string) - the file extension of the report, either "zip" or "csv". 

### `ExtractArchiveRequest`- Create the Extract Archive Request
Create an `ExtractArchiveRequest` that will be passed as a parameter to the `extractArchive` method later.  

```javascript
var extractArchiveRequest = new ExtractArchiveRequest()
        .setSource(source)
        .setDestination(destination)
        .setExtractedFilesReport(extractedFilesReport);
```

>Only call setExtractedFilesReport() if you require a report and have defined one.

  __Parameters__:
- `source` (Source) - specifies the archive file to be extracted.
- `destination` (Destination) - sets the destination path of the extracted files. 
- `extractedFilesReport` (ExtractedFilesReport) - an object that defines the report file's destination path and format.


### Extracting the Archive
The `ExtractArchiveRequest` is passed as a parameter to the `extractArchive` method.  
Extracting an archive is an asynchronous action that creates a [job][job-docs] in Wix Media Platform.
The `extractArchive` object is passed to the resolved Promise. 


```typescript
archiveManager.extractArchive(extractArchiveRequest: IExtractArchiveRequest): Promise<Job<ExtractArchiveSpecification>>
```
- `extractArchiveRequest` (CreateArchiveRequest) - as described above.  

returns Promise

[job-docs]: https://support.wixmp.com/en/article/jobs
