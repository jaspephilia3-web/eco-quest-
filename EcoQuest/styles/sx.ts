import { StyleSheet, Dimensions, Platform } from 'react-native';
import { C } from '../constants/colors';

const { width } = Dimensions.get('window');
export const CONTENT_MAX = 600;

export const maxW = (w: number) => Math.min(w, CONTENT_MAX);

export const sx = StyleSheet.create({
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
  headerLeaf:     { fontSize: 22 },
  headerTitle:    { flex: 1, color: C.white, fontSize: 20, fontWeight: '800', letterSpacing: 0.3 },
  headerPill:     { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: C.mint + '30', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: C.mint + '55' },
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
  navBtn:      { flex: 1, alignItems: 'center', gap: 2, position: 'relative' },
  navPill:     { position: 'absolute', top: -9, width: 28, height: 3, backgroundColor: C.mint, borderRadius: 2 },
  navIcon:     { fontSize: 20 },
  navLabel:    { fontSize: 10, fontWeight: '600' },
  navActive:   { color: C.emerald },
  navInactive: { color: C.muted },

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
  dykBox:     { marginHorizontal: 18, marginTop: 24, backgroundColor: C.forest, borderRadius: 24, padding: 22 },
  dykHead:    { color: C.lime, fontSize: 16, fontWeight: '800', marginBottom: 10 },
  dykBody:    { color: C.white + 'CC', fontSize: 14, lineHeight: 22, marginBottom: 16 },
  dykBtn:     { backgroundColor: C.mint, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  dykBtnText: { color: C.forest, fontWeight: '800', fontSize: 15 },

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
  issueCard:      { marginHorizontal: 16, marginBottom: 12, backgroundColor: C.white, borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  issueCardTop:   { flexDirection: 'row', alignItems: 'center', gap: 12 },
  issueIconBox:   { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  issueCardTitle: { fontSize: 16, fontWeight: '800', color: C.dark },
  issueStat:      { alignItems: 'center', marginRight: 4 },
  issueStatVal:   { fontSize: 15, fontWeight: '900' },
  issueStatLbl:   { fontSize: 10, color: C.muted, textAlign: 'center' },
  issueChevron:   { fontSize: 14, color: C.muted },
  issueExpanded:  { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#EEF4F0' },
  issueText:      { fontSize: 14, color: C.dark, lineHeight: 22, marginBottom: 14 },
  actionsHead:    { fontSize: 14, fontWeight: '700', color: C.emerald, marginBottom: 10 },
  actionRow:      { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  actionDot:      { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  actionText:     { flex: 1, fontSize: 14, color: C.dark, lineHeight: 20 },

  // ── Tag ──
  tag:     { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, marginRight: 6 },
  tagText: { fontSize: 11, fontWeight: '700' },
  tagsRow: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap' },

  // ── Video ──
  videoThumb:      { height: 180, backgroundColor: C.forestMid, alignItems: 'center', justifyContent: 'center' },
  videoEmoji:      { fontSize: 60 },
  playBtn:         { position: 'absolute', width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center' },
  playIcon:        { fontSize: 22, color: C.forest, marginLeft: 3 },
  durationPill:    { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  durationText:    { color: '#fff', fontSize: 12, fontWeight: '700' },
  videoTitle:      { fontSize: 16, fontWeight: '800', color: C.dark, marginBottom: 3 },
  videoChannel:    { fontSize: 12, color: C.mint, fontWeight: '600', marginBottom: 8 },
  videoDesc:       { fontSize: 13, color: C.muted, lineHeight: 20 },
  playerMock:      { margin: 16, backgroundColor: C.forest, borderRadius: 18, padding: 22, alignItems: 'center' },
  playerEmoji:     { fontSize: 44, marginBottom: 10 },
  playerTitle:     { color: C.white, fontSize: 18, fontWeight: '800', marginBottom: 4 },
  playerSub:       { color: C.lime, fontSize: 14, marginBottom: 10 },
  playerNote:      { color: C.lime + '88', fontSize: 12, textAlign: 'center', marginBottom: 18 },
  playerClose:     { backgroundColor: C.white + '20', borderRadius: 12, paddingHorizontal: 22, paddingVertical: 10 },
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
  aboutEmoji:      { fontSize: 38, marginBottom: 10 },
  aboutCardTitle:  { fontSize: 18, fontWeight: '800', color: C.dark, marginBottom: 10 },
  aboutCardText:   { fontSize: 14, color: C.muted, lineHeight: 22 },
  techRow:         { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEF4F0' },
  techName:        { fontSize: 14, fontWeight: '700', color: C.dark },
  techDesc:        { fontSize: 13, color: C.muted },
  criteriaRow:     { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 12 },
  criteriaRef:     { backgroundColor: C.emerald + '20', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, minWidth: 72, alignItems: 'center' },
  criteriaRefText: { fontSize: 12, fontWeight: '800', color: C.emerald },
  criteriaDesc:    { flex: 1, fontSize: 13, color: C.muted, lineHeight: 20 },
});
