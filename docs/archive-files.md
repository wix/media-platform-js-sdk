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

var createArchiveRequest = new CreateArchiveRequest({
  archiveType: 'zip',
  destination: new Destination({
    acl: "public",
    path: "/fish/file.zip"
  }),
  sources: [
    new Source({
      fileId: 'file-id'
    })
  ]
});

mediaPlatform.archiveManager.createArchive(createArchiveRequest);
```

### `Source` - Set Archive Source Files
The files that you wish to archive can be represented by either their file ID or their path. 
Create an array of `Source` and add the files you wish to archive to the list, as follows:

```javascript
var sources = [
  new Source({
    fileId: fileId
  }),
  new Source({
    path: path
  })
];
//...
```
__Parameters__:
- `fileId` (string) - the file ID of a file you wish to add to the archive.
- `path` (string) - the path of the file you wish to add to the archive (example: `"/this/file.txt"`).  

### `Destination` - Set the Archive File's Destination
Define the directory to which the archive file will be uploaded, and whether it is private or public.
Use directory or path.

```javascript
var destination = new Destination({
  acl: acl,
  directory: directory
});
```

or

```javascript
var destination = new Destination({
  acl: acl,
  path: path
});
```

__Parameters__:
- `acl` (string) - can be either `"public"` or `"private"`.
- `directory` (string) - the destination directory (example: `"/to/here/"`).
- `path` (string) - the destination path (example: `"/destination/file.ext"`).  


### `CreateArchiveRequest` - Create the Archive Request
Now create a _createArchiveRequest_, that will be passed as a parameter to the `createArchive` method later.

```typescript
var createArchiveRequest = new CreateArchiveRequest({
  sources: sources,
  destination: destination,
  archiveType: archiveType
});
```

  __Parameters__:
- `sources` (array of <Source>) - contains the files to be archived, as described above.  
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

var ExtractArchiveRequest = require('media-platform-js-sdk').archive.ExtractArchiveRequest;

var extractArchiveRequest = new ExtractArchiveRequest({
  destination: new Destination({
    acl: 'public',
    directory: '/porcupines/porcupine_images/'
  }),
  source: new Source({
    fileId: 'file-id'
  })
});

mediaPlatform.archiveManager.extractArchive(extractArchiveRequest)
  .then(
    response => {},
    error => {}
  );
```

### `Source` - Set Source Archive File
The archive file that you wish to extract can be represented by either its file ID or its path. 
Create a `Source` and specify the file you wish to extract:

```typescript
var source = new Source({
  fileId: fileId
});
// OR
var source = new Source({
  path: path
});
```

__Parameters__:
- `fileId` (string) - the file ID of a file you wish to add to the archive.
- `path` (string) - the path of the archive file you wish to extract (example: `"/this/archive.zip"`).  

### `Destination` - Set the Extracted Files' Destination
Define the directory to which the extracted files will be uploaded, and whether they are private or public.
Use directory or path.

```javascript
var destination = new Destination({
  acl: acl,
  directory: directory
});
```

or

```javascript
var destination = new Destination({
  acl: acl,
  path: path
});
```
__Parameters__:
- `acl` (string) - can be either `"public"` or `"private"`.
- `directory` (string) - the destination directory (example: `"/to/here/"`).
- `path` (string) - the destination path (example: `"/destination/file.ext"`).


### `ExtractArchiveRequest`- Create the Extract Archive Request
Create an `ExtractArchiveRequest` that will be passed as a parameter to the `extractArchive` method later.  

```javascript
var extractArchiveRequest = new ExtractArchiveRequest({
  source: source,
  destination: destination
});
```

  __Parameters__:
- `source` (Source) - specifies the archive file to be extracted.
- `destination` (Destination) - sets the destination path of the extracted files. 


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
