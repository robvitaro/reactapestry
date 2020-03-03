import {Machine, assign, sendParent} from "xstate";
import {TRACKS} from "../data/tracks";

export const advanceTurnStateMachine = Machine({
  id: 'advanceTurnMachine',
  context: {
    trackIndex: -1,
    spaceIndex: -1,
    gains: [],
    advancementCost: [],
  },
  initial: 'DeterminingCost',
  states: {
    DeterminingCost: {
      entry: 'determineCost',
      on: {
        '': 'PayingCost'
      }
    },
    PayingCost: {
      on: { PaidResource: 'ResourcePaid' },
    },
    ResourcePaid: {
      entry: 'capturePayment',
      on: {
        '': [
          // Transitions are tested one at a time.
          // The first valid transition will be taken.
          { target: 'PayingCost', cond: 'moreToPay' },
          { target: 'AdvanceToken', cond: 'paidInFull' },
        // CostPaidForBonus: 'GainingBenefits'
        ]
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
      assignGains: assign({gains: context => TRACKS[context.trackIndex].spaces[context.spaceIndex].gain}),
      determineCost: assign({advancementCost: (context, event) => {
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

          return advancementCost}
        }
      ),
      capturePayment: assign((context, event) => {
        const newCost = context.advancementCost.map((x) => x)
        console.log(newCost)
        const payment = event.payment
        let paymentIndex = newCost.indexOf(payment)

        if (paymentIndex >= 0) {
          newCost.splice(paymentIndex, 1)
        } else {
          paymentIndex = newCost.indexOf('wild')
          if (paymentIndex >= 0) {
            newCost.splice(paymentIndex, 1)
          } else {
            // invalid choice ... what to do?
          }

        }
        console.log(newCost)
        return {advancementCost: newCost}
        }
      ),
    },
    guards: {
      moreToPay: context => context.advancementCost.length > 0,
      paidInFull: context => context.advancementCost.length === 0
    }
  }
);

