<!-- Generated automatically. Update this documentation by updating the source code. -->

# Media Platform API

## MediaPlatform

Media Platform

`new MediaPlatform()`

constructor

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
          <code>config</code>
        </td>
        <td>
            <div class="type">IConfiguration</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### archiveManager

### fileManager

### avManager

### flowManager

### liveManager

### jobManager

### imageManager

### widgetInstancesManager

### webhookDeserializer

### imageExtractionManager

### getAuthorizationHeader()

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
          <code>token</code>
        </td>
        <td>
            <div class="type">Token</div>
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
          <code>Authorization</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### getDownloadUrl()

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
          <code>downloadUrlRequest</code>
        </td>
        <td>
            <div class="type">DownloadUrlRequest</div>
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
          <code>downloadUrl</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
