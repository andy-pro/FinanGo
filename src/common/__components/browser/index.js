import HeaderBar from '../HeaderBar'
import Match from '../Match'
import Checkbox from '../Checkbox'
import FormWrapper from '../FormWrapper'
// import TwistedView from '../TwistedView'
import ListView from './ListView'
import Icon from './icons/Ionicons';
import Link from '../../../browser/app/components/Link'
import MenuLink from './MenuLink'
// import Picker from './Picker'
// import DatePicker from './DatePicker'

import {
  Text,
  View,
  Form,
  Button,
  TextInput,
  FileInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker,
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
  FileInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  HeaderBar,
  Match,
  Checkbox,
  ListView,
  Icon,
  Alert,
  Link,
  MenuLink,
  Picker,
  FormWrapper,
  // TwistedView,
  // DatePicker,
}
