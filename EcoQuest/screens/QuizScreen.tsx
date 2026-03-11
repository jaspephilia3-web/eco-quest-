import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { QuizPhase } from '../types';
import { sx } from '../styles/sx';
import { C } from '../constants/colors';
import { QUIZ_QUESTIONS } from '../constants/data';

export default function QuizScreen() {
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
    setPhase('intro');
    setQIdx(0);
    setScore(0);
    setPicked(null);
    setRevealed(false);
    setHistory([]);
  };

  // ── Intro ──
  if (phase === 'intro') return (
    <ScrollView style={sx.screen} contentContainerStyle={[sx.scrollContent, sx.center]}>
      <Text style={{ fontSize: 72, textAlign: 'center' }}>🧠</Text>
      <Text style={sx.quizBigTitle}>Eco Quiz</Text>
      <Text style={sx.quizIntroSub}>
        10 questions covering climate, oceans, biodiversity, energy and more.
        Learn a fact after every answer!
      </Text>
      <View style={sx.quizInfoRow}>
        {[['10', 'Questions'], ['1 pt', 'Per correct'], ['Facts', 'After each']].map(([v, l], i) => (
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
      score >= 9 ? { label: '🏆 Eco Champion!',  color: C.sand    } :
      score >= 7 ? { label: '🌿 Green Expert!',   color: C.mint    } :
      score >= 5 ? { label: '🌱 Eco Learner!',    color: C.emerald } :
                   { label: '📚 Keep Exploring!', color: C.coral   };
    return (
      <ScrollView style={sx.screen} contentContainerStyle={[sx.scrollContent, sx.center]}>
        <Text style={[sx.resultLabel, { color }]}>{label}</Text>
        <Text style={sx.resultScore}>
          {score}<Text style={sx.resultOf}>/{QUIZ_QUESTIONS.length}</Text>
        </Text>
        <Text style={sx.resultPct}>{pct}% correct</Text>
        <Text style={sx.resultSub}>
          {score >= 8
            ? 'Outstanding! You clearly care deeply about our planet.'
            : score >= 5
            ? 'Good work! Keep exploring EcoQuest to learn even more.'
            : 'Every expert was once a beginner — keep going!'}
        </Text>
        {/* Answer breakdown */}
        <View style={sx.breakdown}>
          {history.map((ok, i) => (
            <View key={i} style={[sx.breakDot, { backgroundColor: ok ? C.mint : C.danger }]}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>
                {ok ? '✓' : '✗'}
              </Text>
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
  const progress = (qIdx / QUIZ_QUESTIONS.length) * 100;

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
            if (isCorrect)         { bg = '#E8F5E9'; border = C.mint;   tc = C.forest; }
            else if (isPicked)     { bg = '#FFEBEE'; border = C.danger; tc = C.danger; }
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
                <Text style={[sx.optLetterText, { color: tc }]}>{['A', 'B', 'C', 'D'][i]}</Text>
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
        <TouchableOpacity
          style={[sx.bigBtn, { marginHorizontal: 16, marginTop: 16, marginBottom: 32 }]}
          onPress={next}
        >
          <Text style={sx.bigBtnText}>
            {qIdx + 1 >= QUIZ_QUESTIONS.length ? 'See My Results →' : 'Next Question →'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
