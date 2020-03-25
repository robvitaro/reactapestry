import { Machine, assign, send, forwardTo } from 'xstate';
import { advanceTurnStateMachine } from './AdvanceTurnStateMachine';
import { incomeTurnStateMachine } from './IncomeTurnStateMachine';
import { TILES} from "../data/tiles";
import { newShuffledArrayInRange} from "../util";

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
      tapestry: 0,
      tapestryMat: 0,
      techCard: 0,
      techCardMiddle: 0,
      techCardTop: 0,
      territory: [],
      territoriesExplored: 0,
      territoriesControlled: 0,
      spaceTile: 0,
      spaceTilesExplored: 0,
      trackIndex: [0,0,0,0],  // expl, sci, tech, mil
      incomeIndex: [5,5,5,5], // markets, houses, farms, armories
      completedLines: 0,
      mode: 'zeroResources',
      incomeTurns: 0,
      canTakeIncomeTurn: true,
      canAdvance: true,
      allExplorationTiles: newShuffledArrayInRange(1, TILES.length)
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
          advanceToken: { actions: 'advanceToken' },
          gainsFromAdvance: { actions: ['statGainsFromAdvance','territoryGainsFromAdvance'] },
          updateIncomeIndex: { actions: 'updateIncomeIndex'},
          placedBuilding: {actions: ['updateCompletedLines', forwardTo('advanceTurn')] },
          payFood: {actions: ['payFood', send({ type: 'PaidResource', payment: 'food'}, { to: 'advanceTurn' })]},
          freeFood: {actions: ['gainFood', send({ type: 'selectedFreeResource'}, { to: 'advanceTurn' })]},
          payCoin: {actions: ['payCoin', send({ type: 'PaidResource', payment: 'coin'}, { to: 'advanceTurn' })]},
          freeCoin: {actions: ['gainCoin', send({ type: 'selectedFreeResource'}, { to: 'advanceTurn' })]},
          payWorker: {actions: ['payWorker', send({ type: 'PaidResource', payment: 'workers'}, { to: 'advanceTurn' })]},
          freeWorker: {actions: ['gainWorker', send({ type: 'selectedFreeResource'}, { to: 'advanceTurn' })]},
          payCulture: {actions: ['payCulture', send({ type: 'PaidResource', payment: 'culture'}, { to: 'advanceTurn' })]},
          freeCulture: {actions: ['gainCulture', send({ type: 'selectedFreeResource'}, { to: 'advanceTurn' })]},
          gainVP: {actions: 'gainVP'},
          exploringWithTile: {actions: ['updateTerritories', forwardTo('advanceTurn')]},
          explored: {actions: [forwardTo('advanceTurn')]}
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
              const newAllTiles = [...context.allExplorationTiles]
              const newTerritory = [...context.territory]
              for(let i=0; i < event.tapestry; i++) {
                const tile = newAllTiles.pop()
                newTerritory.push(tile)
              }
              return {
                food: context.food + event.food,
                workers: context.workers + event.workers,
                coin: context.coin + event.coin,
                culture: context.culture + event.culture,
                tapestry: context.tapestry + event.tapestry,
                allExplorationTiles: newAllTiles,
                territory: newTerritory,
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
      payFood: assign({ food: context => context.food - 1 }),
      gainFood: assign({ food: context => context.food + 1 }),
      payCoin: assign({ coin: context => context.coin - 1 }),
      gainCoin: assign({ coin: context => context.coin + 1 }),
      payWorker: assign({ workers: context => context.workers - 1 }),
      gainWorker: assign({ workers: context => context.workers + 1 }),
      payCulture: assign({ culture: context => context.culture - 1 }),
      gainCulture: assign({ culture: context => context.culture + 1 }),
      gainVP: assign({ vp: (context, event) => context.vp + event.value }),
      advanceToken: assign({ trackIndex: (context, event) => {
        const newTrackIndex = [...context.trackIndex]; // copy so we don't mutate state directly
        newTrackIndex[event.trackIndex] = context.trackIndex[event.trackIndex] + 1;
        return newTrackIndex
      } }),
      statGainsFromAdvance: assign((context, event) => {
        const formattedGains = {}
        event.gains.forEach(gain => {
          if(statGains.includes(gain.type)) {
            formattedGains[gain.type] = context[gain.type] + gain.qty
          }
        })
        return formattedGains
      }),
      territoryGainsFromAdvance: assign((context, event) => {
        const newAllTiles = [...context.allExplorationTiles]
        const newTerritory = [...context.territory]
        event.gains.forEach(gain => {
          if (gain.type === 'territory' ) {
            for(let i=0; i < gain.qty; i++) {
              const tile = newAllTiles.pop()
              newTerritory.push(tile)
            }
          }
        })
        return {
          allExplorationTiles: newAllTiles,
          territory: newTerritory,
        }
      }),
      updateIncomeIndex: assign({ incomeIndex: (context, event) => {
        const buildings = ['market', 'house', 'farm', 'armory']
        let index = buildings.indexOf(event.building)
        const newIncomeIndex = [...context.incomeIndex]; // copy so we don't mutate state directly
        newIncomeIndex[index] = context.incomeIndex[index] - 1;
        return newIncomeIndex
      }}),
      updateCompletedLines: assign({ completedLines: (context, event) => event.completedLines}),
      updateTerritories: assign((context, event) => {
        const newTerritory = [...context.territory]
        const index = context.territory.indexOf(parseInt(event.tile))
          console.log(index)
        newTerritory.splice(index, 1)
        return {
          territory: newTerritory,
        }
      }),
      endAdvance: send({ type: 'EndAdvance'}, { to: 'advanceTurn' })
    },
    guards: {
      advanceTurnPossible: context => context.canAdvance,
      incomeTurnPossible: context => context.canTakeIncomeTurn
    }
  }
);

const statGains = [
  'coin',
  'workers',
  'culture',
  'food',
  'tapestry',
  'spaceTile',
  'techCard'
]



/*
vp
scoreCity

conquer
conquerIfOppBothDice
conquerAnywhere
conquerBothDice

rollNoBenefit
roll
regainCurrentSpaceAnyTrack
advance
regress

discardFaceUpTechCards
upgradeTech
circleTechBenefit
squareTechBenefit
resetTechTrack

newTapestryOverLast
civ

 */
