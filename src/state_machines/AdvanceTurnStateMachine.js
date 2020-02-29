import {Machine, assign, sendParent} from "xstate";
import {TRACKS} from "../data/tracks";

export const advanceTurnStateMachine = Machine({
  id: 'advanceTurnMachine',
  context: {
    trackIndex: -1,
    spaceIndex: -1,
    gains: [],
  },
  initial: 'AdvanceToken',
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
        '': [
            // Transitions are tested one at a time.
            // The first valid transition will be taken.
            { target: 'Gain1Benefit', cond: { type: 'benefitCount', benefits: 1} },
            { target: 'Gain2Benefits', cond: { type: 'benefitCount', benefits: 2} },
            { target: 'Gain3Benefits', cond: { type: 'benefitCount', benefits: 3} },
            { target: 'Gain4Benefits', cond: { type: 'benefitCount', benefits: 4} },
            { target: 'Gain5Benefits', cond: { type: 'benefitCount', benefits: 5} },
          ],
        ChooseBenefit: 'ChoosingBenefits',
        GainBenefit: 'GainedBenefit'
      }
    },
    Gain1Benefit: {
      on: {
        '': {
          actions: sendParent(context => context.gains[0]),
          target: 'AdvanceTurnOver'
        }
      }
    },
    Gain2Benefits: {
      on: {
        '': {
          actions: [
            sendParent(context => context.gains[0]),
            sendParent(context => context.gains[1])
          ],
          target: 'AdvanceTurnOver'
        }
      }
    },
    Gain3Benefits: {
      on: {
        '': {
          actions: [
            sendParent(context => context.gains[0]),
            sendParent(context => context.gains[1]),
            sendParent(context => context.gains[2])
          ],
          target: 'AdvanceTurnOver'
        }
      }
    },
    Gain4Benefits: {
      on: {
        '': {
          actions: [
            sendParent(context => context.gains[0]),
            sendParent(context => context.gains[1]),
            sendParent(context => context.gains[2]),
            sendParent(context => context.gains[3])
          ],
          target: 'AdvanceTurnOver'
        }
      }
    },
    Gain5Benefits: {
      on: {
        '': {
          actions: [
            sendParent(context => context.gains[0]),
            sendParent(context => context.gains[1]),
            sendParent(context => context.gains[2]),
            sendParent(context => context.gains[3]),
            sendParent(context => context.gains[4])
          ],
          target: 'AdvanceTurnOver'
        }
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
    },
    guards: {
      benefitCount: (context, event, { cond }) => {
        return context.gains.length === cond.benefits
      }
    }
  }
);

