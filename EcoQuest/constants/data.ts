import { C } from './colors';

export const QUIZ_QUESTIONS = [
  {
    q: "What percentage of Earth's surface is covered by oceans?",
    opts: ['51%', '61%', '71%', '81%'],
    ans: 2,
    fact: 'Oceans cover 71% of Earth and hold 97% of all water on the planet.',
    emoji: '🌊',
  },
  {
    q: 'Which gas is the primary driver of the greenhouse effect?',
    opts: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'],
    ans: 1,
    fact: 'CO₂ from burning fossil fuels traps solar heat, steadily warming the planet.',
    emoji: '🏭',
  },
  {
    q: 'How long does a single plastic bottle take to decompose?',
    opts: ['10 years', '50 years', '100 years', '450 years'],
    ans: 3,
    fact: 'Plastic bottles can persist in landfills for up to 450 years.',
    emoji: '🧴',
  },
  {
    q: 'What does "carbon neutral" actually mean?',
    opts: [
      'Producing zero carbon',
      'Balancing emissions with removal',
      'Using only nuclear power',
      'Cutting energy use by 50%',
    ],
    ans: 1,
    fact: 'Carbon neutral = net zero CO₂ — emissions released equal emissions removed.',
    emoji: '⚖️',
  },
  {
    q: 'Which country generates the most solar power?',
    opts: ['USA', 'Germany', 'India', 'China'],
    ans: 3,
    fact: 'China leads with over 400 GW of installed solar capacity as of 2024.',
    emoji: '☀️',
  },
  {
    q: 'What is the main global cause of deforestation?',
    opts: ['Urban expansion', 'Mining', 'Agricultural expansion', 'Natural disasters'],
    ans: 2,
    fact: 'Agriculture (cattle ranching, soy, palm oil) drives ~80% of deforestation.',
    emoji: '🌳',
  },
  {
    q: "The '3 R's of sustainability stand for?",
    opts: [
      'Reduce, Reuse, Recycle',
      'Rethink, Redo, Replace',
      'Repair, Return, Renew',
      'Restore, Revive, Regrow',
    ],
    ans: 0,
    fact: "Practising all three R's can dramatically cut personal waste footprint.",
    emoji: '♻️',
  },
  {
    q: 'By roughly how much has global average temperature risen since 1850?',
    opts: ['0.3°C', '0.7°C', '1.1°C', '2.4°C'],
    ans: 2,
    fact: 'That 1.1°C rise has already caused more extreme weather, floods and wildfires.',
    emoji: '🌡️',
  },
  {
    q: 'Approximately how many species are currently threatened with extinction?',
    opts: ['10,000', '50,000', '1 million', '5 million'],
    ans: 2,
    fact: 'The IUCN estimates over 1 million species face extinction in coming decades.',
    emoji: '🦁',
  },
  {
    q: 'How much of global electricity currently comes from renewable sources?',
    opts: ['About 10%', 'About 20%', 'About 30%', 'About 50%'],
    ans: 2,
    fact: 'Renewables now supply ~30% of global electricity and are growing fast.',
    emoji: '⚡',
  },
];

export const ISSUES = [
  {
    id: '1', icon: '🌡️', title: 'Climate Change', severity: 'Critical', severityColor: C.danger,
    summary: 'Rising global temperatures caused by greenhouse gas emissions are disrupting weather patterns, melting polar ice, raising sea levels, and threatening ecosystems on every continent.',
    actions: ['Switch to renewable energy at home', 'Reduce meat and dairy consumption', 'Use public transport or cycle', 'Lobby your local representatives'],
    stat: '+1.1°C', statLabel: 'since 1850',
  },
  {
    id: '2', icon: '🌊', title: 'Ocean Pollution', severity: 'High', severityColor: '#4895EF',
    summary: 'Over 8 million tonnes of plastic enter our oceans every year, choking marine life, contaminating the food chain, and turning once-pristine coastlines into waste dumps.',
    actions: ['Avoid all single-use plastics', 'Join local beach clean-ups', 'Choose sustainably sourced seafood', 'Support ocean conservation charities'],
    stat: '8M', statLabel: 'tonnes plastic/yr',
  },
  {
    id: '3', icon: '🌳', title: 'Deforestation', severity: 'High', severityColor: C.emerald,
    summary: 'Forests are being cleared at devastating speed for agriculture, logging, and urban development — destroying biodiversity hotspots and removing vital carbon sinks the planet depends on.',
    actions: ['Buy only sustainably sourced wood', 'Reduce beef consumption', 'Support reforestation charities', 'Avoid products with uncertified palm oil'],
    stat: '15B', statLabel: 'trees lost/year',
  },
  {
    id: '4', icon: '🦁', title: 'Biodiversity Loss', severity: 'Critical', severityColor: C.coral,
    summary: 'Species are vanishing 1,000 times faster than natural rates. Habitat destruction, pollution, and climate change are pushing over a million species toward extinction.',
    actions: ['Support wildlife conservation charities', 'Create wildlife-friendly gardens', 'Reduce pesticide and herbicide use', 'Buy ethically produced goods'],
    stat: '1M+', statLabel: 'species at risk',
  },
  {
    id: '5', icon: '💧', title: 'Water Scarcity', severity: 'Serious', severityColor: '#4CC9F0',
    summary: "By 2025, half the world's population could face water shortages. Overuse, agricultural run-off, and climate change are depleting freshwater sources at an alarming rate.",
    actions: ['Fix household leaks promptly', 'Take shorter showers', 'Eat less water-intensive food', 'Support water access NGOs'],
    stat: '2.2B', statLabel: 'lack clean water',
  },
  {
    id: '6', icon: '♻️', title: 'Waste Crisis', severity: 'Serious', severityColor: C.mint,
    summary: 'The world generates 2+ billion tonnes of solid waste per year. Less than 20% is recycled. The rest fills landfills, leaches toxic chemicals, and pollutes natural environments.',
    actions: ['Compost kitchen waste', 'Learn to recycle correctly', 'Buy second-hand where possible', 'Refuse unnecessary packaging'],
    stat: '2B+', statLabel: 'tonnes waste/yr',
  },
];

export const VIDEOS = [
  {
    id: '1', emoji: '🌍', title: 'Our Planet Is Changing', duration: '4:32',
    channel: 'EcoQuest Originals',
    description: 'An eye-opening look at how human activity has transformed our planet over the last century — and what we can still do to protect it.',
    tags: ['Climate', 'Overview'],
  },
  {
    id: '2', emoji: '🧴', title: 'The Truth About Plastic', duration: '6:15',
    channel: 'EcoQuest Originals',
    description: 'Follow plastic from production to ocean and discover the solutions being pioneered around the world to tackle this growing crisis.',
    tags: ['Ocean', 'Pollution'],
  },
  {
    id: '3', emoji: '⚡', title: 'The Renewable Revolution', duration: '5:48',
    channel: 'EcoQuest Originals',
    description: 'Explore how solar, wind and tidal energy are transforming electricity systems globally and what a fully renewable future could look like.',
    tags: ['Energy', 'Solutions'],
  },
  {
    id: '4', emoji: '🌲', title: "Forests: Earth's Lungs", duration: '7:02',
    channel: 'EcoQuest Originals',
    description: 'Why forests are critical to our survival, the devastating scale of deforestation, and the communities on the front lines fighting to protect them.',
    tags: ['Forests', 'Biodiversity'],
  },
];
