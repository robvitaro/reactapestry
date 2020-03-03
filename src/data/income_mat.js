export const INCOME_MAT = [
  {
    name: 'Markets',
    spaces: [
      {
        name: 'Barter',
        gain: [
          { type: 'coin', qty: 1 },
          { type: 'vp', qty: 1, condition: 'techCards' }
        ],
      },
      {
        name: 'Currency',
        gain: [
          { type: 'coin', qty: 1 },
        ],
      },
      {
        name: 'Banking',
        gain: [
          { type: 'vp', qty: 1, condition: 'techCards' }
        ],
      },
      {
        name: 'Credit Cards',
        gain: [
          { type: 'coin', qty: 1 },
        ],
      },
      {
        name: 'E-Commerce',
        gain: [
          { type: 'coin', qty: 1 },
          { type: 'vp', qty: 1, condition: 'techCards' }
        ],
      },
      {
        name: 'Biometrics',
        gain: [
          { type: 'vp', qty: 10, condition: 'flat' }
        ],
      },
    ]
  },
  {
    name: 'Houses',
    spaces: [
      {
        name: 'Symbology',
        gain: [
          { type: 'workers', qty: 1 },
          { type: 'scoreCity', qty: 1}
        ],
      },
      {
        name: 'Language',
        gain: [
          { type: 'workers', qty: 1 },
        ],
      },
      {
        name: 'Writing',
        gain: [
          { type: 'scoreCity', qty: 1}
        ],
      },
      {
        name: 'Telephone',
        gain: [
          { type: 'workers', qty: 1 },
        ],
      },
      {
        name: 'Email',
        gain: [
          { type: 'workers', qty: 1 },
          { type: 'scoreCity', qty: 1}
        ],
      },
      {
        name: 'Neural Implants',
        gain: [
          { type: 'vp', qty: 10, condition: 'flat' }
        ],
      },
    ]
  },
  {
    name: 'Farms',
    spaces: [
      {
        name: 'Hunting',
        gain: [
          { type: 'food', qty: 1 },
          { type: 'territory', qty: 1}
        ],
      },
      {
        name: 'Farming',
        gain: [
          { type: 'food', qty: 1 },
        ],
      },
      {
        name: 'Breeding',
        gain: [
          { type: 'vp', qty: 4, condition: 'flat'}
        ],
      },
      {
        name: 'Preservation',
        gain: [
          { type: 'food', qty: 1 },
        ],
      },
      {
        name: 'Fertilization',
        gain: [
          { type: 'food', qty: 1 },
          { type: 'vp', qty: 1, condition: 'flat'}
        ],
      },
      {
        name: 'Food Printing',
        gain: [
          { type: 'vp', qty: 10, condition: 'flat' }
        ],
      },
    ]
  },
  {
    name: 'Armories',
    spaces: [
      {
        name: 'Ceremony',
        gain: [
          { type: 'culture', qty: 1 },
          { type: 'tapestry', qty: 1}
        ],
      },
      {
        name: 'Racing',
        gain: [
          { type: 'culture', qty: 1 },
        ],
      },
      {
        name: 'Team Sports',
        gain: [
          { type: 'vp', qty: 4, condition: 'territoriesControlled'}
        ],
      },
      {
        name: 'Tabletop Games',
        gain: [
          { type: 'culture', qty: 1 },
        ],
      },
      {
        name: 'Video Games',
        gain: [
          { type: 'culture', qty: 1 },
          { type: 'vp', qty: 1, condition: 'territoriesControlled'}
        ],
      },
      {
        name: 'Virtual Reality',
        gain: [
          { type: 'vp', qty: 10, condition: 'flat' }
        ],
      },
    ]
  }
]