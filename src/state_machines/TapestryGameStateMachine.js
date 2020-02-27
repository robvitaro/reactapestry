import { Machine } from 'xstate';
import { advanceTurnStateMachine } from './AdvanceTurnStateMachine';
import { incomeTurnStateMachine } from './IncomeTurnStateMachine';

export const tapestryGameStateMachine = Machine(
  {
    id: 'TapestryGameState',
    context: {
      canAdvance: true,
      incomeTurns: 0
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
        invoke: { id: 'incomeTurn', src: incomeTurnStateMachine },
        exit: 'incrementIncomeTurns',
        onDone: 'Idle'
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
