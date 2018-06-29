<!-- Generated automatically. Update this documentation by updating the source code. -->

# AV Manager

## AVManager

`new AVManager()`

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
      <tr>
        <td class="param">
          <code>httpClient</code>
        </td>
        <td>
            <div class="type">HTTPClient</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### baseUrl

### apiUrl

### transcodeVideoObservable()

Transcode video

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
          <code>transcodeRequest</code>
        </td>
        <td>
            <div class="type">any</div>
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
            <div class="type">Observable&#x3C;JobGroup&#x3C;TranscodeSpecification>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### transcodeVideo()

Transcode Video

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
          <code>transcodeRequest</code>
        </td>
        <td>
            <div class="type">any</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <div class="type">any</div>
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
            <div class="type">Promise&#x3C;TranscodeJobResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### extractPoster()

Extract Poster

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
          <code>extractPosterRequest</code>
        </td>
        <td>
            <div class="type">any</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <div class="type">ExtractPosterCallback</div>
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
            <div class="type">Promise&#x3C;ExtractPosterJobResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### extractStoryboard()

Extract storyboard

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
          <code>extractStoryboardRequest</code>
        </td>
        <td>
            <div class="type">any</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <div class="type">ExtractStoryboardCallback</div>
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
            <div class="type">Promise&#x3C;ExtractStoryboardJobResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### packageVideo()

Packaging Service

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
          <code>PackagingParams</code>
        </td>
        <td>
            <div class="type">params</div>
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
            <div class="type">Promise&#x3C;PackagingJobResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
