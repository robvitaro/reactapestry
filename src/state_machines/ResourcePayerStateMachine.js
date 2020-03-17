import {Machine, assign, sendParent} from "xstate";

export const resourcePayerStateMachine = Machine({
  id: 'advanceTurnMachine',
  context: {
    cost: []
  },
  initial: 'PayingCost',
  states: {
    PayingCost: {
      on: { PaidResource: 'ResourcePaid' },
    },
    ResourcePaid: {
      entry: ['capturePayment', 'updateCost'],
      on: {
        '': [
          { target: 'PayingCost', cond: 'moreToPay' },
          { target: 'AllCostsPaid', cond: 'paidInFull' },
        ]
      },
    },
    AllCostsPaid: { type: 'final' }
  },
},
{
  actions: {
    capturePayment: assign((context, event) => {
      const newCost = context.cost.map((x) => x)
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
      return {cost: newCost}
    }),
    updateCost: sendParent(context => ({ type: 'updateCost', cost: context.cost }))
  },
  guards: {
    moreToPay: context => context.cost.length > 0,
    paidInFull: context => context.cost.length === 0,
  }
})