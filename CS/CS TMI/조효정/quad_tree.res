
open Belt
// gg 자바스크립트 -> 리스크립트 변환 실패했습니다
let input = [[1, 1, 0, 0], [0, 0, 0, 1], [1, 1, 0, 0], [1, 1, 0, 0]]

let quadTree = len => {
  let compressResult = []

  let rec recursion = (n, x, y) => {
    let total = 0

    input->Array.forEachWithIndex((index, _) => {
      input->Array.forEachWithIndex((i, _) => {
        let col = input[y + i]->Option.getExn
        let row = col[x + index]->Option.getExn

        (total + row)->ignore
        (total + row)->Js.log
      })
    })

    input->Array.reduceWithIndex(total, (acc, _, i) => {
      for j in 0 to len {
        let col = input[y + j]->Option.getExn
        let row = col[x + i]->Option.getExn

        (total + row)->ignore
      }

      // input->Array.forEachWithIndex((index, _) => {
      //   let col = input[y + i]->Option.getExn
      //   let row = col[x + index]->Option.getExn

      //   (acc + row)->Js.log
      // })
    })

    total->Js.log
  }

  recursion(len, 0, 0)

  compressResult
}

quadTree(input->Array.length)->Js.log

// let sortInTraversalOrder = (array, index, length) => {
//   switch index == 0 {
//   | true =>
//     array->Array.mapWithIndex((i, _) => {
//       array[length - 1 - i]->Option.getWithDefault(0)
//     })
//   | false =>
//     array->Array.mapWithIndex((i, _) => {
//       array[i]->Option.getWithDefault(0)
//     })
//   }
// }

// let numberToColor = arr =>
//   switch arr->Array.reduce(0, (a, b) => a + b) {
//   | 0 => "w"
//   | 4 => "b"
//   | _ => `p${arr->Array.map(a => a == 0 ? "w" : "b")->Js.Array2.joinWith("")}`
//   }

// basic
// ->Array.mapWithIndex((index, array) => sortInTraversalOrder(array, index, basic->Array.length))
// ->Array.concatMany
// ->numberToColor
// ->Js.log
