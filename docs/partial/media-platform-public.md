<!-- Generated automatically. Update this documentation by updating the source code. -->

# Media Platform in browser

## MediaPlatform

Media Platform Public

`new MediaPlatform()`

constructor

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
            <div class="type">Configuration</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### archiveManager

### fileManager

### jobManager

### avManager

### liveManager

### flowManager

### imageManager

### widgetInstancesManager

### imageExtractionManager

### getAuthorizationHeader()

retrieve the auth header for the currently logged in user


<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>RETURN VALUE</th>
        <th><div class="type">Promise&#x3C;AuthorizationHeader></div></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>Authorization</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### deauthorize()

log out the user

### getDownloadUrl()

get download url

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
          <code>downloadUrlRequest</code>
        </td>
        <td>
            <div class="type">(DownloadUrlRequest | undefined)</div>
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
        <th><div class="type">Promise&#x3C;DownloadUrl></div></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="param">
          <code>downloadUrl</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
