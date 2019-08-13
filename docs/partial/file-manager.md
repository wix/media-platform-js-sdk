<!-- Generated automatically. Update this documentation by updating the source code. -->

# File Manager

## FileManager

`new FileManager()`

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>configuration</code>
        </td>
        <td>
            <div class="type">Configuration</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>httpClient</code>
        </td>
        <td>
            <div class="type">HTTPClient</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>fileUploader</code>
        </td>
        <td>
            <div class="type">FileUploader</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### baseUrl

### apiUrl

### queueFileUpload

### getUploadUrl()

```javascript
fileManager.getUploadUrl({
  mimeType: 'image/gif',
  path: '/path/to',
  size: 12345, // in bytes
  acl: 'public'
})
.then(response => {
  console.log(response.uploadToken, response.uploadUrl);
});
```

Get Upload URL

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>uploadUrlRequest</code>
        </td>
        <td>
            <div class="type">IUploadUrlRequest</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;UploadUrlResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### getUploadConfiguration()

```javascript
fileManager.getUploadConfiguration({
  mimeType: 'image/gif',
  path: '/path/to',
  size: 12345, // in bytes
  acl: 'public'
}).
then(response => {
  console.log(response.uploadToken, response.uploadUrl)
});
```

Get Upload Configuration

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>uploadConfigurationRequest</code>
        </td>
        <td>
            <div class="type">IUploadConfigurationRequest</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;UploadConfigurationResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### uploadFile()

upload a file

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>path</code>
        </td>
        <td>
            <div class="type">string</div>
            <p>the destination to which the file will be uploaded</p>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>file</code>
        </td>
        <td>
            <div class="type">(string | Buffer | Stream)</div>
            <p>can be one of: string - path to file, memory buffer, stream</p>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>uploadFileRequest</code>
        </td>
        <td>
            <div class="type">UploadFileRequest?</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>uploadToken</code>
        </td>
        <td>
            <div class="type">string?</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>uploadUrl</code>
        </td>
        <td>
            <div class="type">string?</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">(Promise&#x3C;Array&#x3C;FileDescriptor>> | UploadJob)</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### importFileObservable()

import a file from a source URL, returns a Job Observable

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>importFileRequest</code>
        </td>
        <td>
            <div class="type">ImportFileRequest</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Observable&#x3C;Job&#x3C;FileImportSpecification>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### importFile()

import a file from a source URL, returns a Job (see job manager)

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>importFileRequest</code>
        </td>
        <td>
            <div class="type">ImportFileRequest</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;Job&#x3C;FileImportSpecification>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### createFile()

creates a file descriptor

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>fileDescriptor</code>
        </td>
        <td>
            <div class="type">FileDescriptor</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;FileDescriptor></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### createFolder()

creates a folder descriptor, use this to create an empty directory

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>folderDescriptor</code>
        </td>
        <td>
            <div class="type">FolderDescriptor</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;FileDescriptor></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### getFile()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>path</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;FileDescriptor></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### getFileMetadataById()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>fileId</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;FileMetadata></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### listFiles()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>path</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>listFilesRequest</code>
        </td>
        <td>
            <div class="type">IListFilesRequest?</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;ListFilesResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### deleteFileByPath()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>path</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;void></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### deleteFileById()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>id</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise&#x3C;void></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### updateFileACL()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>params</code>
        </td>
        <td>
            <div class="type">UpdateFileACL</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">Promise</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
