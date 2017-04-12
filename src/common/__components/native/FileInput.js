import React from 'react';
import { View, Text, TextInput , Picker} from 'react-native'
import { connect } from 'react-redux';

import { PopupMenu, RenderSimple, RenderHighlight } from '../PopupMenu';
import { appError } from '../../app/actions'

// import RNFS from 'react-native-fs'
const RNFS = require('react-native-fs');

const readRootDir = () => {
  // get a list of files and directories in the main bundle
  // console.log('test-m', RNFS.MainBundlePath)
  // console.log('test-c', RNFS.CachesDirectoryPath)
  // console.log('test-d', RNFS.DocumentDirectoryPath)
  // console.log('test-e', RNFS.ExternalDirectoryPath)
  // console.log('test-es', RNFS.ExternalStorageDirectoryPath)
  // console.log('test-t', RNFS.TemporaryDirectoryPath)
  // console.log('test-L', RNFS.LibraryDirectoryPath)
  // console.log('test-P', RNFS.PicturesDirectoryPath)


  let root = RNFS.ExternalStorageDirectoryPath + '/FinanGo'
  // let root = RNFS.DocumentDirectoryPath
  // console.log('root', root);

  RNFS.readDir(root)
    .then((result) => {
      console.log('GOT RESULT', JSON.stringify(result))
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
}

// create a path you want to write to

const writeTest = () => {
  var path = RNFS.ExternalStorageDirectoryPath + '/FinanGo/test-finango.txt';
  // write the file
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}
const makeDir = () => {
  var path = RNFS.ExternalStorageDirectoryPath + '/FinanGo';
  // write the file
  RNFS.mkdir(path)
    .then((success) => {
      console.log('ura, dir!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const getFSInfoTest = () => {
  RNFS.getFSInfo().then(info => {
    console.log(JSON.stringify(info))
  });
}

class FileInput extends React.Component {
// const FileInput = (__props) => {
  componentWillMount() {
    this.popups = {

      importName: {
        pos: { maxHeight: 146 },
        getSuggestions: () => [{title: 'qwer'}, {title: 'asdfg'}, {title: 'zxcvb'}, {title: 'poiuyt'}, {title: 'lkjhgf'}, {title: 'mnbvc'}],
        renderSuggestion: RenderSimple,
        onSelect: suggestion => {
          // this.props.fields.groupTitle.onChangeText(suggestion.title)
          // this.props.fields.__refs.groupTitle.focus()
        }
      }

    }
  }

  componentWillReceiveProps(nextProps) {
    let { fields } = nextProps
    console.log('file input query', fields.__query);
    if (fields.__query === 'e') {
      this.props.appError(new Error('QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! QUQUQUQUQU-SYAKA!!! '))
    }
  }

  render() {
    // let { placeholder, value, style, onChangeText, $ref } = this.props
    // let props = { placeholder, value, style, onChangeText, ref: $ref }
    // console.log('prorprorrp', Object.keys(this.props), props.ref, this.props.ref, this.props.$ref);


    // let { fields, $ref, ...props } = this.props
    // props.ref = $ref

    let { fields, placeholder, value, style, onChangeText, $ref } = this.props
    let props = { placeholder, value, style, onChangeText, ref: $ref }


    // console.log('props', Object.keys(props), Object.keys(fields), fields.__name);


    // let props = Object.assign({}, this.props)
    // props.ref = this.props.$ref // rename $ref -> ref
    // delete props.$ref
    //
    // let fields = {
    //   __name: importName,
    // }
    //     popup = this.props.popups[fields.__name]
    // // console.log('cwrp6 menu, name:', fields.__name, 'new:', fields.__query, 'old:', this.popup && this.popup.query);
    // // console.log('popup el:', fields.element);
    // this.popup = popup
    // if (popup) {
    //   popup.query = fields.__query
    //   popup.element = fields.__element


    return (
      <PopupMenu
        popups={this.popups}
        fields={fields}
      >
        <View style={{flexDirection: 'row'}}>

        <TextInput
          { ...props }
          returnKeyType='done'
          keyboardType='default'
        />
    </View>
      </PopupMenu>

    )
  }

}

export default connect(
  null,
  { appError }
)(FileInput)

const importFile = path => {
  Promise.all([RNFS.stat(path), path])
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
}

//
// constructor(props) {
//   super(props)
//   this.state = this.init
// }

init = {
  listIndex: undefined,
  fileList: [],
  pickerList: []
}

// componentDidMount() {
//   this.readAppDir()
// }

readAppDir = () => {
  let root = RNFS.ExternalStorageDirectoryPath + '/FinanGo'
  // let root = RNFS.DocumentDirectoryPath
  // console.log('root', root);

  RNFS.readDir(root)
    .then((fileList) => {
      // console.log('GOT RESULT', JSON.stringify(fileList))
      let data
      if (fileList.length) {
        fileList.unshift({name: 'Select file'})
        fileList.forEach((item, i) => item.index = i)
        data = {
          listIndex: 0,
          fileList,
          pickerList: fileList.map((item, i) => <Picker.Item key={i} label={item.name} value={i} />),
        }
      } else data = this.init
      // console.log('GOT RESULT', JSON.stringify(data.fileList))
      this.setState(data)
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
}

readAppFile = () => {
  let { index } = this.props.value
  if (!index) return
  importFile(this.state.fileList[index].path)
}

onValueChange = index => {
  this.props.onChangeText({
    // target: { files: index ? [this.state.fileList[index]] : '' }
    target: { files: index ? [this.state.fileList[index]] : '' }
  })
  // this.setState({ index })
}
