<!-- Generated automatically. Update this documentation by updating the source code. -->

# Job-Manager

## getJob()

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
          <code>jobId</code>
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
            <div class="type">Promise&#x3C;Job&#x3C;any>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## getJobGroup()

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
          <code>groupId</code>
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
            <code>function(Error, Array&#x3C;Job>)</code>
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
            <div class="type">Promise&#x3C;Array&#x3C;Job&#x3C;any>>></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## searchJobs()

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
          <code>searchJobsRequest</code>
        </td>
        <td>
            <div class="type">SearchJobsRequest</div>
        </td>
      </tr>
      <tr>
        <td class="param">
          <code>callback</code>
        </td>
        <td>
            <code>function(Error, SearchJobsResponse)</code>
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
            <div class="type">Promise&#x3C;SearchJobsResponse></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
