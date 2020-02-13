export const TRACKS = [
  {
    name: 'Exploration',
    resource: 'Food',
    spaces: [
      {name: ''},
      {
        name: 'Scouting',
        gain: [
          { type: 'territory', qty: 2 },
        ],
      },
      {
        name: 'Rafts',
        gain: [
          { type: 'explore', qty: 1 }
        ],
        bonus: { cost: 'wild', cost_qty: 1, gain: 'tapestry', gain_qty: 1 }
      },
      {
        name: 'Wagons',
        gain: [
          { type: 'explore', qty: 1 },
          { type: 'farm', qty: 1 }
        ],
        gain_logic: 'OR'
      },
      {
        name: 'Navigation',
        gain: [
          { type: 'territory', qty: 1 },
          { type: 'explore', qty: 1 },
        ],
        gain_logic: 'AND',
        building: 'Lighthouse'
      },
      {
        name: 'Ships',
        gain: [
          { type: 'vp', qty: 1, condition: 'territoriesControlled' }
        ],
        bonus: { cost: 'wild', cost_qty: 1, gain: 'farm', gain_qty: 1 }
      },
      {
        name: 'Tunnels',
        gain: [
          { type: 'territory', qty: 1 },
          { type: 'farm', qty: 1 }
        ],
        gain_logic: 'AND',
        bonus: { cost: 'wild', cost_qty: 1, gain: 'explore', gain_qty: 1 }
      },
      {
        name: 'Trains',
        gain: [
          { type: 'territory', qty: 2 },
          { type: 'explore', qty: 1 },
        ],
        gain_logic: 'AND',
        building: 'Train Station'
      },
      {
        name: 'Cars',
        gain: [
          { type: 'farm', qty: 1 },
          { type: 'vp', qty: 1, condition: 'farmsInCity' }
        ],
        gain_logic: 'AND',
        bonus: { cost: 'territory', cost_qty: 2, gain: 'vp', gain_qty: 5 }
      },
      {
        name: 'Airplanes',
        gain: [
          { type: 'territory', qty: 2 },
          { type: 'exploreAnywhere', qty: 1 }
        ],
        gain_logic: 'AND',
        bonus: { cost: 'wild', cost_qty: 1, gain: 'tapestry', gain_qty: 1 }
      },
      {
        name: 'Space Shuttle',
        gain: [
          { type: 'vp', qty: 1, condition: 'technologyTrackAdvances' },
        ],
        bonus: { cost: 'territory', cost_qty: 3, gain: 'tapestry', gain_qty: 10 },
        building: 'Launch Pad'
      },
      {
        name: 'Interstellar Travel',
        gain: [
          { type: 'spaceTile', qty: 3 },
          { type: 'exploreSpace', qty: 1 }
        ],
        gain_logic: 'AND'
      },
      {
        name: 'Warpgates',
        gain: [
          { type: 'exploreSpace', qty: 1 }
        ],
        bonus: { cost: 'wild', cost_qty: 1, gain: 'exploreSpace', gain_qty: 1 }
      },
    ]
  },
  {
    name: 'Science',
    resource: 'Worker',
    spaces: [
      {name: ''},
      {
        name: 'Astronomy',
        gain: [
          { type: 'roll_no_benefit', qty: 1 },
        ],
      },
      {
        name: 'Mathematics',
        gain: [
          { type: 'tapestry', qty: 1 },
        ],
        bonus: { cost: 'wild', cost_qty: 1, gain: 'house', gain_qty: 1 }
      },
      {
        name: 'Herbalism',
        gain: [
          { type: 'roll_no_benefit', qty: 1 },
          { type: 'house', qty: 1 }
        ],
        gain_logic: 'OR',
        bonus: { cost: 'wild', cost_qty: 1, gain: 'tapestry', gain_qty: 1 }
      },
      {
        name: 'Medicine',
        gain: [
          { type: 'vp', qty: 1, condition: 'techCard' },
          { type: 'tapestry', qty: 1 },
        ],
        gain_logic: 'AND',
        building: 'Apothecary'
      },
      {
        name: 'Chemistry',
        gain: [
          { type: 'roll', qty: 1 },
        ],
        bonus: { cost: 'tapestry', cost_qty: 2, gain: 'vp', gain_qty: 5 }
      },
      {
        name: 'Biology',
        gain: [
          { type: 'roll', qty: 1 },
          { type: 'house', qty: 1 }
        ],
        gain_logic: 'OR',
      },
      {
        name: 'Academic Research',
        gain: [
          { type: 'regain_current_space_any_track', qty: 1 },
        ],
        building: 'Academy'
      },
      {
        name: 'Nutrition',
        gain: [
          { type: 'house', qty: 1 },
          { type: 'vp', qty: 1, condition: 'house' }
        ],
        gain_logic: 'AND',
      },
      {
        name: 'Physics',
        gain: [
          { type: 'advance', qty: 1, condition: ['military', 'exploration', 'technology'] },
        ],
      },
      {
        name: 'Neuroscience',
        gain: [
          { type: 'regress', qty: 1, condition: ['military', 'technology'] },
        ],
        building: 'Laboratory'
      },
      {
        name: 'Quantum Physics',
        gain: [
          { type: 'advance', qty: 2, condition: ['military', 'exploration', 'technology'] },
        ],
      },
      {
        name: 'Alien Biology',
        gain: [
          { type: 'roll_no_benefit', qty: 4 },
          { type: 'vp', qty: 5, condition: 'off_track_advancement' },
        ],
      },
    ]
  },
  {
    name: 'Technology',
    resource: 'Coin',
    spaces: [
      {name: ''},
      {
        name: 'Pottery',
        gain: [
          { type: 'techCard', qty: 1 }
        ],
      },
      {
        name: 'Carpentry',
        gain: [
          { type: 'tapestry', qty: 1 },
        ],
        bonus: { cost: 'wild', cost_qty: 1, gain: 'market', gain_qty: 1 }
      },
      {
        name: 'Stone Tools',
        gain: [
          { type: 'techCard', qty: 1 },
          { type: 'market', qty: 1 },
        ],
        gain_logic: 'OR',
      },
      {
        name: 'Metallurgy',
        gain: [
          { type: 'discard_face_up_techCards', qty: 3 },
          { type: 'techCard', qty: 1 },
        ],
        gain_logic: 'AND',
        building: 'Forge'
      },
      {
        name: 'Glass',
        gain: [
          { type: 'farm', qty: 1 },
          { type: 'house', qty: 1 },
          { type: 'armory', qty: 1 },
        ],
        gain_logic: 'OR',
        bonus: { cost: 'wild', cost_qty: 1, gain: 'upgrade_tech', gain_qty: 1 }
      },
      {
        name: 'Steel',
        gain: [
          { type: 'vp', qty: 1, condition: 'armory' },
          { type: 'market', qty: 1 },
        ],
        gain_logic: 'AND',
        bonus: { cost: 'wild', cost_qty: 1, gain: 'techCard', gain_qty: 1 }
      },
      {
        name: 'Rubber',
        gain: [
          { type: 'discard_face_up_techCards', qty: 3 },
          { type: 'techCard', qty: 2 },
        ],
        gain_logic: 'AND',
        building: 'Rubber Works'
      },
      {
        name: 'Plastic',
        gain: [
          { type: 'market', qty: 1 },
          { type: 'vp', qty: 1, condition: 'market' }
        ],
        gain_logic: 'AND',
        bonus: { cost: 'wild', cost_qty: 1, gain: 'upgrade_tech', gain_qty: 1 }
      },
      {
        name: 'Electronics',
        gain: [
          { type: 'upgrade_tech', qty: 1 },
          { type: 'circle_tech_benefit', qty: 1, condition: 'middle_row' }
        ],
      },
      {
        name: 'Computers',
        gain: [
          { type: 'vp', qty: 1, condition: 'militaryTrackAdvances' },
          { type: 'vp', qty: 1, condition: 'scienceTrackAdvances' }
        ],
        gain_logic: 'AND',
        building: 'Tech Hub'
      },
      {
        name: 'Nanotechnology',
        gain: [
          { type: 'upgrade_tech', qty: 1 },
          { type: 'square_tech_benefit', qty: 1, condition: 'top_row' }
        ],
        bonus: { cost: 'techCard', cost_qty: 3, gain: 'vp', gain_qty: 10 }
      },
      {
        name: 'AI Singularity',
        gain: [
          { type: 'coin', qty: 1 },
          { type: 'worker', qty: 1 },
          { type: 'culture', qty: 1 },
          { type: 'food', qty: 1 },
          { type: 'reset_tech_track', qty: 1 },
        ],
        gain_logic: 'AND',
      },
    ]
  },
  {
    name: 'Military',
    resource: 'Culture',
    spaces: [
      {name: ''},
      {
        name: 'Archery',
        gain: [
          { type: 'conquer', qty: 1, condition: '' },
        ],
      },
      {
        name: 'Bladed Weapons',
        gain: [
          { type: 'tapestry', qty: 1 },
        ],
        bonus: { cost: 'wild', cost_qty: 1, gain: 'armory', gain_qty: 1 }
      },
      {
        name: 'Walls',
        gain: [
          { type: 'conquer', qty: 1 },
          { type: 'armory', qty: 1 },
        ],
        gain_logic: 'OR',
      },
      {
        name: 'Standing Army',
        gain: [
          { type: 'worker', qty: 1 },
          { type: 'vp', qty: 1, condition: 'territory' },
        ],
        gain_logic: 'AND',
        building: 'Barracks'
      },
      {
        name: 'Cavalry',
        gain: [
          { type: 'conquer', qty: 1 },
          { type: 'armory', qty: 1 },
        ],
        gain_logic: 'AND',
      },
      {
        name: 'Gunpowder',
        gain: [
          { type: 'conquer', qty: 1 },
          { type: 'tapestry', qty: 1 },
        ],
        gain_logic: 'AND',
        bonus: { cost: 'wild', cost_qty: 1, gain: 'armory', gain_qty: 1 }
      },
      {
        name: 'Tanks',
        gain: [
          { type: 'conquer_if_opp_both_dice', qty: 1 },
        ],
        gain_logic: 'AND',
        building: 'Tank Factory'
      },
      {
        name: 'Warplanes',
        gain: [
          { type: 'conquer_anywhere', qty: 1 },
        ],
        bonus: { cost: 'wild', cost_qty: 1, gain: 'tapestry', gain_qty: 1 }
      },
      {
        name: 'Anti-Aircraft Defense',
        gain: [
          { type: 'armory', qty: 1 },
          { type: 'vp', qty: 1, condition: 'tapestry_all'},
        ],
        gain_logic: 'AND',
      },
      {
        name: 'Nuclear Bomb',
        gain: [
          { type: 'vp', qty: 1, condition: 'explorationTrackAdvances' },
          { type: 'new_tapestry_over_last', qty: 1 },
        ],
        gain_logic: 'AND',
        building: 'Fusion Reactor'
      },
      {
        name: 'Drone Assassins',
        gain: [
          { type: 'score_city', qty: 1 },
        ],
        gain_logic: 'AND',
        bonus: { cost: 'tapestry', cost_qty: 3, gain: 'vp', gain_qty: 10 }
      },
      {
        name: 'Mechs',
        gain: [
          { type: 'conquer_both_dice', qty: 1 },
          { type: 'civ', qty: 1, condition: '' },
        ],
        gain_logic: 'AND',
      },
    ]
  }
]