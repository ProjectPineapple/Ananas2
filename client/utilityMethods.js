// from https://stackoverflow.com/questions/3883342/add-commas-to-a-number-in-jquery
const commaSeparateNumber = val => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return val
}

export default commaSeparateNumber
