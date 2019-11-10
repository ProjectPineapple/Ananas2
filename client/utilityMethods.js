// from https://stackoverflow.com/questions/3883342/add-commas-to-a-number-in-jquery
export const centsToPrice = val => {
  val = val / 100
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  if (val[val.length - 2] === '.') {
    val += '0'
  }
  val = '$' + val
  return val
}

export const getActualQuantity = product => {
  return product.stock < product.OrderLineItem.quantity
    ? product.stock
    : product.OrderLineItem.quantity
}
