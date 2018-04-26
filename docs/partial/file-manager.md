<!-- Generated automatically. Update this documentation by updating the source code. -->

# File Manager

## getUploadUrl()

```javascript
fileManager.getUploadUrl({
  mimeType: 'Content-Type: image/gif',
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
        <th>ARGUMENTS</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>uploadUrlRequest</code>
        </td>
        <td>
            <div class="type">(IUploadUrlRequest | undefined | null)</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <div class="type">GetUploadURLCallback</div>
            <p>DEPRECATED! use promise response instead</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## uploadFile()

upload a file

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
          <code>uploadRequest</code>
        </td>
        <td>
            <div class="type">UploadFileRequest?</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <div class="type">UploadFileCallback</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## importFile()

import a file from a source URL, returns a Job (see job manager)

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(<code>error</code>: (Error | null), <code>job</code>: (Job&#x3C;FileImportSpecification> | null)): void</code>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## createFile()

creates a file descriptor, use this to create an empty directory

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(Error, FileDescriptor)</code>
            <p>DEPRECATED! use promise response instead</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## getFile()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
          <code>callback</code>
        </td>
        <td>
            <code>function(Error, FileDescriptor)</code>
            <p>DEPRECATED! use promise response instead</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## getFileMetadataById()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(Error, FileMetadata)</code>
            <p>DEPRECATED! use promise response instead</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## listFiles()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(Error, ListFilesResponse)</code>
            <p>DEPRECATED! use promise response instead</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## deleteFileByPath()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
          <code>callback</code>
        </td>
        <td>
            <code>function(Error)</code>
            <p>DEPRECATED! use promise response instead</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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

## deleteFileById()

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>ARGUMENTS</th>
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
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(Error)</code>
            <p>DEPRECATED! use promise response instead</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
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
