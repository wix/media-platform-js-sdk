---
layout: simple
---

[Transcode API Documentation](https://support.wixmp.com/en/article/video-transcoding-5054232)

After uploading a video to your project, you can have it transcoded in order to enable adaptive video playback on any browser or internet-connected device.

> In order to transcode a video, your application needs to have a _[Permission](https://support.wixmp.com/en/article/video-transcoding-5054232#relevant-permissions-settings)_ 
that allows it to transcode videos and to upload files to the destination path.

## Transcode Code Example
The following code example shows all the steps required for a video transcode request. 
Below you'll find a step-by-step guide. 
 
```javascript
const transcodeSpecification = new TranscodeSpecification()
                            .setDestination(new Destination()
                                .setDirectory("/video/output/")
                                .setAcl("public"))
                            .setQualityRange(new QualityRange()
                                .setMinimum("240p")
                                .setMaximum("1440p"));

const transcodeRequest = new TranscodeRequest()
                            .addSource(new Source().setPath("/video/porcupine_movie.mp4"))
                            .addSpecification(transcodeSpecification);

transcodeManager.transcodeVideo(transcodeRequest)
  .then(
    (transcodeJobResponse) => {
      console.log('video transcoding successful: jobGroupID is ' + transcodeJobResponse.groupId);
      for (let x in transcodeJobResponse.jobs) {
        // TODO: handle transcoding jobs
      }
    },
    (error) => {
      console.error('video transcoding failed: ' + error.message);
    }
   );
```

## `Source` - Set Video Source
Define what source video file you wish to transcode, either by its path:
```javascript
const videoSource = new Source().setPath("/video/porcupine_movie.mp4");
```
or by its file ID:
```javascript
const videoSource = new Source().setFileId(fileId);
```
Both methods receive a string parameter and return the updated Source instance.

## `Destination` - Set Destination
Define the directory to which the transcoded video files will be uploaded, and whether they are private or public.

```javascript
const destination = new Destination()
                    .setDirectory(directory)
                    .setAcl(acl);
```
#### Parameters:
- `directory` (string) - the destination directory.  
- `acl` (string) - can be either `"public"` or `"private"`.

## `QualityRange` - Set Quality Range  
Specify the range of qualities to which the video will be transcoded. The supported qualities are:

144p | 240p | 360p | 480p | 720p | 1080p | 1440p | 2160p

For example, to create 480p, 720p and 1080p versions of your video, set the range's minimum to "480p" and maximum to "1080p" 
(the range limits are inclusive).

```javascript
const qualityRange = new QualityRange()
                            .setMinimum(minimum)
                            .setMaximum(maximum);
```

#### Parameters:
- `minimum` (string) - the lowest resolution to which the video will be transcoded, (example: "240p").  
- `maximum` (string) - the highest resolution to which the video will be transcoded (example: "1440p").

## `TranscodeSpecification` - Set the Request's Specification
As detailed in the [Job](/jobs#job-specification) object documentation, each job has a _Specification_ attribute.  
The job's `Specification` is casted to this object when `job.type === urn:job:av.transcode`.

The parameters you define when creating a `TranscodeSpecification` instance are the ones that are sent in the HTTP request, as detailed in the [API documentation](https://support.wixmp.com/en/article/video-transcoding-5054232#video-specifications).  

```javascript
const specification = new TranscodeSpecification()
                                    .setDestination(destination)
                                    .setQualityRange(qualityRange)
```
#### Parameters:
- `destination` ([Destination](/transcode-video#set-destination)) - 
an object describing the directory to which the transcoded video files will be uploaded and their ACL.  
- `qualityRange` ([QualityRange](/transcode-video#set-quality-range)) - 
the range of qualities to which the video will be transcoded.  

## `TranscodeRequest` - Create the Transcode Request

```javascript
const transcodeRequest = new TranscodeRequest()
                                    .addSource(source)
                                    .addSpecification(specification);
```
#### Parameters:
- `source` ([Source](/transcode-video#set-video-source)) - 
the video file to be transcoded.  
- `specification` ([TranscodeSpecification](/transcode-video#set-the-requests-specification)) - 
the information needed to transcode the video.  

## `transcodeVideo()` - Send the Transcode Request 
Once you have created a `TranscodeRequest`, pass it as a parameter to the `transcodeVideo()` method:  

```typescript
transcodeManager.transcodeVideo(transcodeRequest: TranscodeRequest): Promise<TranscodeJobResponse>
```
#### Parameters: 
- `transcodeRequest` (TranscodeRequest): the transcode request parameters, as described above.

returns Promise  

## `TranscodeJobsResponse` - Handle the Response

The `TranscodeJobsResponse` object is passed to the resolved Promise. 
It includes the list of jobs that matched the query parameters and the query's next page token, if the number of results exceeds the page size.

| Field Name   | Type        | Description                             |
|--------------|-------------| ----------------------------------------|
| jobs    | Job[]      | The list of transcode jobs that are created following the request |
| groupId | string | ID of the job group that is created |


You can get the ID of the job group that was created following the request, as well as the list of jobs in that group.  

```javascript
const transcodeJobGroupId = response.getGroupId();

const transcodingJobs = response.getJobs();
```
