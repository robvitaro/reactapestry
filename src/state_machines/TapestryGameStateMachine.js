import { Machine, assign } from 'xstate';
import { advanceTurnStateMachine } from './AdvanceTurnStateMachine';
import { incomeTurnStateMachine } from './IncomeTurnStateMachine';

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
      // to delete
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
        invoke: { id: 'advanceTurn', src: advanceTurnStateMachine },
        onDone: 'Idle'
      },
      TakingIncomeTurn: {
        invoke: {
          id: 'incomeTurn',
          src: incomeTurnStateMachine,
          data: (context, event) => ({
            incomeIndex: context.incomeIndex,
          })
        },
        exit: 'incrementIncomeTurns',
        onDone: 'Idle',
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
      incrementIncomeTurns: (context, event) => {
        return context.incomeTurns = context.incomeTurns + 1
      },
    },
    guards: {
      advanceTurnPossible: (context, event) => {
        // return context.canSearch && event.query && event.query.length > 0;
        return context.canAdvance;
      },
      incomeTurnPossible: (context, event) => {
        return context.incomeTurns < 5;
      },
    }
  }
);
