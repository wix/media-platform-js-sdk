const PATH_BASE = '/demo/';

// FILE MANAGEMENT API

(function () {

  // upload file
  const fileUploadButton = document.getElementById('file-management');
  const fileManagementLabel = document.getElementById('file-management-label');
  const fileUploadPayload = document.getElementById('file-management-payload');
  const fileUploadPath = document.getElementById('file-management-path');

  fileUploadButton.addEventListener('change', function () {
    const path = PATH_BASE + this.value.split('\\').pop();
    const file = this.files[0];

    fileUploadPath.innerHTML = path;

    startLoading(fileManagementLabel);
    mediaPlatform.fileManager.deleteFileByPath(path)
      .then(() => {
        mediaPlatform.fileManager
          .uploadFile(path, file)
          .on('upload-success', function (response) {
            stopLoading(fileManagementLabel);

            fileUploadPayload.innerHTML = Prism.highlight(
              JSON.stringify(response.fileDescriptors, null, 2),
              Prism.languages.js);
          })
          .on('upload-error', function () {
            stopLoading(fileManagementLabel);
          });
      });
  });


  // queued file upload
  const queuedFileUploadButton = document.getElementById('queued-file-management');
  const queuedFileManagementLabel = document.getElementById('queued-file-management-label');
  const queuedFileUploadPayload = document.getElementById('queued-file-management-payload');
  const queuedFileUploadPath = document.getElementById('queued-file-management-path');

  queuedFileUploadButton.addEventListener('change', function () {
    const path = PATH_BASE + this.value.split('\\').pop();
    const file = this.files[0];

    queuedFileUploadPath.innerHTML = path;


    startLoading(queuedFileManagementLabel);
    mediaPlatform.fileManager.deleteFileByPath(path)
      .then(
        () => {
          const uploadJob = new MP.upload.UploadJob();

          uploadJob
            .setPath(path)
            .setFile(file)
            .on('upload-success', function (response) {
              stopLoading(queuedFileManagementLabel);

              queuedFileUploadPayload.innerHTML = Prism.highlight(
                JSON.stringify(response.fileDescriptors, null, 2),
                Prism.languages.js
              );
            })
            .on('upload-error', function () {
              stopLoading(queuedFileManagementLabel);
            });

          mediaPlatform.fileManager.queueFileUpload(uploadJob);
        });
  });

  // get list of files
  const fileListButton = document.getElementById('file-list-button');
  const fileListPayload = document.getElementById('file-list-payload');

  fileListButton.addEventListener('click', function () {
    const listFileRequest = new MP.file.ListFilesRequest().setPageSize(3);

    startLoading(fileListButton);
    mediaPlatform.fileManager
      .listFiles('/demo', listFileRequest)
      .then((response) => {
          stopLoading(fileListButton);

          fileListPayload.innerHTML = Prism.highlight(
            JSON.stringify(response, null, 2),
            Prism.languages.js
          );
        },
        error => {
          console.error('error', error);
          return Promise.reject(error);
        }
      );
  });

  // get file metadata by id
  const fileMetadataButton = document.getElementById('file-metadata-button');
  const fileMetadataInput = document.getElementById('file-metadata-id-input');
  const fileMetadataPayload = document.getElementById('file-metadata-payload');

  fileMetadataButton.addEventListener('click', function () {
    const fileId = fileMetadataInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(fileMetadataButton);
    mediaPlatform.fileManager.getFileMetadataById(fileId)
      .then((response) => {
        stopLoading(fileMetadataButton);

        fileMetadataPayload.innerHTML = Prism.highlight(
          JSON.stringify(response, null, 2),
          Prism.languages.js);
      });
  });

  // delete file by id
  const fileDeleteButton = document.getElementById('file-delete-button');
  const fileDeleteInput = document.getElementById('file-delete-id-input');
  const fileDeletePayload = document.getElementById('file-delete-payload');

  fileDeleteButton.addEventListener('click', function () {
    const fileId = fileDeleteInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(fileDeleteButton);
    mediaPlatform.fileManager.deleteFileById(fileId)
      .then(
        (response) => {
          stopLoading(fileDeleteButton);

          fileDeletePayload.innerHTML = Prism.highlight(
            JSON.stringify(
              response,
              null,
              2
            ),
            Prism.languages.js
          );
        }
      );
  });

  // get secure url
  const downloadUrlButton = document.getElementById('download-url-button');
  const downloadUrlInput = document.getElementById('download-url-input');
  const downloadUrlPayload = document.getElementById('download-url-payload');

  downloadUrlButton.addEventListener('click', function () {
    const path = downloadUrlInput.value;
    if (!path) {
      console.log('please specify file path');
      return
    }

    startLoading(downloadUrlButton);

    mediaPlatform.getDownloadUrl(path)
      .then((response) => {
        stopLoading(downloadUrlButton);

        downloadUrlPayload.innerHTML = Prism.highlight(
          JSON.stringify(
            response,
            null,
            2
          ),
          Prism.languages.js
        );
      });
  });
})();


// IMAGE API
(function () {
  const imageFile = document.getElementById('image-file');
  const imageFileLabel = document.getElementById('image-file-label');
  const imageOutput = document.getElementById('image-output');
  const imagePayload = document.getElementById('image-payload');
  const imageFilePath = document.getElementById('image-file-path');
  const imageManipulationFilters = document.getElementById('image-manipulation-filters');
  const imageManipulationCode = document.getElementById('image-manipulation-code');
  let imageDescriptor;

  function getImageManipulationCode() {
    const filter = imageManipulationFilters.value.split(';');
    const filterName = filter[0];
    const value = filter[1];

    const filterFnText = filterName && value ? '.' + filterName + '(' + value + ')\n' : '';

    return 'mediaPlatform.fileManager.uploadFile(path, file)\n' +
      '       .on(\'upload-success\', function(event) {\n' +
      '           const image = new MP.Image(event.fileDescriptors[0]);\n\n' +
      '           image.crop(500, 500)\n' +
      '               .jpeg(100, true)\n' +
      '               ' + filterFnText +
      '               .toUrl()\n' +
      '               .url;\n' +
      '  });'

  }

  function parseFilterValue(filterValue) {
    const fnName = filterValue.split(';')[0];
    // to array with numbers
    const args = filterValue.split(';')[1].split(',').map(function (val) {
      return +val
    });

    return [fnName, args];
  }

  imageFile.addEventListener('change', function () {
    const path = PATH_BASE + this.value.split('\\').pop();
    const file = this.files[0];
    const filterValueArr = parseFilterValue(imageManipulationFilters.value);


    imageFilePath.innerHTML = path;

    startLoading(imageFileLabel);
    mediaPlatform.fileManager.deleteFileByPath(path)
      .then(() => {
        // do nothing...
      });

    const fnName = filterValueArr[0];
    const args = filterValueArr[1];

    mediaPlatform.fileManager
      .uploadFile(path, file)
      .on('upload-success', function (response) {
        stopLoading(imageFileLabel);
        const descriptors = response.fileDescriptors;
        const descriptor = imageDescriptor = descriptors[0];

        // set payload
        imagePayload.innerHTML = Prism.highlight(
          JSON.stringify(descriptor, null, 2),
          Prism.languages.js);

        const image = new MP.Image(descriptor);

        image
          .crop(500, 500)
          .jpeg(100, true);

        // apply filter
        image[fnName].apply(image, args);

        const url = 'http://' + imagesHost + image.toUrl().url;

        // set image
        imageOutput.setAttribute('src', url);
      })
      .on('upload-error', function (error) {
        console.error('upload error:', error);
        stopLoading(imageFileLabel);
      });
  });

  imageManipulationFilters.addEventListener('change', function () {

    imageManipulationCode.innerHTML = Prism.highlight(getImageManipulationCode(), Prism.languages.js)

    if (!imageDescriptor) {
      return;
    }

    const filterValueArr = parseFilterValue(this.value);
    const fnName = filterValueArr[0];
    const args = filterValueArr[1];

    const image = new MP.Image(imageDescriptor);

    image
      .crop(500, 500)
      .jpeg(100, true);

    // apply filter
    image[fnName].apply(image, args);

    const url = 'http://' + imagesHost + image.toUrl().url;

    // set image
    imageOutput.setAttribute('src', url);
  });
})();


// VIDEO API
(function () {
  const videoFile = document.getElementById('video-file');
  const videoFileLabel = document.getElementById('video-file-label');
  const videoOutput = document.getElementById('video-output');
  const videoPayload = document.getElementById('video-payload');
  const videoFilePath = document.getElementById('video-file-path');

  videoFile.addEventListener('change', function () {
    const path = PATH_BASE + this.value.split('\\').pop();
    const file = this.files[0];

    videoFilePath.innerHTML = path;

    startLoading(videoFileLabel);
    mediaPlatform.fileManager.deleteFileByPath(path)
      .then(() => {
        mediaPlatform.fileManager
          .uploadFile(path, file)
          .on('upload-success', function (event) {
            stopLoading(videoFileLabel);
            const videos = event.fileDescriptors;
            const video = videos[0];
            const url = 'http://' + videosHost + video.path;
            const html = Prism.highlight(JSON.stringify(video, null, 2), Prism.languages.js);

            videoOutput.setAttribute('src', url);
            videoPayload.innerHTML = html;
          })
          .on('upload-error', function (err) {
            stopLoading(videoFileLabel);
            console.error('upload error:', err);
          });
      });
  })
})();

// ARCHIVE API
(function () {
  // create archive by id
  const createArchiveForm = document.getElementById('create-archive-form');
  const createArchiveButton = document.getElementById('create-archive-button');
  const createArchiveInput = document.getElementById('create-archive-id-input');
  const createArchiveDestination = document.getElementById('create-archive-destination-input');
  const createArchiveDestinationAcl = document.getElementById('create-archive-destination-acl-input');
  const createArchiveType = document.getElementById('create-archive-type-input');
  const createArchivePayload = document.getElementById('create-archive-payload');

  createArchiveForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const fileId = createArchiveInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    const destinationPath = createArchiveDestination.value;
    if (!destinationPath) {
      console.log('please specify destination path');
      return
    }

    const archiveType = createArchiveType.value;
    if (!archiveType) {
      console.log('please specify archive type (zip, gzip, etc..)');
      return
    }

    const destinationAcl = createArchiveDestinationAcl.value;
    if (!destinationAcl || (destinationAcl !== 'private' && destinationAcl !== 'public')) {
      console.log('please specify destination acl (private or public)');
      return
    }

    startLoading(createArchiveButton);

    function render(data) {
      createArchivePayload.innerHTML = Prism.highlight(
        JSON.stringify(data, null, 2),
        Prism.languages.js);
    }

    mediaPlatform.archiveManager
      .createArchiveObservable({
        destination: {
          directory: destinationPath,
          acl: destinationAcl
        },
        sources: [{
          fileId: fileId
        }],
        archiveType: archiveType
      })
      .subscribe(
        render,
        function (error) {
          render(error);
          console.error(error);
          stopLoading(createArchiveButton);
        },
        function () {
          console.info('Stopped loading');
          stopLoading(createArchiveButton);
        });
  });


  // extract archive by id
  const extractArchiveButton = document.getElementById('extract-archive-button');
  const extractArchiveInput = document.getElementById('extract-archive-id-input');
  const extractArchiveDestination = document.getElementById('extract-archive-destination-input');
  const extractArchiveDestinationAcl = document.getElementById('extract-archive-destination-acl-input');
  const extractArchivePayload = document.getElementById('extract-archive-payload');

  extractArchiveButton.addEventListener('click', function () {
    const fileId = extractArchiveInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    const destinationPath = extractArchiveDestination.value;
    if (!destinationPath) {
      console.log('please specify destination path');
      return
    }

    const destinationAcl = extractArchiveDestinationAcl.value;
    if (!destinationAcl || (destinationAcl !== 'private' && destinationAcl !== 'public')) {
      console.log('please specify destination acl (private or public)');
      return
    }

    const extractArchiveRequest = new ExtractArchiveRequest({
      destination: {
        directory: destinationPath,
        acl: destinationAcl
      },
      source: {
        fileId: fileId
      }
    });

    startLoading(extractArchiveButton);

    mediaPlatform.archiveManager.extractArchive(extractArchiveRequest)
      .then((response) => {
        stopLoading(extractArchiveButton);
        extractArchivePayload.innerHTML = Prism.highlight(
          JSON.stringify(
            response || error,
            null,
            2
          ),
          Prism.languages.js
        );
      });
  })
})();


// TRANSCODE API
(function () {
  // transcode video file by id
  const transcodeVideoButton = document.getElementById('transcode-video-button');
  const transcodeVideoInput = document.getElementById('transcode-video-id-input');
  const transcodeVideoPayload = document.getElementById('transcode-video-payload');
  const transcodeJobStatus = document.getElementById('transcode-job-status');

  transcodeVideoButton.addEventListener('click', function () {
    const fileId = transcodeVideoInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(transcodeVideoButton);

    const source = new Source({
      fileId: fileId
    });

    const transcodeSpecification = new TranscodeSpecification({
      destination: {
        directory: '/test/output',
        acl: 'public'
      },
      qualityRange: {
        minimum: '240p',
        maximum: '1440p'
      }
    });

    const transcodeRequest = new TranscodeRequest()
      .addSource(source)
      .addSpecification(transcodeSpecification);

    function render(response) {
      transcodeVideoPayload.innerHTML = Prism.highlight(
        JSON.stringify(response, null, 2),
        Prism.languages.js);
    }

    mediaPlatform.avManager
      .transcodeVideoObservable(transcodeRequest)
      .subscribe(
        render,
        function (error) {
          render(error);
          console.error(error);
          stopLoading(transcodeVideoButton);
        },
        function () {
          console.info('Stopped loading');
          stopLoading(transcodeVideoButton);
        }
      );
  });

  function pollTranscodeJobStatus(jobGroupId) {
    mediaPlatform.jobManager.getJobGroup(jobGroupId)
      .then((response) => {
        transcodeJobStatus.innerText = 'Polling';
        transcodeVideoPayload.innerHTML = Prism.highlight(
          JSON.stringify(response, null, 2),
          Prism.languages.js);

        if (response.length) {
          let success = true;
          for (const i in response) {
            // if at least one job has status pending, we break
            if (response[i].status != 'success') {
              success = false;
              break;
            }
          }

          if (success) {
            stopLoading(transcodeVideoButton);
            transcodeJobStatus.innerText = 'Success';
          } else {
            setTimeout(function () {
              pollTranscodeJobStatus(jobGroupId);
            }, 5000);
          }
        }
      });
  }
})();


// EXTRACT POSTER API
(function () {
  // extractPoster video file by id
  const extractPosterVideoButton = document.getElementById('extract-poster-button');
  const extractPosterVideoInput = document.getElementById('extract-poster-id-input');
  const extractPosterVideoPayload = document.getElementById('extract-poster-payload');
  const extractPosterImage = document.getElementById('extract-poster-image');
  const extractPosterJobStatus = document.getElementById('extract-poster-job-status');

  extractPosterVideoButton.addEventListener('click', function () {
    const fileId = extractPosterVideoInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(extractPosterVideoButton);

    const source = new Source();
    source.fileId = fileId;

    const extractPosterSpecification = new ExtractPosterSpecification();
    const posterFilePath = '/test/poster/file_' + Date.now() + '.jpg';
    extractPosterSpecification.destination = new Destination()
      .setPath(posterFilePath)
      .setAcl('public');

    extractPosterSpecification.format = 'jpg';

    extractPosterSpecification.second = 1;

    const extractPosterRequest = new ExtractPosterRequest()
      .addSource(source)
      .addSpecification(extractPosterSpecification);

    mediaPlatform.avManager.extractPoster(extractPosterRequest)
      .then(
        (response) => {
          extractPosterVideoPayload.innerHTML = Prism.highlight(
            JSON.stringify(
              response,
              null,
              2
            ),
            Prism.languages.js
          );
          // start polling
          pollExtractPosterJobStatus(response.groupId);
        },
        () => {
          stopLoading(extractPosterVideoButton);
        }
      );
  });

  function pollExtractPosterJobStatus(jobGroupId) {
    mediaPlatform.jobManager.getJobGroup(jobGroupId)
      .then((response) => {
        extractPosterJobStatus.innerText = 'Polling';

        extractPosterVideoPayload.innerHTML = Prism.highlight(
          JSON.stringify(response, null, 2),
          Prism.languages.js);

        if (response.length) {
          let success = true;
          for (const i in response) {
            // if at least one job has status pending, we break
            if (response[i].status !== 'success') {
              success = false;
              break;
            }
          }

          if (success) {
            stopLoading(extractPosterVideoButton);
            extractPosterJobStatus.innerText = 'Success';
            const path = response[0].specification.destination.path;
            extractPosterImage.innerHTML = '<img src=\'//' + imagesHost + path + '\' width=\'400\'/>'
          } else {
            setTimeout(function () {
              pollExtractPosterJobStatus(jobGroupId);
            }, 5000);
          }
        }
      });
  }
})();

// EXTRACT STORYBOARD API
(function () {
  // extractStoryboard video file by id
  const extractStoryboardVideoButton = document.getElementById('extract-storyboard-button');
  const extractStoryboardVideoInput = document.getElementById('extract-storyboard-id-input');
  const extractStoryboardVideoPayload = document.getElementById('extract-storyboard-payload');
  const extractStoryboardImage = document.getElementById('extract-storyboard-image');
  const extractStoryboardJobStatus = document.getElementById('extract-storyboard-job-status');

  extractStoryboardVideoButton.addEventListener('click', function () {
    const fileId = extractStoryboardVideoInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(extractStoryboardVideoButton);

    const source = new Source();
    source.fileId = fileId;

    const extractStoryboardSpecification = new ExtractStoryboardSpecification();
    const storyboardFilePath = '/test/storyboard/file_' + Date.now() + '.jpg';
    extractStoryboardSpecification.destination = new Destination()
      .setPath(storyboardFilePath)
      .setAcl('public');

    extractStoryboardSpecification.format = 'jpg';

    extractStoryboardSpecification.columns = 6;
    extractStoryboardSpecification.rows = 4;
    extractStoryboardSpecification.tileWidth = 200;
    extractStoryboardSpecification.tileHeight = 100;
    const extractStoryboardRequest = new ExtractStoryboardRequest()
      .addSource(source)
      .addSpecification(extractStoryboardSpecification);

    mediaPlatform.avManager.extractStoryboard(extractStoryboardRequest)
      .then(
        (response) => {
          extractStoryboardVideoPayload.innerHTML = Prism.highlight(
            JSON.stringify(response,
              null,
              2
            ),
            Prism.languages.js
          );

          // start polling
          pollExtractStoryboardJobStatus(response.groupId);
        },
        () => {
          stopLoading(extractStoryboardVideoButton);
        }
      );
  });

  function pollExtractStoryboardJobStatus(jobGroupId) {
    mediaPlatform.jobManager.getJobGroup(jobGroupId)
      .then((response) => {
        extractStoryboardJobStatus.innerText = 'Polling';

        extractStoryboardVideoPayload.innerHTML = Prism.highlight(
          JSON.stringify(response, null, 2),
          Prism.languages.js);

        if (response.length) {
          let success = true;
          for (const i in response) {
            // if at least one job has status pending, we break
            if (response[i].status !== 'success') {
              success = false;
              break;
            }
          }

          if (success) {
            stopLoading(extractStoryboardVideoButton);
            extractStoryboardJobStatus.innerText = 'Success';
            const path = response[0].specification.destination.path;
            extractStoryboardImage.innerHTML = '<img src=\'//' + imagesHost + path + '\' width=\'400\'/>'
          } else {
            setTimeout(function () {
              pollExtractStoryboardJobStatus(jobGroupId);
            }, 5000);
          }
        }
      });
  }
})();

// FLOW Manager API
(function () {
  // flow manager file by id
  const flowManagerButton = document.getElementById('flow-manager-button');
  const flowManagerInput = document.getElementById('flow-manager-id-input');
  const flowManagerPayload = document.getElementById('flow-manager-payload');
  const flowManagerJobStatus = document.getElementById('flow-manager-job-status');

  flowManagerButton.addEventListener('click', function () {
    const fileUrl = flowManagerInput.value;
    if (!fileUrl) {
      console.log('please specify URL');
      return
    }

    startLoading(flowManagerButton);

    const invocation = new Invocation()
      .addEntryPoint('import');

    const importFileRequest = new ImportFileRequest()
      .setDestination(new Destination().setPath('/testflow/imported/file_' + Date.now() + '.mp4').setAcl('public'))
      .setSourceUrl(fileUrl);

    const importComponent = new FlowComponent()
      .setType('file.import')
      .setSpecification(importFileRequest)
      .addSuccessor('transcode');

    const transcodeSpecification = new TranscodeSpecification()
      .setDestination(new Destination()
        .setDirectory('/testflow/transcoded')
        .setAcl('public')
      ).setQualityRange(new QualityRange({
        minimum: '240p',
        maximum: '1440p'
      }));

    const transcodeComponent = new FlowComponent()
      .setType('av.transcode')
      .setSpecification(transcodeSpecification)
      .setSuccessors([]);

    const createFlowRequest = new CreateFlowRequest()
      .setInvocation(invocation)
      .addFlowComponent('import', importComponent)
      .addFlowComponent('transcode', transcodeComponent);


    mediaPlatform.flowManager.createFlow(createFlowRequest)
      .then(data => {
        flowManagerPayload.innerHTML = Prism.highlight(
          JSON.stringify(data, null, 2),
          Prism.languages.js
        );

        // start polling
        pollFlowManagerJobStatus(data.id);
      });
  });

  function pollFlowManagerJobStatus(flowId) {
    mediaPlatform.flowManager.getFlow(flowId)
      .then((response) => {
        flowManagerJobStatus.innerText = 'Polling';

        const t = setTimeout(function () {
          pollFlowManagerJobStatus(flowId);
        }, 5000);

        if (response && response.flow && Object.keys(response.flow).length) {
          flowManagerPayload.innerHTML = Prism.highlight(
            JSON.stringify(response, null, 2),
            Prism.languages.js);

          let success = true;
          let failed = false;
          for (const i in response.flow) {
            // if at least one job has status error, we break
            if (response.flow[i].status === 'error') {
              failed = true;
              break;
            }
            // if at least one job has status pending, we break
            if (response.flow[i].status !== 'success') {
              success = false;
              break;
            }
          }

          if (failed) {
            stopLoading(flowManagerButton);
            clearTimeout(t);
            flowManagerJobStatus.innerText = 'Error';
          } else if (success) {
            stopLoading(flowManagerButton);
            clearTimeout(t);
            flowManagerJobStatus.innerText = 'Success';
          }
        }

      });
  }
})();

// File Import API
(function () {
  // import file from url
  const fileImportButton = document.getElementById('file-import-button');
  const fileImportInput = document.getElementById('file-import-id-input');
  const fileImportPayload = document.getElementById('file-import-payload');
  const fileImportJobStatus = document.getElementById('file-import-job-status');

  fileImportButton.addEventListener('click', function () {
    const fileUrl = fileImportInput.value;
    if (!fileUrl) {
      console.log('please specify URL');
      return
    }

    startLoading(fileImportButton);

    const importFileRequest = new ImportFileRequest()
      .setDestination(
        new Destination()
          .setPath('/testimport/file_' + Date.now() + '.mp4')
          .setAcl('public')
      )
      .setSourceUrl(fileUrl);


    mediaPlatform.fileManager.importFile(importFileRequest)
      .then(data => {
        fileImportPayload.innerHTML = Prism.highlight(
          JSON.stringify(data, null, 2),
          Prism.languages.js
        );

        // start polling
        pollFileImportJobStatus(data.id);
      });
  });

  function pollFileImportJobStatus(jobId) {
    mediaPlatform.jobManager.getJob(jobId)
      .then((response) => {
        fileImportJobStatus.innerText = 'Polling';

        const t = setTimeout(function () {
          pollFileImportJobStatus(jobId);
        }, 5000);


        if (response && response.id) {
          fileImportPayload.innerHTML = Prism.highlight(
            JSON.stringify(response, null, 2),
            Prism.languages.js);

          let failed = false;
          let success = false;
          // if at least one job has status error, we break
          if (response.status === 'error') {
            failed = true;
          }
          // if at least one job has status pending, we break
          if (response.status !== 'success') {
            success = false;
          }

          if (failed) {
            stopLoading(fileImportButton);
            clearTimeout(t);
            fileImportJobStatus.innerText = 'Error';
          } else if (success) {
            stopLoading(fileImportButton);
            clearTimeout(t);
            fileImportJobStatus.innerText = 'Success';
          }
        }
      });
  }
})();

// Image Extraction API
(function () {
  // extract by file id
  const extractImageByIdButton = document.getElementById('extract-image-by-id-button');
  const extractImageByIdInput = document.getElementById('extract-image-by-id-input');
  const extractImageByIdPayload = document.getElementById('extract-image-by-id-payload');

  extractImageByIdButton.addEventListener('click', function () {
    const id = extractImageByIdInput.value;
    if (!id) {
      console.log('please specify file id');
      return
    }

    startLoading(extractImageByIdButton);
    mediaPlatform.imageExtractionManager.extractImageById(id)
      .then(
        (response) => {
          stopLoading(extractImageByIdButton);
          extractImageByIdPayload.innerHTML = Prism.highlight(
            JSON.stringify(
              response,
              null,
              2
            ),
            Prism.languages.js
          );
        }
      )
  });

  // extract by file path
  const extractImageByPathButton = document.getElementById('extract-image-by-path-button');
  const extractImageByPathInput = document.getElementById('extract-image-by-path-input');
  const extractImageByPathPayload = document.getElementById('extract-image-by-path-payload');

  extractImageByPathButton.addEventListener('click', function () {
    const path = extractImageByPathInput.value;
    if (!path) {
      console.error('please specify file path');
      return
    }

    startLoading(extractImageByPathButton);
    mediaPlatform.imageExtractionManager.extractImageByFilePath(path)
      .then(
        (response) => {
          stopLoading(extractImageByPathButton);
          extractImageByPathPayload.innerHTML = Prism.highlight(
            JSON.stringify(
              response,
              null,
              2
            ),
            Prism.languages.js
          );
        }
      );
  });
})();

// Packaging Service
(function () {
  const packagingServiceInputFilePath = document.getElementById('packaging-service-input-file-path');
  const packagingServiceInputFileName = document.getElementById('packaging-service-input-file-name');
  const packagingServiceInputDirectory = document.getElementById('packaging-service-input-directory');
  const packagingServiceInputAcl = document.getElementById('packaging-service-input-acl');
  const packagingServiceInputChunkDuration = document.getElementById('packaging-service-input-chunk-duration');
  const packagingServiceInputPackageType = document.getElementById('packaging-service-input-package-type');
  const packagingServiceButton = document.getElementById('packaging-service-button');
  const packagingServicePayload = document.getElementById('packaging-service-payload');

  packagingServiceButton.addEventListener('click', function () {
    const path = packagingServiceInputFilePath.value;
    const name = packagingServiceInputFileName.value;
    const directory = packagingServiceInputDirectory.value;
    const acl = packagingServiceInputAcl.value;
    const chunkDuration = packagingServiceInputChunkDuration.value;
    const packageType = packagingServiceInputPackageType.value;

    startLoading(packagingServiceButton);
    mediaPlatform
      .avManager
      .packageVideo({
        sources: [{
          path,
          name
        }],
        directory: directory,
        acl: acl,
        chunkDuration: chunkDuration,
        packageType: packageType
      })
      .then(function (response) {
        stopLoading(packagingServiceButton);
        packagingServicePayload.innerHTML = Prism.highlight(
          JSON.stringify(response || error, null, 2),
          Prism.languages.js
        );
      });
  });
})();
