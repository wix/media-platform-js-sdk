<!-- Generated automatically. Update this documentation by updating the source code. -->

# Archive Manager

## ArchiveManager

Archive Manager

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
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(Error, Job)</code>
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
            <div class="type">Promise&#x3C;Job&#x3C;ExtractArchiveSpecification>></div>
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
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(Error, Job)</code>
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
            <div class="type">Promise&#x3C;Job&#x3C;CreateArchiveSpecification>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
