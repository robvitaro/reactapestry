import {Machine, sendParent} from "xstate";
import {INCOME_MAT} from "../data/income_mat";

const MAX_INCOME_SPACES = 6

const gainIncome = (incomeIndex) => {
  let income = {type: 'gainIncome'}

  INCOME_MAT.forEach((track, index) => {
    const openSpaces = MAX_INCOME_SPACES - incomeIndex[index]
    for(let i = 0; i < openSpaces; i++) {
      track.spaces[i].gain.forEach((gain) => {
        if(gain.type !== 'vp' && gain.type !== 'scoreCity') {
          income[gain.type] = gain.qty
        }
      })
    }
  })
  return income
}

export const incomeTurnStateMachine = Machine(
  {
    id: 'incomeTurnMachine',
    // initial: 'ActivateCivAbilities',
    context: {
      incomeIndex: [],
    },
    initial: 'GainIncome',
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
        on: {
          '': {
            actions: [
              sendParent((context, event) => (gainIncome(context.incomeIndex))),
            ],
            target: 'IncomeTurnOver'
          },
          IncomeGained: 'IncomeTurnOver'
        },
      },
      IncomeTurnOver: {type: 'final'}
    }
  },
);
