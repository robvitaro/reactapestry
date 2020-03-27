import React, {useContext, useState} from 'react';
import {IMAGES} from "../data/images";
import TapestryContext from "./TapestryContext";

const CITY_WIDTH = 9
const CITY_HEIGHT = 9

const City = (props) => {
  const {gameStateService} = useContext(TapestryContext);
  const advanceTurnState = gameStateService.children.get('advanceTurn')
  const placingBuilding = advanceTurnState?.state.matches('PlacingBuilding')

  const [city, setCity] = useState(props.city)
  const [index, setIndex] = useState(props.index)
  const [cityGrid, setCityGrid] = useState(null)
  const [freeResourceGrid, setFreeResourceGrid] = useState([[0, 0, 0],[0, 0, 0],[0, 0, 0]])

  if (!cityGrid) {
    const newCityGrid = new Array(CITY_WIDTH)

    for (let i = 0; i < CITY_WIDTH; i++) {
      newCityGrid[i] = new Array(CITY_HEIGHT);
    }

    const newFreeResourceGrid = [...freeResourceGrid];

    city.dots.forEach((dot) => {
      newCityGrid[dot[0]][[dot[1]]] = 'd'
      const rX = Math.floor(dot[0]/3)
      const rY = Math.floor(dot[1]/3)
      newFreeResourceGrid[rX][rY] = newFreeResourceGrid[rX][rY] + 1
    })

    setCityGrid(newCityGrid)
    setFreeResourceGrid(newFreeResourceGrid)
  }

  const calculateCompletedLines = () => {
    let completedLines = 0
    cityGrid.forEach(column => {
      const filteredColumn = column.filter(obj => obj) // removes undefined
      if (filteredColumn.length === CITY_HEIGHT) completedLines += 1
    })

    const transposed = cityGrid[0].map((col,i) => cityGrid.map(row => row[i]))

    transposed.forEach(column => {
      const filteredColumn = column.filter(obj => obj) // removes undefined
      if (filteredColumn.length === CITY_HEIGHT) completedLines += 1
    })

    return completedLines
  }

  const buildingAdded = (freeResource, completedLines) => {
    gameStateService.send({type: 'placedBuilding', freeResource: freeResource, completedLines: completedLines})
  }

  const addBuilding = (event) => {
    if (placingBuilding) {
      const [x,y] = event.target.id.split('_')
      const building = advanceTurnState.state.context.building.charAt(0)

      const newCityGrid = [...cityGrid];
      newCityGrid[x][y] = building

      const newFreeResourceGrid = [...freeResourceGrid];
      const rX = Math.floor(x/3)
      const rY = Math.floor(y/3)
      newFreeResourceGrid[rX][rY] = newFreeResourceGrid[rX][rY] + 1

      setCityGrid(newCityGrid)
      setFreeResourceGrid(newFreeResourceGrid)

      buildingAdded(newFreeResourceGrid[rX][rY] === 9, calculateCompletedLines())
    }
  }

  const message = () => {
    if (placingBuilding) {
      const building = advanceTurnState.state.context.building
      return <span>Please add <img className='icon-in-text' src={IMAGES[building]} alt={building}/> to your city</span>
    } else {
      return <span>&nbsp;</span>
    }
  }

  const addingBuildingClass = () => {
    if (placingBuilding) {
      const building = advanceTurnState.state.context.building.charAt(0)
      return `adding-${building}`
    } else {
      return ''
    }
  }

  const rows = []

  if(cityGrid != null) {
    for (let y = 0; y < CITY_HEIGHT; y++) {
      rows.push(
        <tr key={`cityRow_${y}`}>
          {
            cityGrid.map((x, index) => {
              return (
                <td key={`cityCell_${index}_${y}`}>
                  <div
                    id={`${index}_${y}`}
                    className={cityGrid[index][y] ? cityGrid[index][y] : addingBuildingClass()}
                    onClick={addBuilding}
                  />
                </td>
              )
            })
          }
        </tr>
      )
    }

    return (
      <div className='city'>
        <p className={'smallMessage animated pulse'}>{message()}</p>
        <table>
          <tbody>
          {rows}
          </tbody>
        </table>
        <h4>{index}: {city.name.toUpperCase()}</h4>
      </div>
    )
  }
}

export default City
