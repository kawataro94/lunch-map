import { storage } from "./resource"


export const uploadStoreImage = (file) => {

  const fileName = file.name;
  const storageRef = storage.ref(fileName);
  storageRef.put(file).then(function (snapshot) {
    console.log('Uploaded a blob or file!');
  });
}