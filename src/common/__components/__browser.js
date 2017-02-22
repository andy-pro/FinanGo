import Match from './Match'
import Checkbox from './Checkbox'
import ListView from './ListView'
import Icon from './icons/Ionicons';
// import DatePicker from './DatePicker'
// import AutosuggestForm from './AutosuggestForm';

import {
  Text,
  View,
  Form,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from './fela'

const Alert = {
  alert: (hdr, msg, btns) => {
    if (msg) hdr = hdr + '\n' + msg
    if (!btns) alert(hdr)
    else if (confirm(hdr)) btns[1].onPress()
  }
}


export {
  Text,
  View,
  Form,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Match,
  Checkbox,
  ListView,
  Icon,
  Alert,
  // DatePicker,
  // AutosuggestForm,
  // StyleSheet,
}
