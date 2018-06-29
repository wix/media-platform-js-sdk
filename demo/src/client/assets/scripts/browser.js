var PATH_BASE = '/demo/';

// FILE MANAGEMENT API

(function () {

  // upload file
  var fileUploadButton = document.getElementById('file-management');
  var fileManagementLabel = document.getElementById('file-management-label');
  var fileUploadPayload = document.getElementById('file-management-payload');
  var fileUploadPath = document.getElementById('file-management-path');

  fileUploadButton.addEventListener('change', function () {
    var path = PATH_BASE + this.value.split('\\').pop();
    var file = this.files[0];

    fileUploadPath.innerHTML = path;

    // TODO: make callback optional
    startLoading(fileManagementLabel);
    mediaPlatform.fileManager.deleteFileByPath(path, function (error, response) {
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
  var queuedFileUploadButton = document.getElementById('queued-file-management');
  var queuedFileManagementLabel = document.getElementById('queued-file-management-label');
  var queuedFileUploadPayload = document.getElementById('queued-file-management-payload');
  var queuedFileUploadPath = document.getElementById('queued-file-management-path');

  queuedFileUploadButton.addEventListener('change', function () {
    var path = PATH_BASE + this.value.split('\\').pop();
    var file = this.files[0];

    queuedFileUploadPath.innerHTML = path;


    startLoading(queuedFileManagementLabel);
    mediaPlatform.fileManager.deleteFileByPath(path, function (error, response) {
      var uploadJob = new MP.upload.UploadJob();

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
  var fileListButton = document.getElementById('file-list-button');
  var fileListPayload = document.getElementById('file-list-payload');

  fileListButton.addEventListener('click', function () {
    var listFileRequest = new MP.file.ListFilesRequest().setPageSize(3);

    startLoading(fileListButton);
    mediaPlatform.fileManager
      .listFiles('/demo', listFileRequest, function (error, response) {
        stopLoading(fileListButton);
        if (error) {
          console.error('error', error);
          return
        }

        fileListPayload.innerHTML = Prism.highlight(
          JSON.stringify(response, null, 2),
          Prism.languages.js
        );
      });
  });

  // get file metadata by id
  var fileMetadataButton = document.getElementById('file-metadata-button');
  var fileMetadataInput = document.getElementById('file-metadata-id-input');
  var fileMetadataPayload = document.getElementById('file-metadata-payload');

  fileMetadataButton.addEventListener('click', function () {
    var fileId = fileMetadataInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(fileMetadataButton);
    mediaPlatform.fileManager.getFileMetadataById(fileId, function (error, response) {
      stopLoading(fileMetadataButton);
      fileMetadataPayload.innerHTML = Prism.highlight(
        JSON.stringify(response, null, 2),
        Prism.languages.js);
    });
  })

  // delete file by id
  var fileDeleteButton = document.getElementById('file-delete-button');
  var fileDeleteInput = document.getElementById('file-delete-id-input');
  var fileDeletePayload = document.getElementById('file-delete-payload');

  fileDeleteButton.addEventListener('click', function () {
    var fileId = fileDeleteInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(fileDeleteButton);
    mediaPlatform.fileManager.deleteFileById(fileId, function (error, response) {
      stopLoading(fileDeleteButton);
      fileDeletePayload.innerHTML = Prism.highlight(
        JSON.stringify(response || error, null, 2),
        Prism.languages.js);
    });
  })

  // get secure url
  var downloadUrlButton = document.getElementById('download-url-button');
  var downloadUrlInput = document.getElementById('download-url-input');
  var downloadUrlPayload = document.getElementById('download-url-payload');

  downloadUrlButton.addEventListener('click', function () {
    var path = downloadUrlInput.value;
    if (!path) {
      console.log('please specify file path');
      return
    }

    startLoading(downloadUrlButton);
    mediaPlatform.getDownloadUrl(path, null, function (error, response) {
      stopLoading(downloadUrlButton);
      downloadUrlPayload.innerHTML = Prism.highlight(
        JSON.stringify(response || error, null, 2),
        Prism.languages.js);
    });
  })
})();


// IMAGE API
(function () {
  var imageFile = document.getElementById('image-file');
  var imageFileLabel = document.getElementById('image-file-label');
  var imageOutput = document.getElementById('image-output');
  var imagePayload = document.getElementById('image-payload');
  var imageFilePath = document.getElementById('image-file-path');
  var imageManipulationFilters = document.getElementById('image-manipulation-filters');
  var imageManipulationCode = document.getElementById('image-manipulation-code');
  var imageDescriptor;

  function getImageManipulationCode() {
    var filter = imageManipulationFilters.value.split(';');
    var filterName = filter[0];
    var value = filter[1];

    var filterFnText = filterName && value ? '.' + filterName + '(' + value + ')\n' : '';

    return 'mediaPlatform.fileManager.uploadFile(path, file)\n' +
      '       .on(\'upload-success\', function(event) {\n' +
      '           var image = new MP.Image(event.fileDescriptors[0]);\n\n' +
      '           image.crop(500, 500)\n' +
      '               .jpeg(100, true)\n' +
      '               ' + filterFnText +
      '               .toUrl()\n' +
      '               .url;\n' +
      '  });'

  }

  function parseFilterValue(filterValue) {
    var fnName = filterValue.split(';')[0];
    // to array with numbers
    var args = filterValue.split(';')[1].split(',').map(function (val) {
      return +val
    });

    return [fnName, args];
  }

  imageFile.addEventListener('change', function () {
    var path = PATH_BASE + this.value.split('\\').pop();
    var file = this.files[0];
    var filterValueArr = parseFilterValue(imageManipulationFilters.value);


    imageFilePath.innerHTML = path;

    startLoading(imageFileLabel);
    // TODO: make callback optional
    mediaPlatform.fileManager.deleteFileByPath(path, function (error, response) {
      // do nothing...
    });

    var fnName = filterValueArr[0];
    var args = filterValueArr[1];

    mediaPlatform.fileManager
      .uploadFile(path, file)
      .on('upload-success', function (response) {
        stopLoading(imageFileLabel);
        var descriptors = response.fileDescriptors;
        var descriptor = imageDescriptor = descriptors[0];

        // set payload
        imagePayload.innerHTML = Prism.highlight(
          JSON.stringify(descriptor, null, 2),
          Prism.languages.js);

        var image = new MP.Image(descriptor);

        image
          .crop(500, 500)
          .jpeg(100, true);

        // apply filter
        image[fnName].apply(image, args);

        var url = 'http://' + imagesHost + image.toUrl().url;

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

    if (!imageDescriptor) return

    var filterValueArr = parseFilterValue(this.value);
    var fnName = filterValueArr[0];
    var args = filterValueArr[1];

    var image = new MP.Image(imageDescriptor);

    image
      .crop(500, 500)
      .jpeg(100, true);

    // apply filter
    image[fnName].apply(image, args);

    var url = 'http://' + imagesHost + image.toUrl().url;

    // set image
    imageOutput.setAttribute('src', url);
  });
})();


// VIDEO API
(function () {
  var videoFile = document.getElementById('video-file');
  var videoFileLabel = document.getElementById('video-file-label');
  var videoOutput = document.getElementById('video-output');
  var videoPayload = document.getElementById('video-payload');
  var videoFilePath = document.getElementById('video-file-path');

  videoFile.addEventListener('change', function () {
    var path = PATH_BASE + this.value.split('\\').pop();
    var file = this.files[0];

    videoFilePath.innerHTML = path;

    // TODO: make callback optional
    startLoading(videoFileLabel);
    mediaPlatform.fileManager.deleteFileByPath(path, function (error, response) {
      mediaPlatform.fileManager
        .uploadFile(path, file)
        .on('upload-success', function (event) {
          stopLoading(videoFileLabel);
          var videos = event.fileDescriptors;
          var video = videos[0];
          var url = 'http://' + videosHost + video.path;
          var html = Prism.highlight(JSON.stringify(video, null, 2), Prism.languages.js);

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
  var createArchiveForm = document.getElementById('create-archive-form');
  var createArchiveButton = document.getElementById('create-archive-button');
  var createArchiveInput = document.getElementById('create-archive-id-input');
  var createArchiveDestination = document.getElementById('create-archive-destination-input');
  var createArchiveDestinationAcl = document.getElementById('create-archive-destination-acl-input');
  var createArchiveType = document.getElementById('create-archive-type-input');
  var createArchivePayload = document.getElementById('create-archive-payload');

  createArchiveForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var fileId = createArchiveInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    var destinationPath = createArchiveDestination.value;
    if (!destinationPath) {
      console.log('please specify destination path');
      return
    }

    var archiveType = createArchiveType.value;
    if (!archiveType) {
      console.log('please specify archive type (zip, gzip, etc..)');
      return
    }

    var destinationAcl = createArchiveDestinationAcl.value;
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
  var extractArchiveButton = document.getElementById('extract-archive-button');
  var extractArchiveInput = document.getElementById('extract-archive-id-input');
  var extractArchiveDestination = document.getElementById('extract-archive-destination-input');
  var extractArchiveDestinationAcl = document.getElementById('extract-archive-destination-acl-input');
  var extractArchivePayload = document.getElementById('extract-archive-payload');

  extractArchiveButton.addEventListener('click', function () {
    var fileId = extractArchiveInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    var destinationPath = extractArchiveDestination.value;
    if (!destinationPath) {
      console.log('please specify destination path');
      return
    }

    var destinationAcl = extractArchiveDestinationAcl.value;
    if (!destinationAcl || (destinationAcl !== 'private' && destinationAcl !== 'public')) {
      console.log('please specify destination acl (private or public)');
      return
    }

    var extractArchiveRequest = new ExtractArchiveRequest({
      destination: {
        directory: destinationPath,
        acl: destinationAcl
      },
      source: {
        fileId: fileId
      }
    });

    startLoading(extractArchiveButton);
    mediaPlatform.archiveManager.extractArchive(extractArchiveRequest, function (error, response) {
      stopLoading(extractArchiveButton);
      extractArchivePayload.innerHTML = Prism.highlight(
        JSON.stringify(response || error, null, 2),
        Prism.languages.js);
    });
  })
})();


// TRANSCODE API
(function () {
  // transcode video file by id
  var transcodeVideoButton = document.getElementById('transcode-video-button');
  var transcodeVideoInput = document.getElementById('transcode-video-id-input');
  var transcodeVideoPayload = document.getElementById('transcode-video-payload');
  var transcodeJobStatus = document.getElementById('transcode-job-status');

  transcodeVideoButton.addEventListener('click', function () {
    var fileId = transcodeVideoInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(transcodeVideoButton);

    var source = new Source({
      fileId: fileId
    });

    var transcodeSpecification = new TranscodeSpecification({
      destination: {
        directory: '/test/output',
        acl: 'public'
      },
      qualityRange: {
        minimum: '240p',
        maximum: '1440p'
      }
    });

    var transcodeRequest = new TranscodeRequest()
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
    mediaPlatform.jobManager.getJobGroup(jobGroupId, function (error, response) {
      transcodeJobStatus.innerText = 'Polling';
      transcodeVideoPayload.innerHTML = Prism.highlight(
        JSON.stringify(response, null, 2),
        Prism.languages.js);

      if (response.length) {
        var success = true;
        for (var i in response) {
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
  var extractPosterVideoButton = document.getElementById('extract-poster-button');
  var extractPosterVideoInput = document.getElementById('extract-poster-id-input');
  var extractPosterVideoPayload = document.getElementById('extract-poster-payload');
  var extractPosterImage = document.getElementById('extract-poster-image');
  var extractPosterJobStatus = document.getElementById('extract-poster-job-status');

  extractPosterVideoButton.addEventListener('click', function () {
    var fileId = extractPosterVideoInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(extractPosterVideoButton);

    var source = new Source();
    source.fileId = fileId;

    var extractPosterSpecification = new ExtractPosterSpecification();
    var posterFilePath = '/test/poster/file_' + Date.now() + '.jpg';
    extractPosterSpecification.destination = new Destination()
      .setPath(posterFilePath)
      .setAcl('public');

    extractPosterSpecification.format = 'jpg';

    extractPosterSpecification.second = 1;

    var extractPosterRequest = new ExtractPosterRequest()
      .addSource(source)
      .addSpecification(extractPosterSpecification);

    mediaPlatform.avManager.extractPoster(extractPosterRequest, function (error, response) {
      if (error) {
        stopLoading(extractPosterVideoButton);
        return;
      }

      extractPosterVideoPayload.innerHTML = Prism.highlight(
        JSON.stringify(response, null, 2),
        Prism.languages.js);
      // start polling
      pollExtractPosterJobStatus(response.groupId);
    });
  });

  function pollExtractPosterJobStatus(jobGroupId) {
    mediaPlatform.jobManager.getJobGroup(jobGroupId, function (error, response) {
      extractPosterJobStatus.innerText = 'Polling';

      extractPosterVideoPayload.innerHTML = Prism.highlight(
        JSON.stringify(response, null, 2),
        Prism.languages.js);

      if (response.length) {
        var success = true;
        for (var i in response) {
          // if at least one job has status pending, we break
          if (response[i].status !== 'success') {
            success = false;
            break;
          }
        }

        if (success) {
          stopLoading(extractPosterVideoButton);
          extractPosterJobStatus.innerText = 'Success';
          var path = response[0].specification.destination.path;
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
  var extractStoryboardVideoButton = document.getElementById('extract-storyboard-button');
  var extractStoryboardVideoInput = document.getElementById('extract-storyboard-id-input');
  var extractStoryboardVideoPayload = document.getElementById('extract-storyboard-payload');
  var extractStoryboardImage = document.getElementById('extract-storyboard-image');
  var extractStoryboardJobStatus = document.getElementById('extract-storyboard-job-status');

  extractStoryboardVideoButton.addEventListener('click', function () {
    var fileId = extractStoryboardVideoInput.value;
    if (!fileId) {
      console.log('please specify fileId');
      return
    }

    startLoading(extractStoryboardVideoButton);

    var source = new Source();
    source.fileId = fileId;

    var extractStoryboardSpecification = new ExtractStoryboardSpecification();
    var storyboardFilePath = '/test/storyboard/file_' + Date.now() + '.jpg';
    extractStoryboardSpecification.destination = new Destination()
      .setPath(storyboardFilePath)
      .setAcl('public');

    extractStoryboardSpecification.format = 'jpg';

    extractStoryboardSpecification.columns = 6;
    extractStoryboardSpecification.rows = 4;
    extractStoryboardSpecification.tileWidth = 200;
    extractStoryboardSpecification.tileHeight = 100;
    var extractStoryboardRequest = new ExtractStoryboardRequest()
      .addSource(source)
      .addSpecification(extractStoryboardSpecification);

    mediaPlatform.avManager.extractStoryboard(extractStoryboardRequest, function (error, response) {
      if (error) {
        stopLoading(extractStoryboardVideoButton);
        return;
      }
      extractStoryboardVideoPayload.innerHTML = Prism.highlight(
        JSON.stringify(response, null, 2),
        Prism.languages.js);
      // start polling
      pollExtractStoryboardJobStatus(response.groupId);
    });
  });

  function pollExtractStoryboardJobStatus(jobGroupId) {
    mediaPlatform.jobManager.getJobGroup(jobGroupId, function (error, response) {
      extractStoryboardJobStatus.innerText = 'Polling';

      extractStoryboardVideoPayload.innerHTML = Prism.highlight(
        JSON.stringify(response, null, 2),
        Prism.languages.js);

      if (response.length) {
        var success = true;
        for (var i in response) {
          // if at least one job has status pending, we break
          if (response[i].status !== 'success') {
            success = false;
            break;
          }
        }

        if (success) {
          stopLoading(extractStoryboardVideoButton);
          extractStoryboardJobStatus.innerText = 'Success';
          var path = response[0].specification.destination.path;
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
  var flowManagerButton = document.getElementById('flow-manager-button');
  var flowManagerInput = document.getElementById('flow-manager-id-input');
  var flowManagerPayload = document.getElementById('flow-manager-payload');
  var flowManagerJobStatus = document.getElementById('flow-manager-job-status');

  flowManagerButton.addEventListener('click', function () {
    var fileUrl = flowManagerInput.value;
    if (!fileUrl) {
      console.log('please specify URL');
      return
    }

    startLoading(flowManagerButton);

    var invocation = new Invocation()
      .addEntryPoint('import');

    var importFileRequest = new ImportFileRequest()
      .setDestination(new Destination().setPath('/testflow/imported/file_' + Date.now() + '.mp4').setAcl('public'))
      .setSourceUrl(fileUrl);

    var importComponent = new FlowComponent()
      .setType('file.import')
      .setSpecification(importFileRequest)
      .addSuccessor('transcode');

    var transcodeSpecification = new TranscodeSpecification()
      .setDestination(new Destination()
        .setDirectory('/testflow/transcoded')
        .setAcl('public')
      ).setQualityRange(new QualityRange({
        minimum: '240p',
        maximum: '1440p'
      }));

    var transcodeComponent = new FlowComponent()
      .setType('av.transcode')
      .setSpecification(transcodeSpecification)
      .setSuccessors([]);

    var createFlowRequest = new CreateFlowRequest()
      .setInvocation(invocation)
      .addFlowComponent('import', importComponent)
      .addFlowComponent('transcode', transcodeComponent);


    mediaPlatform.flowManager.createFlow(createFlowRequest, function (error, data) {
      flowManagerPayload.innerHTML = Prism.highlight(
        JSON.stringify(data, null, 2),
        Prism.languages.js);
      // start polling
      pollFlowManagerJobStatus(data.id);
    });

  });

  function pollFlowManagerJobStatus(flowId) {
    mediaPlatform.flowManager.getFlow(flowId, function (error, response) {
      flowManagerJobStatus.innerText = 'Polling';

      var t = setTimeout(function () {
        pollFlowManagerJobStatus(flowId);
      }, 5000);


      if (response && response.flow && Object.keys(response.flow).length) {
        flowManagerPayload.innerHTML = Prism.highlight(
          JSON.stringify(response, null, 2),
          Prism.languages.js);

        var success = true;
        var failed = false;
        for (var i in response.flow) {
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
  var fileImportButton = document.getElementById('file-import-button');
  var fileImportInput = document.getElementById('file-import-id-input');
  var fileImportPayload = document.getElementById('file-import-payload');
  var fileImportJobStatus = document.getElementById('file-import-job-status');

  fileImportButton.addEventListener('click', function () {
    var fileUrl = fileImportInput.value;
    if (!fileUrl) {
      console.log('please specify URL');
      return
    }

    startLoading(fileImportButton);

    var importFileRequest = new ImportFileRequest()
      .setDestination(new Destination().setPath('/testimport/file_' + Date.now() + '.mp4').setAcl('public'))
      .setSourceUrl(fileUrl);


    mediaPlatform.fileManager.importFile(importFileRequest, function (error, data) {
      fileImportPayload.innerHTML = Prism.highlight(
        JSON.stringify(data, null, 2),
        Prism.languages.js);
      // start polling
      pollFileImportJobStatus(data.id);
    });

  });

  function pollFileImportJobStatus(jobId) {
    mediaPlatform.jobManager.getJob(jobId, function (error, response) {
      fileImportJobStatus.innerText = 'Polling';

      var t = setTimeout(function () {
        pollFileImportJobStatus(jobId);
      }, 5000);


      if (response && response.id) {
        fileImportPayload.innerHTML = Prism.highlight(
          JSON.stringify(response, null, 2),
          Prism.languages.js);

        var failed = false;
        var success = false;
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
  var extractImageByIdButton = document.getElementById('extract-image-by-id-button');
  var extractImageByIdInput = document.getElementById('extract-image-by-id-input');
  var extractImageByIdPayload = document.getElementById('extract-image-by-id-payload');

  extractImageByIdButton.addEventListener('click', function () {
    var id = extractImageByIdInput.value;
    if (!id) {
      console.log('please specify file id');
      return
    }

    startLoading(extractImageByIdButton);
    mediaPlatform.imageExtractionManager.extractImageById(id, null, function (error, response) {
      stopLoading(extractImageByIdButton);
      extractImageByIdPayload.innerHTML = Prism.highlight(
        JSON.stringify(response || error, null, 2),
        Prism.languages.js);
    });
  });

  // extract by file path
  var extractImageByPathButton = document.getElementById('extract-image-by-path-button');
  var extractImageByPathInput = document.getElementById('extract-image-by-path-input');
  var extractImageByPathPayload = document.getElementById('extract-image-by-path-payload');

  extractImageByPathButton.addEventListener('click', function () {
    var path = extractImageByPathInput.value;
    if (!path) {
      console.log('please specify file path');
      return
    }

    startLoading(extractImageByPathButton);
    mediaPlatform.imageExtractionManager.extractImageByFilePath(path, null, function (error, response) {
      stopLoading(extractImageByPathButton);
      extractImageByPathPayload.innerHTML = Prism.highlight(
        JSON.stringify(response || error, null, 2),
        Prism.languages.js);
    });
  })
})();

// Packaging Service
(function () {
  var packagingServiceInputFilePath = document.getElementById('packaging-service-input-file-path');
  var packagingServiceInputFileName = document.getElementById('packaging-service-input-file-name');
  var packagingServiceInputDirectory = document.getElementById('packaging-service-input-directory');
  var packagingServiceInputAcl = document.getElementById('packaging-service-input-acl');
  var packagingServiceInputChunkDuration = document.getElementById('packaging-service-input-chunk-duration');
  var packagingServiceInputPackageType = document.getElementById('packaging-service-input-package-type');
  var packagingServiceButton = document.getElementById('packaging-service-button');
  var packagingServicePayload = document.getElementById('packaging-service-payload');

  packagingServiceButton.addEventListener('click', function () {
    var path = packagingServiceInputFilePath.value;
    var name = packagingServiceInputFileName.value;
    var directory = packagingServiceInputDirectory.value;
    var acl = packagingServiceInputAcl.value;
    var chunkDuration = packagingServiceInputChunkDuration.value;
    var packageType = packagingServiceInputPackageType.value;

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
