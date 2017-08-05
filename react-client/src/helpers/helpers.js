const validFileType = function (file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}
const returnFileSize = function(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number > 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number > 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}
const fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
]

module.exports = {
  validFileType: validFileType,
  returnFileSize: returnFileSize,
  fileTypes: fileTypes
}