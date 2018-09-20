<!-- Generated automatically. Update this documentation by updating the source code. -->

# Archive Manager

## ArchiveManager

Archive Manager. Lets create and extract archives

`new ArchiveManager()`

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
          <code>configuration</code>
        </td>
        <td>
            <div class="type">(Configuration | BrowserConfiguration)</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>httpClient</code>
        </td>
        <td>
            <div class="type">IHTTPClient</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### baseUrl

### createArchive()

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
          <code>createArchiveRequest</code>
        </td>
        <td>
            <div class="type">CreateArchiveRequest?</div>
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
            <div class="type">Promise&#x3C;Job&#x3C;CreateArchiveSpecification>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### createArchiveObservable()

```javascript
archiveManager
  .createArchiveObservable({
    source: {
      fileId: '#file-id
    },
    destination: {
      path: '/demo/path',
      acl: 'public'
    }
  })
  .subscribe(job => {
    console.log(job.status);
  });
```

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
          <code>createArchiveRequest</code>
        </td>
        <td>
            <div class="type">IExtractArchiveRequest</div>
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
            <div class="type">Observable&#x3C;CreateArchiveSpecification></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### extractArchiveObservable()

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
          <code>extractArchiveRequest</code>
        </td>
        <td>
            <div class="type">IExtractArchiveRequest</div>
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
            <div class="type">Observable&#x3C;Job&#x3C;ExtractArchiveSpecification>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### extractArchive()

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
          <code>extractArchiveRequest</code>
        </td>
        <td>
            <div class="type">ExtractArchiveRequest?</div>
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
            <div class="type">Promise&#x3C;Job&#x3C;ExtractArchiveSpecification>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
