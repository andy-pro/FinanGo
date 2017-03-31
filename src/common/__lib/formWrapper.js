import React from 'react';

import validator from './validator'

// let isNative =
//   typeof navigator === 'object' &&
//   navigator.product === 'ReactNative';

const wrapper = forms => WrappedComponent => {

  return class FormWrapper extends React.Component {

    constructor(props) {
      super(props)
      // let isNative = navigator && navigator.product === 'ReactNative'
      const { isNative } = props
      let refName = isNative ? 'ref' : '$ref'
      let fields = {
        __query: '',
        __refs: {},
        __submits: {},
        $setMany: this.onSetMany,
        $reset: this.onReset,
      }
      forms = Array.isArray(forms) ? forms : [forms]
      forms.forEach(form => {
        fields.__submits[form.submit] = this.onSubmit(form)
        form.fields.forEach(field => {
          let { fn, init='', af } = field
          fields[fn] = {
            onChangeText: e => this.onChange(e, fn),
            value: init,
            [refName]: c => fields.__refs[fn] = c
          }
          if (af) {
            fields.__name = fn
            fields[fn].autoFocus = true
          }
        })
      })
      this.state = { fields }
    }

    onChange = (e, name) => {
      let value = typeof e === 'object' ? e.target.value : e
      // console.log('zdrasti from popup', e, name);
      let { fields } = this.state
      fields[name].value = value
      fields.__name = name
      fields.__query = value
      this.setState({ fields: { ...fields } })
    }

    onSetMany = nextFields => {
      let { fields } = this.state
      Object.keys(nextFields).forEach(name => fields[name].value = nextFields[name])
      fields.__name = ''
      fields.__query = ''
      this.setState({ fields: { ...fields } })
    }

    onReset = index => {
      // index - index of form on page to reset, if 'all' - all forms will be resetted
      // get resetted forms
      let rfs = index === 'all' ? forms : [forms[index]]
      let { fields } = this.state
      rfs.forEach(rf => {
        rf.fields.forEach(({ fn, init='', af }) => {
          fields[fn].value = init
          if (af) fields.__refs[fn].focus()
        })
      })
      fields.__name = ''
      fields.__query = ''
      this.setState({ fields: { ...fields } })
    }

    onSubmit = form => e => {
      e.preventDefault()
      let keys = form.fields,
          { fields } = this.state,
          __fields = {}
      for (var i = 0, len = keys.length; i < len; i++) {
        let { fn, vd, pp } = keys[i],
            value = fields[fn].value.trim()
        if (pp) value = pp(value) // postProcessing
        let valid = vd ? validator[vd](value) : true
        if (!valid) {
          this.state.fields.__refs[fn].focus()
          return false
        }
        __fields[fn] = value
      }
      return __fields
    }

    render() {
      // console.log('rnd form wrapped', this.state.fields);
      return (
        <WrappedComponent {...this.props} fields={this.state.fields} />
      );
    }

  };


};

export default wrapper;
