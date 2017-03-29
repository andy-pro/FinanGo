// download & upload for react-native

import { Observable } from 'rxjs'

// import RNFS from 'react-native-fs'
const RNFS = require('react-native-fs');

function download(data, filename) {}
//     var a = document.createElement("a"),
//         file = new Blob([data], {type: 'text/plain;charset=utf-8'});
//     if (window.navigator.msSaveOrOpenBlob) // IE10+
//         window.navigator.msSaveOrOpenBlob(file, filename);
//     else { // Others
//         var url = URL.createObjectURL(file);
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         setTimeout(function() {
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(url);
//         }, 0);
//     }
// }

//
// function upload(file) {
//   // check File API
//   if (window.File && window.FileReader && window.FileList && window.Blob) {
//       let reader = new FileReader();
//       let r = Observable.fromEvent(reader, 'load')
//         .map(e => JSON.parse(e.target.result))
//       reader.readAsText(file);
//       return r
//   } else return Observable.throw(new Error('The File APIs are not fully supported by your browser.'))
//
// }



function upload({ path }) {

  return Observable.fromPromise(Promise.all([RNFS.stat(path), path]))
    .flatMap(stat => {
      // console.log('QUQUQUQU', stat);
      if (stat[0].isFile()) {
        // if we have a file, read it
        return Observable.fromPromise(RNFS.readFile(stat[1], 'utf8'))
      } else return Observable.throw(new Error('Not file.'))
    })
    .map((contents) => {
      // console.log('QUQU-SYAKA', contents);
      return JSON.parse(contents);
    })

}

// const readFile = path =>
//
//     .map()
  //     .then((statResult) => {
  //       if (statResult[0].isFile()) {
  //         // if we have a file, read it
  //         return RNFS.readFile(statResult[1], 'utf8');
  //       }
  //
  //       return 'no file';
  //     })
  //     .then((contents) => {
  //       // log the file contents
  //       console.log('QUQU-SYAKA', contents);
  //       JSON.parse(contents);
  //     })
  //     .catch((err) => {
  //       // console.log(err.message, err.code);
  //       return err
  //     })
  // )

export { download, upload }