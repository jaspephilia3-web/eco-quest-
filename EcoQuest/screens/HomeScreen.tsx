import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Screen } from '../types';
import { sx } from '../styles/sx';
import { C } from '../constants/colors';
import { ISSUES } from '../constants/data';
import PulseDot from '../components/PulseDot';

interface HomeScreenProps {
  navigate: (s: Screen) => void;
}

export default function HomeScreen({ navigate }: HomeScreenProps) {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(32)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView
      style={sx.screen}
      contentContainerStyle={sx.scrollContent}
      showsVerticalScrollIndicator={false}
    >
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
            { v: '+1.1°C', l: 'Global warming'   },
            { v: '1M+',    l: 'Species at risk'   },
            { v: '8M t',   l: 'Ocean plastic/yr'  },
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
          <TouchableOpacity
            key={i}
            style={[sx.gridCard, { backgroundColor: c.bg }]}
            onPress={() => navigate(c.screen)}
            activeOpacity={0.8}
          >
            <Text style={sx.gridIcon}>{c.icon}</Text>
            <Text style={sx.gridLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Did you know ── */}
      <View style={sx.dykBox}>
        <Text style={sx.dykHead}>🌱 Did You Know?</Text>
        <Text style={sx.dykBody}>
          If everyone on Earth consumed like the average person in a high-income country, we would
          need over 3 planets to sustain our resource use.
        </Text>
        <TouchableOpacity style={sx.dykBtn} onPress={() => navigate('Quiz')} activeOpacity={0.85}>
          <Text style={sx.dykBtnText}>Test Your Knowledge →</Text>
        </TouchableOpacity>
      </View>

      {/* ── Top Issues preview ── */}
      <View style={sx.sectionRow}>
        <Text style={sx.sectionTitle}>Top Issues</Text>
        <TouchableOpacity onPress={() => navigate('Issues')}>
          <Text style={sx.seeAll}>See all →</Text>
        </TouchableOpacity>
      </View>
      {ISSUES.slice(0, 3).map((issue) => (
        <TouchableOpacity
          key={issue.id}
          style={sx.previewCard}
          onPress={() => navigate('Issues')}
          activeOpacity={0.88}
        >
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
