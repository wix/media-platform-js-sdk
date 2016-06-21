/**
 * @constructor
 */
function AudioFile() {
    
    this.format = null;
    
    this.channels = null;
    
    this.sampleSize = null;
    
    this.sampleRate = null;
    
    this.duration = null;
    
    this.bitrate = null;
}

/**
 * @type {AudioFile}
 */
module.exports = AudioFile;

//         "file_input": {
//             "format": "mp3",
//             "channels": 2,
//             "sample_size": 16,
//             "sample_rate": 44100,
//             "duration": 215883,
//             "bitrate": 128000
//         }