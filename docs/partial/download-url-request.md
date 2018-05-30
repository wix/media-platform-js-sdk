<!-- Generated automatically. Update this documentation by updating the source code. -->

# Download Url Request

## DownloadUrlRequest

Download Url Request

### ttl

the token time to live in seconds

### attachment

Content-Disposition header, if provided the content disposition is set to attachment with the provided file name

### onExpireRedirectTo

if the token expired, will redirect to this provided url

### setTTL()

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
          <code>ttl</code>
        </td>
        <td>
            <div class="type">number</div>
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
            <div class="type">DownloadUrlRequest</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### setAttachment()

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
          <code>filename</code>
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
        <th>RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">DownloadUrlRequest</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### setOnExpireRedirectTo()

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
          <code>onExpireRedirectTo</code>
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
        <th>RETURN VALUE</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
        </td>
        <td>
            <div class="type">DownloadUrlRequest</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
