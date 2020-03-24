import {rotateSides, determineVPFromPlacement} from "./SmallHexMap";

describe('rotateSides()', () => {
  it('returns array with identical sides if rotation is 0', () => {
    const testArray = [['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']]
    const result = rotateSides(testArray,0)
    expect(result).toStrictEqual([['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']])
  })

  it('returns array with correctly rotated sides if rotation is 1', () => {
    const testArray = [['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']]
    const result = rotateSides(testArray,1)
    expect(result).toStrictEqual([['K','L'],['A','B'],['C','D'],['E','F'],['G','H'],['I','J']])
  })

  it('returns array with correctly rotated sides if rotation is 2', () => {
    const testArray = [['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']]
    const result = rotateSides(testArray,2)
    expect(result).toStrictEqual([['I','J'],['K','L'],['A','B'],['C','D'],['E','F'],['G','H']])
  })

  it('returns array with correctly rotated sides if rotation is 3', () => {
    const testArray = [['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']]
    const result = rotateSides(testArray,3)
    expect(result).toStrictEqual([['G','H'],['I','J'],['K','L'],['A','B'],['C','D'],['E','F']])
  })

  it('returns array with correctly rotated sides if rotation is 4', () => {
    const testArray = [['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']]
    const result = rotateSides(testArray,4)
    expect(result).toStrictEqual([['E','F'],['G','H'],['I','J'],['K','L'],['A','B'],['C','D']])
  })

  it('returns array with correctly rotated sides if rotation is 5', () => {
    const testArray = [['A','B'],['C','D'],['E','F'],['G','H'],['I','J'],['K','L']]
    const result = rotateSides(testArray,5)
    expect(result).toStrictEqual([['C','D'],['E','F'],['G','H'],['I','J'],['K','L'],['A','B']])
  })
})

// describe('determineVPFromPlacement()', () => {
//   it('returns 0', () => {
//     const testArray = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J'], ['K', 'L']]
//     const result = determineVPFromPlacement(testArray, [])
//     expect(result).toStrictEqual(0)
//   })
// })