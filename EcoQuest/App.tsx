import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const CONTENT_MAX = 600;

// ═══════════════════════════════════════════════════════
//  DESIGN TOKENS
// ═══════════════════════════════════════════════════════
const C = {
  forest:   '#1A3C2E',
  forestMid:'#234D3B',
  emerald:  '#2D6A4F',
  mint:     '#52B788',
  lime:     '#95D5B2',
  limeLight:'#B7E4C7',
  cream:    '#F4F1EA',
  sand:     '#E9C46A',
  coral:    '#F4A261',
  danger:   '#E76F51',
  white:    '#FFFFFF',
  dark:     '#1A2B20',
  muted:    '#5A7A66',
  border:   '#D8EAE0',
  cardBg:   '#FFFFFF',
};

// ═══════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q: "What percentage of Earth's surface is covered by oceans?",
    opts: ['51%','61%','71%','81%'],
    ans: 2,
    fact: 'Oceans cover 71% of Earth and hold 97% of all water on the planet.',
    emoji: '🌊',
  },
  {
    q: 'Which gas is the primary driver of the greenhouse effect?',
    opts: ['Oxygen','Carbon Dioxide','Nitrogen','Methane'],
    ans: 1,
    fact: 'CO₂ from burning fossil fuels traps solar heat, steadily warming the planet.',
    emoji: '🏭',
  },
  {
    q: 'How long does a single plastic bottle take to decompose?',
    opts: ['10 years','50 years','100 years','450 years'],
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
    opts: ['USA','Germany','India','China'],
    ans: 3,
    fact: 'China leads with over 400 GW of installed solar capacity as of 2024.',
    emoji: '☀️',
  },
  {
    q: "What is the main global cause of deforestation?",
    opts: ['Urban expansion','Mining','Agricultural expansion','Natural disasters'],
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
    fact: 'Practising all three R\'s can dramatically cut personal waste footprint.',
    emoji: '♻️',
  },
  {
    q: 'By roughly how much has global average temperature risen since 1850?',
    opts: ['0.3°C','0.7°C','1.1°C','2.4°C'],
    ans: 2,
    fact: 'That 1.1°C rise has already caused more extreme weather, floods and wildfires.',
    emoji: '🌡️',
  },
  {
    q: 'Approximately how many species are currently threatened with extinction?',
    opts: ['10,000','50,000','1 million','5 million'],
    ans: 2,
    fact: 'The IUCN estimates over 1 million species face extinction in coming decades.',
    emoji: '🦁',
  },
  {
    q: 'How much of global electricity currently comes from renewable sources?',
    opts: ['About 10%','About 20%','About 30%','About 50%'],
    ans: 2,
    fact: 'Renewables now supply ~30% of global electricity and are growing fast.',
    emoji: '⚡',
  },
];

const ISSUES = [
  {
    id: '1', icon: '🌡️', title: 'Climate Change', severity: 'Critical', severityColor: C.danger,
    summary: 'Rising global temperatures caused by greenhouse gas emissions are disrupting weather patterns, melting polar ice, raising sea levels, and threatening ecosystems on every continent.',
    actions: ['Switch to renewable energy at home','Reduce meat and dairy consumption','Use public transport or cycle','Lobby your local representatives'],
    stat: '+1.1°C', statLabel: 'since 1850',
  },
  {
    id: '2', icon: '🌊', title: 'Ocean Pollution', severity: 'High', severityColor: '#4895EF',
    summary: 'Over 8 million tonnes of plastic enter our oceans every year, choking marine life, contaminating the food chain, and turning once-pristine coastlines into waste dumps.',
    actions: ['Avoid all single-use plastics','Join local beach clean-ups','Choose sustainably sourced seafood','Support ocean conservation charities'],
    stat: '8M', statLabel: 'tonnes plastic/yr',
  },
  {
    id: '3', icon: '🌳', title: 'Deforestation', severity: 'High', severityColor: C.emerald,
    summary: 'Forests are being cleared at devastating speed for agriculture, logging, and urban development — destroying biodiversity hotspots and removing vital carbon sinks the planet depends on.',
    actions: ['Buy only sustainably sourced wood','Reduce beef consumption','Support reforestation charities','Avoid products with uncertified palm oil'],
    stat: '15B', statLabel: 'trees lost/year',
  },
  {
    id: '4', icon: '🦁', title: 'Biodiversity Loss', severity: 'Critical', severityColor: C.coral,
    summary: 'Species are vanishing 1,000 times faster than natural rates. Habitat destruction, pollution, and climate change are pushing over a million species toward extinction.',
    actions: ['Support wildlife conservation charities','Create wildlife-friendly gardens','Reduce pesticide and herbicide use','Buy ethically produced goods'],
    stat: '1M+', statLabel: 'species at risk',
  },
  {
    id: '5', icon: '💧', title: 'Water Scarcity', severity: 'Serious', severityColor: '#4CC9F0',
    summary: 'By 2025, half the world\'s population could face water shortages. Overuse, agricultural run-off, and climate change are depleting freshwater sources at an alarming rate.',
    actions: ['Fix household leaks promptly','Take shorter showers','Eat less water-intensive food','Support water access NGOs'],
    stat: '2.2B', statLabel: 'lack clean water',
  },
  {
    id: '6', icon: '♻️', title: 'Waste Crisis', severity: 'Serious', severityColor: C.mint,
    summary: 'The world generates 2+ billion tonnes of solid waste per year. Less than 20% is recycled. The rest fills landfills, leaches toxic chemicals, and pollutes natural environments.',
    actions: ['Compost kitchen waste','Learn to recycle correctly','Buy second-hand where possible','Refuse unnecessary packaging'],
    stat: '2B+', statLabel: 'tonnes waste/yr',
  },
];

const VIDEOS = [
  {
    id: '1', emoji: '🌍', title: 'Our Planet Is Changing', duration: '4:32',
    channel: 'EcoQuest Originals',
    description: 'An eye-opening look at how human activity has transformed our planet over the last century — and what we can still do to protect it.',
    tags: ['Climate','Overview'],
  },
  {
    id: '2', emoji: '🧴', title: 'The Truth About Plastic', duration: '6:15',
    channel: 'EcoQuest Originals',
    description: 'Follow plastic from production to ocean and discover the solutions being pioneered around the world to tackle this growing crisis.',
    tags: ['Ocean','Pollution'],
  },
  {
    id: '3', emoji: '⚡', title: 'The Renewable Revolution', duration: '5:48',
    channel: 'EcoQuest Originals',
    description: 'Explore how solar, wind and tidal energy are transforming electricity systems globally and what a fully renewable future could look like.',
    tags: ['Energy','Solutions'],
  },
  {
    id: '4', emoji: '🌲', title: "Forests: Earth's Lungs", duration: '7:02',
    channel: 'EcoQuest Originals',
    description: "Why forests are critical to our survival, the devastating scale of deforestation, and the communities on the front lines fighting to protect them.",
    tags: ['Forests','Biodiversity'],
  },
];

// ═══════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════
type Screen = 'Home' | 'Issues' | 'Videos' | 'Quiz' | 'About';

// ═══════════════════════════════════════════════════════
//  SMALL SHARED COMPONENTS
// ═══════════════════════════════════════════════════════

function PulseDot() {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1.5, duration: 800, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1,   duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: C.lime, transform: [{ scale: anim }] }} />
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <View style={[sx.tag, { backgroundColor: color + '22', borderColor: color + '55' }]}>
      <Text style={[sx.tagText, { color }]}>{label}</Text>
    </View>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[sx.card, style]}>{children}</View>;
}

// ═══════════════════════════════════════════════════════
//  HEADER
// ═══════════════════════════════════════════════════════
function Header({ screen }: { screen: Screen }) {
  const titles: Record<Screen, string> = {
    Home: 'EcoQuest', Issues: 'Global Issues', Videos: 'Watch & Learn', Quiz: 'Eco Quiz', About: 'About',
  };
  return (
    <View style={sx.header}>
      <Text style={sx.headerLeaf}>🌿</Text>
      <Text style={sx.headerTitle}>{titles[screen]}</Text>
      <View style={sx.headerPill}>
        <PulseDot />
        <Text style={sx.headerPillText}>Live</Text>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════
//  BOTTOM NAV
// ═══════════════════════════════════════════════════════
const NAV: { screen: Screen; icon: string; label: string }[] = [
  { screen: 'Home',   icon: '🏠', label: 'Home'   },
  { screen: 'Issues', icon: '⚠️', label: 'Issues' },
  { screen: 'Videos', icon: '▶️', label: 'Watch'  },
  { screen: 'Quiz',   icon: '🧠', label: 'Quiz'   },
  { screen: 'About',  icon: 'ℹ️', label: 'About'  },
];

function BottomNav({ active, navigate }: { active: Screen; navigate: (s: Screen) => void }) {
  return (
    <View style={sx.nav}>
      {NAV.map((n) => {
        const isActive = n.screen === active;
        return (
          <TouchableOpacity key={n.screen} style={sx.navBtn} onPress={() => navigate(n.screen)} activeOpacity={0.7}>
            {isActive && <View style={sx.navPill} />}
            <Text style={[sx.navIcon, isActive && { fontSize: 24 }]}>{n.icon}</Text>
            <Text style={[sx.navLabel, isActive ? sx.navActive : sx.navInactive]}>{n.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ═══════════════════════════════════════════════════════
//  HOME SCREEN
// ═══════════════════════════════════════════════════════
function HomeScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(32)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView style={sx.screen} contentContainerStyle={sx.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── Hero ── */}
      <View style={sx.hero}>
        <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
          <View style={sx.heroBadgeRow}>
            <PulseDot />
            <Text style={sx.heroBadgeText}>Sustainability Awareness App</Text>
          </View>
          <Text style={sx.heroTitle}>EcoQuest</Text>
          <Text style={sx.heroSub}>
            Explore the planet's most urgent challenges — and discover how every action you take matters.
          </Text>
        </Animated.View>

        {/* Stats strip */}
        <View style={sx.statsRow}>
          {[
            { v: '+1.1°C', l: 'Global warming' },
            { v: '1M+',   l: 'Species at risk' },
            { v: '8M t',  l: 'Ocean plastic/yr' },
          ].map((s, i) => (
            <View key={i} style={sx.statBox}>
              <Text style={sx.statVal}>{s.v}</Text>
              <Text style={sx.statLbl}>{s.l}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Quick nav ── */}
      <View style={sx.sectionRow}>
        <Text style={sx.sectionTitle}>Explore</Text>
      </View>
      <View style={sx.grid}>
        {[
          { icon: '⚠️', label: 'Global Issues',  screen: 'Issues' as Screen, bg: '#FFF3E0' },
          { icon: '▶️', label: 'Watch Videos',   screen: 'Videos' as Screen, bg: '#E8F5E9' },
          { icon: '🧠', label: 'Take the Quiz',  screen: 'Quiz'   as Screen, bg: '#E3F2FD' },
          { icon: 'ℹ️', label: 'About EcoQuest', screen: 'About'  as Screen, bg: '#F3E5F5' },
        ].map((c, i) => (
          <TouchableOpacity key={i} style={[sx.gridCard, { backgroundColor: c.bg }]} onPress={() => navigate(c.screen)} activeOpacity={0.8}>
            <Text style={sx.gridIcon}>{c.icon}</Text>
            <Text style={sx.gridLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Did you know ── */}
      <View style={sx.dykBox}>
        <Text style={sx.dykHead}>🌱 Did You Know?</Text>
        <Text style={sx.dykBody}>
          If everyone on Earth consumed like the average person in a high-income country, we would need over 3 planets to sustain our resource use.
        </Text>
        <TouchableOpacity style={sx.dykBtn} onPress={() => navigate('Quiz')} activeOpacity={0.85}>
          <Text style={sx.dykBtnText}>Test Your Knowledge →</Text>
        </TouchableOpacity>
      </View>

      {/* ── Top Issues preview ── */}
      <View style={sx.sectionRow}>
        <Text style={sx.sectionTitle}>Top Issues</Text>
        <TouchableOpacity onPress={() => navigate('Issues')}><Text style={sx.seeAll}>See all →</Text></TouchableOpacity>
      </View>
      {ISSUES.slice(0, 3).map((issue) => (
        <TouchableOpacity key={issue.id} style={sx.previewCard} onPress={() => navigate('Issues')} activeOpacity={0.88}>
          <View style={[sx.previewIconBox, { backgroundColor: issue.severityColor + '20' }]}>
            <Text style={{ fontSize: 26 }}>{issue.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={sx.previewTitle}>{issue.title}</Text>
            <Text style={sx.previewSub} numberOfLines={2}>{issue.summary}</Text>
          </View>
          <View style={[sx.severityBadge, { backgroundColor: issue.severityColor + '20' }]}>
            <Text style={[sx.severityText, { color: issue.severityColor }]}>{issue.severity}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: 28 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════
//  ISSUES SCREEN
// ═══════════════════════════════════════════════════════
function IssuesScreen() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ScrollView style={sx.screen} contentContainerStyle={sx.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={sx.pageHero}>
        <Text style={sx.pageHeroTitle}>🌍 Global Issues</Text>
        <Text style={sx.pageHeroSub}>
          Tap any issue to learn more and discover what you can do.
        </Text>
      </View>

      {ISSUES.map((issue) => {
        const isOpen = open === issue.id;
        return (
          <TouchableOpacity
            key={issue.id}
            style={sx.issueCard}
            onPress={() => setOpen(isOpen ? null : issue.id)}
            activeOpacity={0.9}
          >
            {/* Header row */}
            <View style={sx.issueCardTop}>
              <View style={[sx.issueIconBox, { backgroundColor: issue.severityColor + '18' }]}>
                <Text style={{ fontSize: 30 }}>{issue.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={sx.issueCardTitle}>{issue.title}</Text>
                <View style={[sx.severityBadge, { backgroundColor: issue.severityColor + '20', alignSelf: 'flex-start', marginTop: 4 }]}>
                  <Text style={[sx.severityText, { color: issue.severityColor }]}>● {issue.severity}</Text>
                </View>
              </View>
              {/* Stat */}
              <View style={sx.issueStat}>
                <Text style={[sx.issueStatVal, { color: issue.severityColor }]}>{issue.stat}</Text>
                <Text style={sx.issueStatLbl}>{issue.statLabel}</Text>
              </View>
              <Text style={sx.issueChevron}>{isOpen ? '▲' : '▼'}</Text>
            </View>

            {/* Expanded */}
            {isOpen && (
              <View style={sx.issueExpanded}>
                <Text style={sx.issueText}>{issue.summary}</Text>
                <Text style={sx.actionsHead}>✅ What you can do:</Text>
                {issue.actions.map((a, i) => (
                  <View key={i} style={sx.actionRow}>
                    <View style={[sx.actionDot, { backgroundColor: issue.severityColor }]} />
                    <Text style={sx.actionText}>{a}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
      <View style={{ height: 28 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════
//  VIDEOS SCREEN
// ═══════════════════════════════════════════════════════
function VideosScreen() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ScrollView style={sx.screen} contentContainerStyle={sx.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={sx.pageHero}>
        <Text style={sx.pageHeroTitle}>▶️ Watch & Learn</Text>
        <Text style={sx.pageHeroSub}>
          Powerful stories about our planet and the people working to protect it.
        </Text>
      </View>

      {VIDEOS.map((v) => (
        <Card key={v.id} style={{ marginBottom: 18, overflow: 'hidden', padding: 0 }}>
          {/* Thumbnail */}
          <TouchableOpacity
            style={sx.videoThumb}
            onPress={() => setPlaying(playing === v.id ? null : v.id)}
            activeOpacity={0.9}
          >
            <Text style={sx.videoEmoji}>{v.emoji}</Text>
            <View style={sx.playBtn}>
              <Text style={sx.playIcon}>{playing === v.id ? '⏸' : '▶'}</Text>
            </View>
            <View style={sx.durationPill}>
              <Text style={sx.durationText}>{v.duration}</Text>
            </View>
          </TouchableOpacity>

          {/* Info */}
          <View style={{ padding: 16 }}>
            <Text style={sx.videoTitle}>{v.title}</Text>
            <Text style={sx.videoChannel}>{v.channel}</Text>
            <Text style={sx.videoDesc}>{v.description}</Text>
            <View style={sx.tagsRow}>
              {v.tags.map((t) => <Tag key={t} label={t} color={C.emerald} />)}
            </View>
          </View>

          {/* Player mock */}
          {playing === v.id && (
            <View style={sx.playerMock}>
              <Text style={sx.playerEmoji}>🎬</Text>
              <Text style={sx.playerTitle}>Now Playing</Text>
              <Text style={sx.playerSub}>{v.title}</Text>
              <Text style={sx.playerNote}>
                Integrate expo-av or a WebView YouTube embed to play real video content.
              </Text>
              <TouchableOpacity style={sx.playerClose} onPress={() => setPlaying(null)}>
                <Text style={sx.playerCloseText}>✕  Close Player</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>
      ))}
      <View style={{ height: 28 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════
//  QUIZ SCREEN
// ═══════════════════════════════════════════════════════
type QuizPhase = 'intro' | 'playing' | 'result';

function QuizScreen() {
  const [phase, setPhase]       = useState<QuizPhase>('intro');
  const [qIdx, setQIdx]         = useState(0);
  const [score, setScore]       = useState(0);
  const [picked, setPicked]     = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [history, setHistory]   = useState<boolean[]>([]);

  const bounce = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  const doBounce = () => {
    Animated.sequence([
      Animated.timing(bounce, { toValue: 1.06, duration: 110, useNativeDriver: true }),
      Animated.timing(bounce, { toValue: 1,    duration: 110, useNativeDriver: true }),
    ]).start();
  };

  const doFadeIn = () => {
    fadeIn.setValue(0);
    Animated.timing(fadeIn, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  };

  useEffect(() => { doFadeIn(); }, [qIdx]);

  const pick = (idx: number) => {
    if (revealed) return;
    setPicked(idx);
    setRevealed(true);
    const correct = idx === QUIZ_QUESTIONS[qIdx].ans;
    if (correct) { setScore((s) => s + 1); doBounce(); }
    setHistory((h) => [...h, correct]);
  };

  const next = () => {
    if (qIdx + 1 >= QUIZ_QUESTIONS.length) {
      setPhase('result');
    } else {
      setQIdx((i) => i + 1);
      setPicked(null);
      setRevealed(false);
    }
  };

  const restart = () => {
    setPhase('intro'); setQIdx(0); setScore(0);
    setPicked(null); setRevealed(false); setHistory([]);
  };

  // ── Intro ──
  if (phase === 'intro') return (
    <ScrollView style={sx.screen} contentContainerStyle={[sx.scrollContent, sx.center]}>
      <Text style={{ fontSize: 72, textAlign: 'center' }}>🧠</Text>
      <Text style={sx.quizBigTitle}>Eco Quiz</Text>
      <Text style={sx.quizIntroSub}>
        10 questions covering climate, oceans, biodiversity, energy and more. Learn a fact after every answer!
      </Text>
      <View style={sx.quizInfoRow}>
        {[['10','Questions'],['1 pt','Per correct'],['Facts','After each']].map(([v,l],i) => (
          <View key={i} style={sx.quizInfoBox}>
            <Text style={sx.quizInfoVal}>{v}</Text>
            <Text style={sx.quizInfoLbl}>{l}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={sx.bigBtn} onPress={() => setPhase('playing')}>
        <Text style={sx.bigBtnText}>Start Quiz →</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // ── Result ──
  if (phase === 'result') {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const { label, color } =
      score >= 9 ? { label: '🏆 Eco Champion!',   color: C.sand    } :
      score >= 7 ? { label: '🌿 Green Expert!',    color: C.mint    } :
      score >= 5 ? { label: '🌱 Eco Learner!',     color: C.emerald } :
                   { label: '📚 Keep Exploring!',  color: C.coral   };
    return (
      <ScrollView style={sx.screen} contentContainerStyle={[sx.scrollContent, sx.center]}>
        <Text style={[sx.resultLabel, { color }]}>{label}</Text>
        <Text style={sx.resultScore}>{score}<Text style={sx.resultOf}>/{QUIZ_QUESTIONS.length}</Text></Text>
        <Text style={sx.resultPct}>{pct}% correct</Text>
        <Text style={sx.resultSub}>
          {score >= 8 ? 'Outstanding! You clearly care deeply about our planet.' :
           score >= 5 ? 'Good work! Keep exploring EcoQuest to learn even more.' :
                        'Every expert was once a beginner — keep going!'}
        </Text>
        {/* Answer breakdown */}
        <View style={sx.breakdown}>
          {history.map((ok, i) => (
            <View key={i} style={[sx.breakDot, { backgroundColor: ok ? C.mint : C.danger }]}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>{ok ? '✓' : '✗'}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={sx.bigBtn} onPress={restart}>
          <Text style={sx.bigBtnText}>Play Again</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ── Playing ──
  const q = QUIZ_QUESTIONS[qIdx];
  const progress = ((qIdx) / QUIZ_QUESTIONS.length) * 100;

  return (
    <ScrollView style={sx.screen} showsVerticalScrollIndicator={false}>
      {/* Progress bar */}
      <View style={sx.progressTrack}>
        <View style={[sx.progressFill, { width: `${progress}%` as any }]} />
      </View>

      {/* Top row */}
      <View style={sx.quizTopRow}>
        <Text style={sx.quizCounter}>Q {qIdx + 1} of {QUIZ_QUESTIONS.length}</Text>
        <View style={sx.scoreChip}>
          <Text style={sx.scoreChipText}>🌿 {score} pts</Text>
        </View>
      </View>

      {/* Question card */}
      <Animated.View style={[sx.questionCard, { opacity: fadeIn, transform: [{ scale: bounce }] }]}>
        <Text style={{ fontSize: 36, marginBottom: 12 }}>{q.emoji}</Text>
        <Text style={sx.questionText}>{q.q}</Text>
      </Animated.View>

      {/* Options */}
      <View style={sx.optionsWrap}>
        {q.opts.map((opt, i) => {
          const isCorrect = i === q.ans;
          const isPicked  = i === picked;
          let bg     = C.white;
          let border = C.border;
          let tc     = C.dark;

          if (revealed) {
            if (isCorrect)             { bg = '#E8F5E9'; border = C.mint;   tc = C.forest; }
            else if (isPicked)         { bg = '#FFEBEE'; border = C.danger; tc = C.danger; }
          } else if (isPicked) {
            bg = C.lime + '44'; border = C.mint;
          }

          return (
            <TouchableOpacity
              key={i}
              style={[sx.optBtn, { backgroundColor: bg, borderColor: border }]}
              onPress={() => pick(i)}
              activeOpacity={revealed ? 1 : 0.8}
            >
              <View style={[sx.optLetter, { borderColor: border }]}>
                <Text style={[sx.optLetterText, { color: tc }]}>{['A','B','C','D'][i]}</Text>
              </View>
              <Text style={[sx.optText, { color: tc, flex: 1 }]}>{opt}</Text>
              {revealed && isCorrect && <Text style={{ fontSize: 18 }}>✅</Text>}
              {revealed && isPicked && !isCorrect && <Text style={{ fontSize: 18 }}>❌</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Fact reveal */}
      {revealed && (
        <Animated.View style={[sx.factCard, { opacity: fadeIn }]}>
          <Text style={sx.factHead}>💡 Did you know?</Text>
          <Text style={sx.factBody}>{q.fact}</Text>
        </Animated.View>
      )}

      {revealed && (
        <TouchableOpacity style={[sx.bigBtn, { marginHorizontal: 16, marginTop: 16, marginBottom: 32 }]} onPress={next}>
          <Text style={sx.bigBtnText}>
            {qIdx + 1 >= QUIZ_QUESTIONS.length ? 'See My Results →' : 'Next Question →'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════
//  ABOUT SCREEN
// ═══════════════════════════════════════════════════════
function AboutScreen() {
  return (
    <ScrollView style={sx.screen} contentContainerStyle={sx.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={sx.pageHero}>
        <Text style={sx.pageHeroTitle}>ℹ️ About EcoQuest</Text>
        <Text style={sx.pageHeroSub}>Our mission, the technology, and the assignment behind this app.</Text>
      </View>

      {/* Mission */}
      <Card style={{ marginBottom: 16 }}>
        <Text style={sx.aboutEmoji}>🌍</Text>
        <Text style={sx.aboutCardTitle}>Our Mission</Text>
        <Text style={sx.aboutCardText}>
          EcoQuest was created to help everyday people understand the most pressing sustainability challenges
          facing our planet — and feel empowered to take meaningful action. We believe education is the
          foundation of lasting change.
        </Text>
      </Card>

      {/* App info */}
      <Card style={{ marginBottom: 16 }}>
        <Text style={sx.aboutEmoji}>📱</Text>
        <Text style={sx.aboutCardTitle}>About This App</Text>
        <Text style={sx.aboutCardText}>
          EcoQuest is built with React Native + Expo, making it fully cross-platform for iOS, Android and web.
          It features interactive issue exploration, educational video content, and a 10-question knowledge quiz
          — all designed to make sustainability learning genuinely engaging.
        </Text>
      </Card>

      {/* Tech stack */}
      <Card style={{ marginBottom: 16 }}>
        <Text style={sx.aboutEmoji}>🛠️</Text>
        <Text style={sx.aboutCardTitle}>Technology Stack</Text>
        {[
          ['React Native','Cross-platform mobile UI framework'],
          ['Expo SDK 51',  'Unified development & build platform'],
          ['TypeScript',   'Type-safe JavaScript throughout'],
          ['Animated API', 'Smooth native animations'],
          ['React Hooks',  'State & effects management'],
        ].map(([tech, desc], i) => (
          <View key={i} style={sx.techRow}>
            <Text style={sx.techName}>{tech}</Text>
            <Text style={sx.techDesc}>{desc}</Text>
          </View>
        ))}
      </Card>

      {/* BTEC criteria */}
      <Card style={{ marginBottom: 16 }}>
        <Text style={sx.aboutEmoji}>📋</Text>
        <Text style={sx.aboutCardTitle}>BTEC Assignment Criteria</Text>
        <Text style={sx.aboutCardText}>
          This app was developed for Unit 7: Mobile Apps Development — Pearson BTEC International Level 3 IT.
          Learning Aims B (Design) and C (Development).
        </Text>
        {[
          { ref: '7/B.P3',  desc: 'Produce designs for a mobile app to meet identified requirements' },
          { ref: '7/B.M2',  desc: 'Justify how design decisions ensure the app meets requirements' },
          { ref: '7/C.M3',  desc: 'Optimise a mobile app that meets the design criteria' },
          { ref: '7/BC.D2', desc: 'Evaluate the design and optimised app against client requirements' },
          { ref: '7/BC.D3', desc: 'Demonstrate individual responsibility, creativity and self-management' },
        ].map((c, i) => (
          <View key={i} style={sx.criteriaRow}>
            <View style={sx.criteriaRef}>
              <Text style={sx.criteriaRefText}>{c.ref}</Text>
            </View>
            <Text style={sx.criteriaDesc}>{c.desc}</Text>
          </View>
        ))}
      </Card>

      <View style={{ height: 28 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState<Screen>('Home');

  const renderScreen = () => {
    switch (screen) {
      case 'Home':   return <HomeScreen navigate={setScreen} />;
      case 'Issues': return <IssuesScreen />;
      case 'Videos': return <VideosScreen />;
      case 'Quiz':   return <QuizScreen />;
      case 'About':  return <AboutScreen />;
    }
  };

  return (
    <SafeAreaView style={sx.root}>
      <ExpoStatusBar style="light" />
      <View style={sx.appContainer}>
        <Header screen={screen} />
        <View style={{ flex: 1 }}>
          {renderScreen()}
        </View>
        <BottomNav active={screen} navigate={setScreen} />
      </View>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════
const maxW = (w: number) => Math.min(w, CONTENT_MAX);

const sx = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.forest,
  },
  appContainer: {
    flex: 1,
    backgroundColor: C.cream,
    maxWidth: CONTENT_MAX,
    width: '100%',
    alignSelf: 'center' as any,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.forest,
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 10,
  },
  headerLeaf:  { fontSize: 22 },
  headerTitle: { flex: 1, color: C.white, fontSize: 20, fontWeight: '800', letterSpacing: 0.3 },
  headerPill:  { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: C.mint + '30', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: C.mint + '55' },
  headerPillText: { color: C.lime, fontSize: 11, fontWeight: '700' },

  // ── Nav ──
  nav: {
    flexDirection: 'row',
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingBottom: Platform.OS === 'ios' ? 22 : 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 14,
  },
  navBtn:     { flex: 1, alignItems: 'center', gap: 2, position: 'relative' },
  navPill:    { position: 'absolute', top: -9, width: 28, height: 3, backgroundColor: C.mint, borderRadius: 2 },
  navIcon:    { fontSize: 20 },
  navLabel:   { fontSize: 10, fontWeight: '600' },
  navActive:  { color: C.emerald },
  navInactive:{ color: C.muted },

  // ── Scroll ──
  screen:        { flex: 1, backgroundColor: C.cream },
  scrollContent: { paddingBottom: 20 },
  center:        { alignItems: 'center', justifyContent: 'center', paddingTop: 40 },

  // ── Hero ──
  hero: {
    backgroundColor: C.forest,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 34,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroBadgeRow:  { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 },
  heroBadgeText: { color: C.lime, fontSize: 12, fontWeight: '700', letterSpacing: 0.8 },
  heroTitle:     { color: C.white, fontSize: 46, fontWeight: '900', letterSpacing: -1 },
  heroSub:       { color: C.lime + 'BB', fontSize: 15, lineHeight: 23, marginTop: 10, marginBottom: 26 },
  statsRow:      { flexDirection: 'row', gap: 10 },
  statBox:       { flex: 1, backgroundColor: C.emerald + '55', borderRadius: 16, padding: 12, alignItems: 'center' },
  statVal:       { color: C.white, fontSize: 17, fontWeight: '800' },
  statLbl:       { color: C.lime + 'AA', fontSize: 11, textAlign: 'center', marginTop: 2 },

  // ── Section ──
  sectionRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginTop: 26, marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: C.dark },
  seeAll:       { fontSize: 14, color: C.emerald, fontWeight: '700' },

  // ── Grid cards ──
  grid:      { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14, gap: 12 },
  gridCard:  { width: (Math.min(width, CONTENT_MAX) - 40) / 2, borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  gridIcon:  { fontSize: 36, marginBottom: 10 },
  gridLabel: { fontSize: 14, fontWeight: '700', color: C.dark, textAlign: 'center' },

  // ── Did you know ──
  dykBox:    { marginHorizontal: 18, marginTop: 24, backgroundColor: C.forest, borderRadius: 24, padding: 22 },
  dykHead:   { color: C.lime, fontSize: 16, fontWeight: '800', marginBottom: 10 },
  dykBody:   { color: C.white + 'CC', fontSize: 14, lineHeight: 22, marginBottom: 16 },
  dykBtn:    { backgroundColor: C.mint, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  dykBtnText:{ color: C.forest, fontWeight: '800', fontSize: 15 },

  // ── Preview card ──
  previewCard:    { flexDirection: 'row', alignItems: 'center', marginHorizontal: 18, marginBottom: 10, backgroundColor: C.white, borderRadius: 18, padding: 14, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  previewIconBox: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  previewTitle:   { fontSize: 15, fontWeight: '700', color: C.dark },
  previewSub:     { fontSize: 12, color: C.muted, marginTop: 2 },
  severityBadge:  { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  severityText:   { fontSize: 11, fontWeight: '700' },

  // ── Page hero ──
  pageHero:      { backgroundColor: C.forest, padding: 24, borderBottomLeftRadius: 26, borderBottomRightRadius: 26, marginBottom: 20 },
  pageHeroTitle: { color: C.white, fontSize: 26, fontWeight: '900' },
  pageHeroSub:   { color: C.lime + 'BB', fontSize: 14, marginTop: 6, lineHeight: 21 },

  // ── Card ──
  card: { marginHorizontal: 16, backgroundColor: C.white, borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },

  // ── Issue card ──
  issueCard:    { marginHorizontal: 16, marginBottom: 12, backgroundColor: C.white, borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  issueCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  issueIconBox: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  issueCardTitle: { fontSize: 16, fontWeight: '800', color: C.dark },
  issueStat:    { alignItems: 'center', marginRight: 4 },
  issueStatVal: { fontSize: 15, fontWeight: '900' },
  issueStatLbl: { fontSize: 10, color: C.muted, textAlign: 'center' },
  issueChevron: { fontSize: 14, color: C.muted },
  issueExpanded:{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#EEF4F0' },
  issueText:    { fontSize: 14, color: C.dark, lineHeight: 22, marginBottom: 14 },
  actionsHead:  { fontSize: 14, fontWeight: '700', color: C.emerald, marginBottom: 10 },
  actionRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  actionDot:    { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  actionText:   { flex: 1, fontSize: 14, color: C.dark, lineHeight: 20 },

  // ── Tag ──
  tag:     { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, marginRight: 6 },
  tagText: { fontSize: 11, fontWeight: '700' },
  tagsRow: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap' },

  // ── Video ──
  videoThumb:   { height: 180, backgroundColor: C.forestMid, alignItems: 'center', justifyContent: 'center' },
  videoEmoji:   { fontSize: 60 },
  playBtn:      { position: 'absolute', width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center' },
  playIcon:     { fontSize: 22, color: C.forest, marginLeft: 3 },
  durationPill: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  durationText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  videoTitle:   { fontSize: 16, fontWeight: '800', color: C.dark, marginBottom: 3 },
  videoChannel: { fontSize: 12, color: C.mint, fontWeight: '600', marginBottom: 8 },
  videoDesc:    { fontSize: 13, color: C.muted, lineHeight: 20 },
  playerMock:   { margin: 16, backgroundColor: C.forest, borderRadius: 18, padding: 22, alignItems: 'center' },
  playerEmoji:  { fontSize: 44, marginBottom: 10 },
  playerTitle:  { color: C.white, fontSize: 18, fontWeight: '800', marginBottom: 4 },
  playerSub:    { color: C.lime, fontSize: 14, marginBottom: 10 },
  playerNote:   { color: C.lime + '88', fontSize: 12, textAlign: 'center', marginBottom: 18 },
  playerClose:  { backgroundColor: C.white + '20', borderRadius: 12, paddingHorizontal: 22, paddingVertical: 10 },
  playerCloseText: { color: C.white, fontWeight: '700', fontSize: 14 },

  // ── Quiz shared ──
  bigBtn:     { backgroundColor: C.forest, borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  bigBtnText: { color: C.white, fontSize: 17, fontWeight: '800' },

  // ── Quiz intro ──
  quizBigTitle: { fontSize: 36, fontWeight: '900', color: C.dark, marginTop: 12, marginBottom: 12, textAlign: 'center' },
  quizIntroSub: { fontSize: 15, color: C.muted, textAlign: 'center', lineHeight: 24, marginBottom: 28, paddingHorizontal: 24 },
  quizInfoRow:  { flexDirection: 'row', gap: 14, marginBottom: 32, paddingHorizontal: 16 },
  quizInfoBox:  { flex: 1, backgroundColor: C.white, borderRadius: 16, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  quizInfoVal:  { fontSize: 20, fontWeight: '900', color: C.emerald },
  quizInfoLbl:  { fontSize: 11, color: C.muted, marginTop: 4, textAlign: 'center' },

  // ── Quiz playing ──
  progressTrack: { height: 5, backgroundColor: '#E0EAE4' },
  progressFill:  { height: 5, backgroundColor: C.mint, borderRadius: 3 },
  quizTopRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  quizCounter:   { fontSize: 14, fontWeight: '700', color: C.muted },
  scoreChip:     { backgroundColor: C.emerald + '20', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  scoreChipText: { color: C.emerald, fontWeight: '800', fontSize: 14 },
  questionCard:  { marginHorizontal: 16, backgroundColor: C.forest, borderRadius: 24, padding: 24, marginBottom: 20, alignItems: 'center' },
  questionText:  { color: C.white, fontSize: 18, fontWeight: '700', lineHeight: 27, textAlign: 'center' },
  optionsWrap:   { paddingHorizontal: 16, gap: 12 },
  optBtn:        { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: C.border, gap: 14 },
  optLetter:     { width: 34, height: 34, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  optLetterText: { fontWeight: '800', fontSize: 14 },
  optText:       { fontSize: 15, fontWeight: '600' },
  factCard:      { marginHorizontal: 16, marginTop: 18, backgroundColor: C.sand + '33', borderRadius: 20, padding: 18, borderLeftWidth: 4, borderLeftColor: C.sand },
  factHead:      { fontSize: 15, fontWeight: '800', color: C.dark, marginBottom: 6 },
  factBody:      { fontSize: 14, color: C.dark, lineHeight: 22 },

  // ── Quiz result ──
  resultLabel: { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  resultScore: { fontSize: 72, fontWeight: '900', color: C.dark, textAlign: 'center' },
  resultOf:    { fontSize: 32, color: C.muted },
  resultPct:   { fontSize: 16, color: C.muted, fontWeight: '600', marginBottom: 8 },
  resultSub:   { fontSize: 15, color: C.muted, textAlign: 'center', lineHeight: 24, marginBottom: 28, paddingHorizontal: 24 },
  breakdown:   { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 },
  breakDot:    { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },

  // ── About ──
  aboutEmoji:     { fontSize: 38, marginBottom: 10 },
  aboutCardTitle: { fontSize: 18, fontWeight: '800', color: C.dark, marginBottom: 10 },
  aboutCardText:  { fontSize: 14, color: C.muted, lineHeight: 22 },
  techRow:        { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEF4F0' },
  techName:       { fontSize: 14, fontWeight: '700', color: C.dark },
  techDesc:       { fontSize: 13, color: C.muted },
  criteriaRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 12 },
  criteriaRef:    { backgroundColor: C.emerald + '20', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, minWidth: 72, alignItems: 'center' },
  criteriaRefText:{ fontSize: 12, fontWeight: '800', color: C.emerald },
  criteriaDesc:   { flex: 1, fontSize: 13, color: C.muted, lineHeight: 20 },
});
