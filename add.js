const arr = process.argv

const a = arr[2]
const b = arr[3]

console.log(add(a, b))

function add(a, b) {
  return Number(a) + Number(b)
}
