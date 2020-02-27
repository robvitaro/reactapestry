import {Machine} from "xstate";

const AdvanceTurnStateMachine = Machine({
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
})

export default AdvanceTurnStateMachine