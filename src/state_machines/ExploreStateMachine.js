import {Machine, assign} from "xstate";

export const exploreStateMachine = Machine({
    id: 'exploreMachine',
    context: {
      tile: 0
    },
    initial: 'ChoosingTile',
    states: {
      ChoosingTile: {
        on: {
          exploringWithTile: {
            actions: 'setTile',
            target: 'Exploring',
          }
        }
      },
      Exploring: {
        on: {
          explored: {
            target: 'Complete'
          }
        }
      },
      Complete: { type: 'final' }
    }
  },
  {
    actions: {
      setTile: assign({tile: (context, event) => event.tile }),
    }
  })