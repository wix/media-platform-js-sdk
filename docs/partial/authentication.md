<!-- Generated automatically. Update this documentation by updating the source code. -->

# Authentication

## setIssuer()

sets the issuer of the token

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
          <code>ns</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>identifier</code>
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
            <div class="type">Token</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## setSubject()

sets the subject (actor) of the operation

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
          <code>ns</code>
        </td>
        <td>
            <div class="type">string</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>identifier</code>
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
            <div class="type">Token</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## setObjects()

sets the object, the entity on which the action is taken

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
          <code>objects</code>
        </td>
        <td>
            <div class="type">TokenObjects</div>
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
            <div class="type">Token</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## setExpiration()

sets the expiration in UNIX TIME

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
          <code>expiration</code>
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
            <div class="type">Token</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## addVerbs()

add to the list of operations permitted by this token

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
          <code>verbs</code>
        </td>
        <td>
            <div class="type">Array&#x3C;string></div>
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
            <div class="type">Token</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## setVerbs()

set the list of operations permitted by this token

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
          <code>verbs</code>
        </td>
        <td>
            <div class="type">Array&#x3C;string></div>
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
            <div class="type">Token</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## setAdditionalClaims()

set any arbitrary claims in the token (be careful not override any of the standard claims)

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
          <code>additionalClaims</code>
        </td>
        <td>
            <div class="type">{}</div>
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
            <div class="type">Token</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## toClaims()

return the JWT claims dictionary

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
            <div class="type">{}</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
