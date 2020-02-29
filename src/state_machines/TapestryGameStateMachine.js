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
          data: (context, event) => ({
            trackIndex: event.index,
            spaceIndex: context.trackIndex[event.index] + 1
          }),
          onDone: 'Idle'
        },
        on: {
          AdvanceToken: {
            actions: assign({ trackIndex: (context, event) => AdvanceToken(context.trackIndex, event.trackIndex) })
          },
          territory: { actions: 'gainTerritory' },
          coin: { actions: 'gainCoin' },
          culture: { actions: 'gainCulture' },
          food: { actions: 'gainFood' },
          worker: { actions: 'gainWorkers' },

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
      gainTerritory: assign({ territoriesOwned: (context, event) => context.territoriesOwned + event.qty }),
      gainCoin: assign({ coin: (context, event) => context.coin + event.qty }),
      gainCulture: assign({ culture: (context, event) => context.culture + event.qty }),
      gainFood: assign({ food: (context, event) => context.food + event.qty }),
      gainWorkers: assign({ workers: (context, event) => context.workers + event.qty }),
    },
    guards: {
      advanceTurnPossible: context => context.canAdvance,
      incomeTurnPossible: context => context.canTakeIncomeTurn
    }
  }
);

const AdvanceToken = (trackIndex, index) => {
  const newTrackIndex = [...trackIndex]; // copy so we don't mutate state directly
  newTrackIndex[index] = trackIndex[index] + 1;
  return newTrackIndex
}
