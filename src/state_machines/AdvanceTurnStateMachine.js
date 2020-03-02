import {Machine, assign, sendParent} from "xstate";
import {TRACKS} from "../data/tracks";

export const advanceTurnStateMachine = Machine({
  id: 'advanceTurnMachine',
  context: {
    trackIndex: -1,
    spaceIndex: -1,
    gains: [],
  },
  initial: 'PayingCost',
  states: {
    PayingCost: {
      on: {ChooseResources: 'ChoosingResources'},
    },
    ChoosingResources: {
      on: {
        MoreResourcesNeeded: 'PayingCost',
        CostPaidForAdvancing: 'AdvanceToken',
        CostPaidForBonus: 'GainingBenefits'
      },
    },
    AdvanceToken: {
      on: {
        '': {
          actions: sendParent(context => ({ type: 'AdvanceToken', trackIndex: context.trackIndex, spaceIndex: context.spaceIndex })),
          target: 'GainingBenefits'
        }
      }
    },
    GainingBenefits: {
      entry: 'assignGains',
      on: {
        '': {
          actions: sendParent(context => ({ type: 'gainFromAdvance', gains: context.gains})),
          target: 'AdvanceTurnOver'
        },
        ChooseBenefit: 'ChoosingBenefits',
        GainBenefit: 'GainedBenefit'
      }
    },
    ChoosingBenefits: {
      on: {
        GainBenefit: 'GainedBenefit'
      }
    },
    GainedBenefit: {
      on: {
        PlaceBuilding: 'PlacingBuilding',
        OptForBonus: 'PayingCost',
        EndAdvance: 'AdvanceTurnOver'
      }
    },
    PlacingBuilding: {
      on: {
        PlacedBuilding: 'GainedBenefit'
      }
    },
    AdvanceTurnOver: {type: 'final'}
  }
},
  {
    actions: {
      assignGains: assign({ gains: context => TRACKS[context.trackIndex].spaces[context.spaceIndex].gain }),
    }
  }
);

