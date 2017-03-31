export default {

  required: value => Boolean(value),

  isDecimal: value => /^\d*\.?\d+$/.test(value),


}
