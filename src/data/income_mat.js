export const INCOME_MAT = [
  {
    name: 'Markets',
    spaces: [
      {
        name: 'Barter',
        images: ['coin.png', 'pointsTech.png'],
        gain: [
          { type: 'coin', qty: 1 },
          { type: 'vp', qty: 1, condition: 'techCards' }
        ],
      },
      {
        name: 'Currency',
        images: ['coin.png'],
        gain: [
          { type: 'coin', qty: 1 },
        ],
      },
      {
        name: 'Banking',
        images: ['pointsTech.png'],
        gain: [
          { type: 'vp', qty: 1, condition: 'techCards' }
        ],
      },
      {
        name: 'Credit Cards',
        images: ['coin.png'],
        gain: [
          { type: 'coin', qty: 1 },
        ],
      },
      {
        name: 'E-Commerce',
        images: ['coin.png', 'pointsTech.png'],
        gain: [
          { type: 'coin', qty: 1 },
          { type: 'vp', qty: 1, condition: 'techCards' }
        ],
      },
      {
        name: 'Biometrics',
        images: ['points10.png'],
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
        images: ['worker.png', 'pointsCity.png'],
        gain: [
          { type: 'workers', qty: 1 },
          { type: 'scoreCity', qty: 1}
        ],
      },
      {
        name: 'Language',
        images: ['worker.png'],
        gain: [
          { type: 'workers', qty: 1 },
        ],
      },
      {
        name: 'Writing',
        images: ['pointsCity.png'],
        gain: [
          { type: 'scoreCity', qty: 1}
        ],
      },
      {
        name: 'Telephone',
        images: ['worker.png'],
        gain: [
          { type: 'workers', qty: 1 },
        ],
      },
      {
        name: 'Email',
        images: ['worker.png', 'pointsCity.png'],
        gain: [
          { type: 'workers', qty: 1 },
          { type: 'scoreCity', qty: 1}
        ],
      },
      {
        name: 'Neural Implants',
        images: ['points10.png'],
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
        images: ['food.png', 'territory.png'],
        gain: [
          { type: 'food', qty: 1 },
          { type: 'territory', qty: 1}
        ],
      },
      {
        name: 'Farming',
        images: ['food.png'],
        gain: [
          { type: 'food', qty: 1 },
        ],
      },
      {
        name: 'Breeding',
        images: ['points4.png'],
        gain: [
          { type: 'vp', qty: 4, condition: 'flat'}
        ],
      },
      {
        name: 'Preservation',
        images: ['food.png'],
        gain: [
          { type: 'food', qty: 1 },
        ],
      },
      {
        name: 'Fertilization',
        images: ['food.png', 'points7.png'],
        gain: [
          { type: 'food', qty: 1 },
          { type: 'vp', qty: 7, condition: 'flat'}
        ],
      },
      {
        name: 'Food Printing',
        images: ['points10.png'],
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
        images: ['culture.png', 'tapestry.png'],
        gain: [
          { type: 'culture', qty: 1 },
          { type: 'tapestry', qty: 1}
        ],
      },
      {
        name: 'Racing',
        images: ['culture.png'],
        gain: [
          { type: 'culture', qty: 1 },
        ],
      },
      {
        name: 'Team Sports',
        images: ['pointsConquered.png'],
        gain: [
          { type: 'vp', qty: 1, condition: 'territoriesControlled'}
        ],
      },
      {
        name: 'Tabletop Games',
        images: ['culture.png'],
        gain: [
          { type: 'culture', qty: 1 },
        ],
      },
      {
        name: 'Video Games',
        images: ['culture.png', 'pointsConquered.png'],
        gain: [
          { type: 'culture', qty: 1 },
          { type: 'vp', qty: 1, condition: 'territoriesControlled'}
        ],
      },
      {
        name: 'Virtual Reality',
        images: ['points10.png'],
        gain: [
          { type: 'vp', qty: 10, condition: 'flat' }
        ],
      },
    ]
  }
]