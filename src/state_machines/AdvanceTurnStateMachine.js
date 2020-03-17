import {Machine, assign, sendParent, forwardTo} from "xstate";
import {TRACKS} from "../data/tracks";
import {resourcePayerStateMachine} from "./ResourcePayerStateMachine";
import {buildingPlacerStateMachine} from "./BuildingPlacerStateMachine";

export const advanceTurnStateMachine = Machine({
  id: 'advanceTurnMachine',
  context: {
    trackIndex: -1,
    spaceIndex: -1,
    gains: [],
    advancementCost: [],
    building: '',
    freeResource: false
  },
  initial: 'PayingAdvancementCost',
  states: {
    PayingAdvancementCost: {
      entry: 'determineAdvancementCost',
      invoke: {
        id: 'payAdvancementCost',
        src: resourcePayerStateMachine,
        data: context => ({ cost: context.advancementCost }),
        onDone: 'AdvanceToken'
      },
      on: {
        'PaidResource': { actions: forwardTo('payAdvancementCost') },
        'updateCost': { actions: assign({advancementCost: (context, event) => event.cost }) },
      },
    },
    AdvanceToken: {
      on: {
        '': {
          actions: sendParent(context => ({ type: 'advanceToken', trackIndex: context.trackIndex, spaceIndex: context.spaceIndex })),
          target: 'GainingBenefits'
        }
      }
    },
    GainingBenefits: {
      entry: 'assignGains',
      on: {
        '': [
          // { target: 'ChoosingBenefits', cond: 'gainLogicIsOR' },
          {
            actions: sendParent(context => ({ type: 'gainsFromAdvance', gains: context.gains})),
            target: 'GainedBenefits'
          }],
        ChooseBenefit: 'ChoosingBenefits',
        GainBenefit: 'GainedBenefits'
      }
    },
    ChoosingBenefits: {
      on: {
        GainBenefit: 'GainedBenefits'
      }
    },
    GainedBenefits: {
      on: {
        '': [
          { target: 'PlacingBuilding', cond: 'buildingGainsExist' },
          { target: 'AdvanceTurnOver' }
        ],
        PlaceBuilding: 'PlacingBuilding',
        // OptForBonus: 'PayingCost',
        EndAdvance: 'AdvanceTurnOver'
      }
    },
    PlacingBuilding: {
      entry: ['setBuilding', 'updateIncomeIndex'],
      invoke: {
        id: 'placeBuilding',
        src: buildingPlacerStateMachine,
        data: context => ({ building: context.building }),
        onDone: 'GainedBenefits'
      },
      on: {
        placedBuilding: { actions: ['placedBuilding', forwardTo('placeBuilding')] },
        selectedFreeResource: { actions: forwardTo('placeBuilding') }
      }
    },
    AdvanceTurnOver: {type: 'final'}
  }
},
  {
    actions: {
      assignGains: assign({gains: context => TRACKS[context.trackIndex].spaces[context.spaceIndex].gain}),
      determineAdvancementCost: assign({advancementCost: (context, event) => {
        const trackSpace = context.spaceIndex
        const trackResource = TRACKS[context.trackIndex].resource
        const advancementCost = []

        if (trackSpace < 4) {
          /* Age 1 requires 1 resource of any kind */
          advancementCost.push('wild')
        } else if (trackSpace < 7) {
          /* Age 2 requires 1 track resource and 1 resource of any kind */
          advancementCost.push(trackResource, 'wild')
        } else if (trackSpace < 10) {
          /* Age 3 requires 1 track resource and 2 resources of any kind */
          advancementCost.push(trackResource, 'wild', 'wild')
        } else if (trackSpace < 12) {
          advancementCost.push(trackResource, trackResource)
        }

        return advancementCost
      }}),
      setBuilding: assign({building: (context, event) => {
        let building = ''
        context.gains.forEach(gain => {
          if (buildingGains.includes(gain.type)) {
            building = gain.type
          }
        })
        return building
      }}),
      updateIncomeIndex: sendParent(context => ({ type: 'updateIncomeIndex', building: context.building })),
      placedBuilding: assign((context, event) => {
        let newGains = []
        context.gains.forEach(gain => {
          if (gain.type !== context.building) {
            newGains.push(gain)
          }
        })
        return {
          gains: newGains,
          building: '',
          freeResource: event.freeResource
        }
      }),
    },
    guards: {
      buildingGainsExist: context => {
        let buildingGainsExist = false
        context.gains.forEach(gain => {
          if (buildingGains.includes(gain.type)) {
            buildingGainsExist = true
          }
        })
        return buildingGainsExist
      },
      gainLogicIsOR: context => TRACKS[context.trackIndex].spaces[context.spaceIndex].gain_logic === 'OR'
    }
  }
);

const buildingGains = [
  'farm',
  'house',
  'market',
  'armory'
]
