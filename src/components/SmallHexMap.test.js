import {rotateSides, determineVPFromPlacement} from "./SmallHexMap";
import {defineGrid, extendHex} from "honeycomb-grid";

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

describe('determineVPFromPlacement()', () => {
  it('returns 0', () => {
    const Hex = extendHex({
      size: 24,
      orientation: 'flat',
      rotation: 0
    })
    const Grid = defineGrid(Hex)
    const displayedTiles = Grid.hexagon({
      radius: 1,
      center: [1, 1]
    })
    displayedTiles.splice(displayedTiles.indexOf([0,2]), 1) // no tile to SW
    displayedTiles.get([0,1]).set({x: 0, y: 1, sides: [ ['W','W'],['W','W'],['F','W'],['W','W'],['W','W'],['W','W'] ], rotation: 0}) // no match NW
    displayedTiles.get([1,0]).set({x: 1, y: 0, sides: [ ['W','W'],['W','W'],['D','W'],['W','W'],['W','W'],['W','W'] ], rotation: 0}) // match N
    displayedTiles.get([1,2]).set({x: 1, y: 2, sides: [ ['W','W'],['W','W'],['W','W'],['W','W'],['W','W'],['W','W'] ], rotation: 0}) // no match S
    displayedTiles.get([2,1]).set({x: 2, y: 1, sides: [ ['W','W'],['W','W'],['W','W'],['W','W'],['W','W'],['W','W'] ], rotation: 0}) // match NE
    displayedTiles.get([2,2]).set({x: 2, y: 2, sides: [ ['W','W'],['W','W'],['W','W'],['W','W'],['W','W'],['D','D'] ], rotation: 0}) // no match SE

    // tile 7 rotated 2 times, sides: [[W,W],[W,W],[W,G],[G,G],[G,F],[F,W]]
    const result = determineVPFromPlacement(displayedTiles, [1,1], 7, 2)
    expect(result).toStrictEqual(2)
  })
})