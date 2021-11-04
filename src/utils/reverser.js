const reverseArray = arr =>  arr.sort((a, b) => b - a).reverse()
const reverseArrayObj = arr => arr.sort((a, b) => a.id > b.id ? 1 : -1).reverse()

export default { reverseArray, reverseArrayObj }
