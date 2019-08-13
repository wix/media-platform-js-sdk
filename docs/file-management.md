---
layout: simple
---
[File Management API Documentation](https://support.wixmp.com/en/article/file-management)  

This API provides the basic set of file operations available in Wix Media Platform, such as upload, list and delete.
> Please note: for every File Management action, your application needs to have the relevant [permissions](https://support.wixmp.com/en/article/about-permissions). Add the application to a security group or create a permission that applies to it.

## FileDescriptor
Each file and folder in WixMP has its corresponding FileDescriptor object, which provides the file's ID, hash, path, mime type, size in bytes, ACL, and dates of creation and last update. Several methods in this API return a FileDescriptor object (or array).  
A `FileDescriptor` has the following properties:

```javascript
var fileId = fileDescriptor.id;
var fileHash = fileDescriptor.hash;
var filePath = fileDescriptor.path;
var fileMimeType = fileDescriptor.mimeType;
var fileType = fileDescriptor.type;
var fileSize = fileDescriptor.size;
var fileAcl = fileDescriptor.acl;
var fileDateCreated = fileDescriptor.dateCreated;
var fileDateUpdated = fileDescriptor.dateUpdated;
```

> `hash` and `size` fields are `null` for folders.  `type` field is `"-"` for files and `"d"` for directories.

## File Upload

Uploads a file to WixMP by requesting an upload URL and upload token from the application, and performing 
a `POST` request to that URL with the relevant file information.

First, create an `UploadFileRequest`. This object defines the uploaded file's ACL, age(how long the file should leave in seconds) and mime type.

```typescript
var UploadFileRequest = require('media-platform-js-sdk').file.UploadFileRequest;

var uploadRequest = new UploadFileRequest({
  acl: acl,
  age: 40,
  mimeType: mimeType
});
```
__Parameters__:  
   - `acl` (string): can be either `"private"` or `"public"` (default value is "public").
   - `age` (number): how long the file should leave in seconds, can be greater than `30` and less than `31536000(365 days)`. default value is `null`
   - `mimeType` (string): for example, `"image/jpeg"`. If the source file is provided by its path (and not as a stream or buffer), the mime type is determined automatically, so you don't have to set `mimeType`.


### From Server
You can provide the source file either by its path (string), or as a buffer or stream.  

To upload the file:
```typescript
fileManager.uploadFile(
  path: string,
  file: string | Buffer | Stream,
  uploadRequest?: UploadFileRequest,
  uploadToken?: string,
  uploadUrl?: string
);
```

__Parameters__:
- `path` (string): the destination path to which the file will be uploaded.
- `file` (string || Buffer || Stream): the source file to be uploaded (either its path as a string or the file itself as a buffer/stream).
- `uploadRequest` (UploadFileRequest): defines the uploaded file's mime type and ACL.
- `uploadToken` (string): defines the custom token for file uploading.
- `uploadUrl` (string): defines the custom url for file uploading.

### From Browser

```html
<form id="upload-form" enctype="multipart/form-data" action="" method="post" target="upload-result">
    <input id="file" name="file" type="file">
</form>
<button id="upload-button">Upload</button>

<script>
  var fileUploadButton = document.getElementById('upload-button');
  var file = document.getElementById('file');
  var path = file.value.split("\\").pop();

// Optional:
  var UploadFileRequest = require('media-platform-js-sdk').file.UploadFileRequest;
  var uploadRequest = new UploadFileRequest({
    acl: 'private',
    mimeType: 'image/jpeg'
  });
  var uploadToken = 'custom-token';
  var uploadUrl = 'https://custom-domain.com/upload';

  fileUploadButton.addEventListener('click', function() {
    mediaPlatform.fileManager.uploadFile(
      path,
      file,
      uploadRequest,
      uploadToken,
      uploadUrl
    )
    .on('upload-success', function(response) {
      // do something
    })                
    .on('upload-error', function(error) {
      // do something
    });
  });
</script>
```

__Parameters__:

The same as from server

## File Import
[File Import API documentation](https://support.wixmp.com/en/article/file-import)  

Creates a [job](https://support.wixmp.com/en/article/jobs) that imports an existing file from an external URL to the Wix Media Platform file manager.

```typescript
const ImportFileRequest = require('media-platform-js-sdk').file.ImportFileRequest;

const importFileRequest = new ImportFileRequest({
  externalAuthorization: new ExternalAuthorization({
    headers: headers
  }),
  destination: new Destination({
    acl: acl,
    path: path
  }),
  sourceUrl: url
});

fileManager.importFile(importFileRequest: ImportFileRequest): Promise<Job<FileImportSpecification>>
```
__Parameters__:
- `url` (string) - the external URL to import the file from.
- `headers` (dictionary) - the authorization headers required to authenticate to the external service from which the file is imported.
- `name, value` (string, string) - a key-value pair to be added to the request's authorization headers.
- `path` (string) - the destination path for the imported file in Wix Media Platform file manager (example: `"/to/file.ext"`).
- `acl` (string) - Valid options are `"private"` or `"public"`.

returns Promise


## Download a Secure File
  
File access can be restricted by setting a file's ACL to "private". 
In order to access these files, a secure URL must be generated.  

First, create a `DownloadUrlRequest` object, that determines the URL's expiration behavior 
and content disposition header (for more information, see the [API documentation](https://support.wixmp.com/en/article/file-download).)  

```javascript
var DownloadUrlRequest = require('media-platform-js-sdk').file.DownloadUrlRequest;

var downloadUrlRequest = new DownloadUrlRequest({
  expirationRedirectUrl,
  expriry,
  saveAs
})
```
__Parameters__:
- `expirationRedirectUrl` (string) (optional) - if the token expired, the page will redirect to this URL.
- `expiry` (integer) (optional) (default - 600) - the token time to live in seconds.
- `saveAs` (string) (optional) - the file will save with name

To get the download URL:
```typescript
var downloadUrl = mediaPlatform.getDownloadUrl(path: string, downloadUrlRequest?: DownloadUrlRequest): Promise<DownloadUrl>
```
__Parameters__:
- `path` (string) - the requested file's path in WixMP file manager (example: `"path/to/file.ext"`).
- `downloadUrlRequest` (DownloadUrlRequest) - as described above.

## List Files in a Directory
Retrieves a list of the files in the specified directory.
First, create a `ListFilesRequest`, which determines the query's parameters, as follows:
```typescript
const ListFilesRequest = require('media-platform-js-sdk').file.ListFilesRequest;

const listFilesRequest = new ListFilesRequest({
  nextPageToken: nextPageToken,
  orderBy: orderBy,
  orderDirection: OrderDirection.ASC, // 'asc' or 'des'
  pageSize: pageSize
});
```

> You can choose between `OrderDirection.ASC` and `OrderDirection.DES` to define the list's order direction. 
The list is provided in a descending order by default.

__Parameters__: 
- `nextPageToken` (string) - optional. The next page cursor, as provided in a previous `listFiles` response.
- `pageSize` (integer) - optional. Defaults to 20.
- `orderBy` (OrderBy) - optional. `name` or `date`, defaults to `date`.
- `directory` (string) - the required directory (example: `"/images/"`).

To request the files:
```typescript
fileManager.listFiles(directory, listFilesRequest);
```
__Parameters__: 
- `directory` (string) - the path of the required directory (example: `"/images/"`).
- `listFilesRequest` (ListFilesRequest) - as described above.


## Get File Descriptor
Retrieves a file's [fileDescriptor](https://support.wixmp.com/en/article/file-management#filedescriptor-object) object by path.

```typescript
fileManager.getFile(path: string): Promise<FileDescriptor>
```
__Parameters__: 
- `path` (string) - the path of the required file (example: `"/images/porcupine.jpg"`).

## Get File Metadata
[File Metadata API Documentation](https://support.wixmp.com/en/article/file-metadata)  

Retrieves a file's [metadata object](https://support.wixmp.com/en/article/file-metadata#metadata-objects)
 by its file ID.
```typescript
fileManager.getFileMetadataById(fileId: string): Promise<FileMetadata>
```
returns Promise

__Parameters__: 
- `fileId` (string) - the required file's ID.

## Delete File
Deletes a file by either file ID or path.
```typescript
fileManager.deleteFileById(id: string): Promise<void>
```
__Parameters__: 
- `fileId` (string) - the file ID of the file to be deleted.  


```typescript
fileManager.deleteFileByPath(path: string): Promise<void>
```
__Parameters__: 
- `path` (string) - the path of the file to be deleted.


## Update File ACL
Update File ACL by file ID:
```javascript
fileManager.updateFileACL({ acl, id });
```

Update File ACL by file path:
```javascript
fileManager.updateFileACL({ acl, path });
```
__Parameters__: 
- `acl` (string) - `public`, `private`.  
- `id` (string) - the id of the file to be updated.  
- `path` (string) - the path of the file to be updated.

returns Promise
