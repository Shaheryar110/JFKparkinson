import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
export const uploadImage = async (prevImageUri: string, imageUri: string) => {
  let reference: FirebaseStorageTypes.Reference;
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36);

  if (prevImageUri && typeof prevImageUri !== 'string') {
    reference = storage().refFromURL(prevImageUri);
  } else {
    reference = storage().ref(`/images/${timestamp+randomString}.jpg`);
  }

  return reference
    .putFile(imageUri)
    .then(_ => reference.getDownloadURL()) //storage url download
    .then(url => url) //return storage url of image
    .catch(err => console.log(err)); // return error
};