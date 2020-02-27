import {Machine} from "xstate";

export const incomeTurnStateMachine = Machine({
  id: 'incomeTurnMachine',
  initial: 'ActivateCivAbilities',
  states: {
    ActivateCivAbilities: {
      on: { CivAbilityActivated: 'PlayTapestryCard' },
    },
    PlayTapestryCard: {
      on: { TapestryCardPlayed: 'UpgradeOneTechCard' },
    },
    UpgradeOneTechCard: {
      on: { TechCardUpgraded: 'GainVP' },
    },
    GainVP: {
      on: { VPGained: 'GainIncome' },
    },
    GainIncome: {
      on: { IncomeGained: 'IncomeTurnOver' },
    },
    IncomeTurnOver: {type: 'final'}
  }
});
