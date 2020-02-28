import { Machine, assign } from 'xstate';
import { advanceTurnStateMachine } from './AdvanceTurnStateMachine';
import { incomeTurnStateMachine } from './IncomeTurnStateMachine';

const MAX_INCOME_TURNS = 5

export const tapestryGameStateMachine = Machine(
  {
    id: 'TapestryGameState',
    context: {
      vp: 0,
      food: 0,
      workers: 0,
      coin: 0,
      culture: 0,
      tapestryHand: 0,
      tapestryMat: 0,
      techCardBottom: 0,
      techCardMiddle: 0,
      techCardTop: 0,
      territoriesOwned: 0,
      territoriesExplored: 0,
      territoriesControlled: 0,
      spaceTilesOwned: 0,
      spaceTilesExplored: 0,
      trackIndex: [0,0,0,0],
      incomeIndex: [5,5,5,5],
      mode: 'zeroResources',
      incomeTurns: 0,
      canTakeIncomeTurn: true,
      canAdvance: true,
    },
    initial: 'Idle',
    states: {
      Idle: {
        on: {
          AdvanceTurn: {
            target: 'TakingAdvanceTurn',
            cond: 'advanceTurnPossible'
          },
          IncomeTurn: {
            target: 'TakingIncomeTurn',
            cond: 'incomeTurnPossible'
          }
        },
      },
      TakingAdvanceTurn: {
        invoke: {
          id: 'advanceTurn',
          src: advanceTurnStateMachine,
          onDone: 'Idle'
        }
      },
      TakingIncomeTurn: {
        invoke: {
          id: 'incomeTurn',
          src: incomeTurnStateMachine,
          data: (context, event) => ({
            incomeIndex: context.incomeIndex,
          }),
          onDone: 'Idle'
        },
        exit: ['incrementIncomeTurns', 'checkCanTakeIncomeTurn'],
        on: {
          gainIncome: {
            actions: assign((context, event) => {
              return {
                food: context.food + event.food,
                workers: context.workers + event.worker,
                coin: context.coin + event.coin,
                culture: context.culture + event.culture,
                tapestryHand: context.tapestryHand + event.tapestry,
                territoriesOwned: context.territoriesOwned + event.territory,
              }
            }),
          }
        }
      },
    },
  },
  {
    actions: {
      incrementIncomeTurns: assign({ incomeTurns: context => context.incomeTurns + 1 }),
      checkCanTakeIncomeTurn: assign({ canTakeIncomeTurn: context=> context.incomeTurns < MAX_INCOME_TURNS}),
    },
    guards: {
      advanceTurnPossible: context => context.canAdvance,
      incomeTurnPossible: context => context.canTakeIncomeTurn
    }
  }
);
