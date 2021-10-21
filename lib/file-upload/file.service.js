const fs = require('fs');
const db = require('../shared/dataSource');
const File = db.File;

async function findAllPhotos() {
  return await File.find();
}

async function findPhotoById(id) {
  return await File.findById(id);
}

function uploadNewPhoto(newPhoto) {
  const imageSrc = fs.readFileSync(newPhoto.path);

  const imageObject = {
    contentType: newPhoto.mimetype,
    fileName: newPhoto.originalname,
    image: imageSrc
  };

  const fileModel = new File(imageObject);
  return fileModel.save().then(data => {
    let uploadedId = { uploadId: data._id };
    return uploadedId;
  }).catch(err => {
    throw err;
  })
}

module.exports = {
  uploadNewPhoto,
  findPhotoById,
  findAllPhotos
};
