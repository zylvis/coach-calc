import Resizer from "react-image-file-resizer";
  
  
const ResizeToBase64 = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      "JPEG",
      25,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      200,
      200
    );
  });

  export default ResizeToBase64;


// const ConvertToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// };
// export default ConvertToBase64;