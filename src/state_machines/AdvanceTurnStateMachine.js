import {Machine} from "xstate";

export const advanceTurnStateMachine = Machine({
  id: 'advanceTurnMachine',
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
      on: { GainBenefits: 'GainingBenefits' }
    },
    GainingBenefits: {
      on: {
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
});
