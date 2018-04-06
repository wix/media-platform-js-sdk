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

First, create an `UploadFileRequest`. This object defines the uploaded file's mime type and ACL.

```javascript
var UploadFileRequest = require('media-platform-js-sdk').file.UploadFileRequest;

var uploadRequest = new UploadFileRequest().setMimeType(mimeType).setAcl(acl);
```
__Parameters__:  
   - `mimeType` (string): for example, `"image/jpeg"`. If the source file is provided by its path (and not as a stream or buffer), the mime type is determined automatically, 
   so you don't have to call `setMimeType`.

   - `acl` (string): can be either `"private"` or `"public"` (default value is "public"). 
   

### From Server
You can provide the source file either by its path (string), or as a buffer or stream.  

To upload the file:
```javascript
fileManager.uploadFile(path, file, uploadRequest, callback);
```

__Parameters__:
- `path` (string): the destination path to which the file will be uploaded.
- `file` (string || buffer || stream): the source file to be uploaded (either its path as a string or the file itself as a buffer/stream).
- `uploadRequest` (UploadFileRequest): defines the uploaded file's mime type and ACL.
- `callback` (function(error, response)) - a function that handles the HTTP response. On 
success, the callback function is called with an `Array<FileDescriptor>` as the _response_ parameter,
that includes the uploaded file's fileDescriptor.  

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
    var uploadRequest = new UploadFileRequest().setMimeType("image/jpeg").setAcl("private");    
    
    fileUploadButton.addEventListener('click', function() {
        mediaPlatform.fileManager.uploadFile(path, file, uploadRequest)
            .on('upload-success', function(response) {
                 // do something
            })                
            .on('upload-error', function(error) {
                 // do something
            });
    });
</script>
```

## File Import
[File Import API documentation](https://support.wixmp.com/en/article/file-import)  

Creates a [job](https://support.wixmp.com/en/article/jobs) that imports an existing file from an external URL to the Wix Media Platform file manager.

```javascript
var ImportFileRequest = require('media-platform-js-sdk').file.ImportFileRequest;

var importFileRequest = new ImportFileRequest()
    .setSourceUrl(url)
    .setExternalAuthorization(new ExternalAuthorization()
        .setHeaders(headers)
        .addHeader(name, value))
    .setDestination(new Destination().
        .setPath(path)
        .setAcl(acl));

fileManager.importFile(importFileRequest, callback);
```
__Parameters__:
- `url` (string) - the external URL to import the file from.
- `headers` (dictionary) - the authorization headers required to authenticate to the external service from which the file is imported.
- `name, value` (string, string) - a key-value pair to be added to the request's authorization headers.
- `path` (string) - the destination path for the imported file in Wix Media Platform file manager (example: `"/to/file.ext"`).
- `acl` (string) - Valid options are `"private"` or `"public"`.
- `callback` (function(error, response)) - a function that handles the HTTP response. On success, it's called with
the `Job` object that was created.


## Download a Secure File
  
File access can be restricted by setting a file's ACL to "private". 
In order to access these files, a secure URL must be generated.  

First, create a `DownloadUrlRequest` object, that determines the URL's expiration behavior 
and content disposition header (for more information, see the [API documentation](https://support.wixmp.com/en/article/file-download).)  

```javascript
var DownloadUrlRequest = require('media-platform-js-sdk').file.DownloadUrlRequest;

var downloadUrlRequest = new DownloadUrlRequest()
                            .setTTL(ttl)
                            .setAttachment(filename)
                            .setOnExpireRedirectTo(onExpireRedirectTo);
```
__Parameters__:
- `ttl` (integer) - the token time to live in seconds.
- `filename` (string) - Content-Disposition header, if provided the content disposition is set to attachment with the provided file name.
- `onExpireRedirectTo` (string) - if the token expired, the page will redirect to this URL.

To get the download URL:
```javascript
var downloadUrl = mediaPlatform.getDownloadUrl(path, downloadUrlRequest);
```
__Parameters__:
- `path` (string) - the requested file's path in WixMP file manager (example: `"path/to/file.ext"`).
- `downloadUrlRequest` (DownloadUrlRequest) - as described above.

## List Files in a Directory
Retrieves a list of the files in the specified directory.
First, create a `ListFilesRequest`, which determines the query's parameters, as follows:
```javascript
var ListFilesRequest = require('media-platform-js-sdk').file.ListFilesRequest;

var listFilesRequest = new ListFilesRequest()
    .setNextPageToken(nextPageToken)
    .setPageSize(pageSize)
    .setOrderBy(orderBy)
    .ascending();
```

> You can choose between calling `ascending()` and `descending()` to define the list's order direction. 
The list is provided in a descending order by default.  

__Parameters__: 
- `nextPageToken` (string) - optional. The next page cursor, as provided in a previous `listFiles` response.
- `pageSize` (integer) - optional. Defaults to 20.
- `orderBy` (OrderBy) - optional. `name` or `date`, defaults to `date`.
- `directory` (string) - the required directory (example: `"/images/"`).

To request the files:
```javascript
fileManager.listFiles(directory, listFilesRequest, callback);
```
__Parameters__: 
- `directory` (string) - the path of the required directory (example: `"/images/"`).
- `listFilesRequest` (ListFilesRequest) - as described above.
- `callback` (function(error, response)) - a function that handles the HTTP response. On success, it's called with
a `ListFilesResponse` object, which has the following properties:
  - `.nextPageToken` (string) - can be passed as a parameter to the `setNextPageToken` method.
  - `.files` (Array\<FileDescriptor>) - the fileDescriptor objects of the files in the specified directory.


## Get File Descriptor
Retrieves a file's [fileDescriptor](https://support.wixmp.com/en/article/file-management#filedescriptor-object) object by path.

```javascript
fileManager.getFile(path, callback);
```
__Parameters__: 
- `path` (string) - the path of the required file (example: `"/images/porcupine.jpg"`).
- `callback` (function(error, response)) - a function that handles the HTTP response. On success, it's called with
the requested `FileDescriptor` object.

## Get File Metadata
[File Metadata API Documentation](https://support.wixmp.com/en/article/file-metadata)  

Retrieves a file's [metadata object](https://support.wixmp.com/en/article/file-metadata#metadata-objects)
 by its file ID.
```javascript
fileManager.getFileMetadataById(fileId, callback);
```

__Parameters__: 
- `fileId` (string) - the required file's ID.
- `callback` (function(error, response)) - a function that handles the HTTP response. On success, it's called with
the requested `FileMetadata` object.

## Delete File
Deletes a file by either file ID or path.
```javascript
fileManager.deleteFileById(id, callback);
```
__Parameters__: 
- `fileId` (string) - the file ID of the file to be deleted.  
- `callback` (function(error, response)) - a function that handles the HTTP response. This callback is only called on error,
as a success result is returns `null`.


```javascript
fileManager.deleteFileByPath(path, callback);
```
__Parameters__: 
- `path` (string) - the path of the file to be deleted.  
- `callback` (function(error, response)) - a function that handles the HTTP response. This callback is only called on error,
as a success result is returns `null`.

