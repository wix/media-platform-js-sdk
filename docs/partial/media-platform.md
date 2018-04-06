<!-- Generated automatically. Update this documentation by updating the source code. -->

# Media Platform API

## getAuthorizationHeader()

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
        <th>RETURN VALUE</th>
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

## getAuthorizationHeader()

retrieve the auth header for the currently logged in user

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
          <code>callback</code>
        </td>
        <td>
            <code>function(<code>error</code>: Possible values are Error, null., <code>authorization</code>: Possible values are AuthorizationHeader, null.): void</code>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## getDownloadUrl()

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
        <th>RETURN VALUE</th>
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

## getDownloadUrl()

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
            Possible values are DownloadUrlRequest, undefined.
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(<code>error</code>: Possible values are Error, null., <code>response</code>: any): void</code>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## deauthorize()

log out the user
