import * as CONST from './_const'

import categories from './categories'
import suggestionsPanel from './suggestionsPanel'
import transaction from './transaction'
import transactionForm from './transactionForm'

const styles = {

  headerColor: CONST._main_,

  button: {
    backgroundColor: '#888',
    color: 'white',
    // paddingVertical: 5,
    paddingTop: 5,
    // paddingBottom: 1,
    // paddingHorizontal: 0,
    outline: 0,
    border: 0,
    borderRadius: 4,
    // cursor: 'pointer',
    height: 26,
    verticalAlign: 'center'
  },

  menu: {
    backgroundColor: CONST._main_,
    position: 'fixed',
    // top: 0,
    // left: 0,
    marginTop: 24,
    paddingVertical: 10,
    width: 150,
  },

  categories,
  suggestionsPanel,
  transaction,
  transactionForm,

}

styles.transactionForm.selected = [
  styles.transactionForm.suggestionView,
  { backgroundColor: '#cce' }
]

export default styles
