import {Machine, assign, sendParent} from "xstate";

export const buildingPlacerStateMachine = Machine({
    id: 'buildingPlacerMachine',
    context: {
      building: '',
      freeResource: false
    },
    initial: 'PlacingBuilding',
    states: {
      PlacingBuilding: {
        on: {
          placedBuilding: {
            actions: ['setFreeResource'],
            target: 'PlacedBuilding',
          }
        }
      },
      PlacedBuilding: {
        on: {
          '': [
            { target: 'SelectFreeResource', cond: 'freeResourceToChoose' },
            { target: 'Complete' },
          ]
        }
      },
      SelectFreeResource: {
        on: {
          selectedFreeResource: {
            actions: assign({freeResource: false}),
            target: 'Complete'
          }
        }
      },
      Complete: { type: 'final' }
    }
  },
  {
    actions: {
      setFreeResource: assign({freeResource: (context, event) => event.freeResource }),
      placedBuilding: sendParent(context => ({ type: 'placedBuilding', freeResource: context.freeResource }))
    },
    guards: {
      freeResourceToChoose: context => context.freeResource === true,
    }
  })