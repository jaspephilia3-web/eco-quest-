import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { sx } from '../styles/sx';
import Card from '../components/Card';

export default function AboutScreen() {
  return (
    <ScrollView
      style={sx.screen}
      contentContainerStyle={sx.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={sx.pageHero}>
        <Text style={sx.pageHeroTitle}>ℹ️ About EcoQuest</Text>
        <Text style={sx.pageHeroSub}>
          Our mission, the technology, and the assignment behind this app.
        </Text>
      </View>

      {/* Mission */}
      <Card style={{ marginBottom: 16 }}>
        <Text style={sx.aboutEmoji}>🌍</Text>
        <Text style={sx.aboutCardTitle}>Our Mission</Text>
        <Text style={sx.aboutCardText}>
          EcoQuest was created to help everyday people understand the most pressing sustainability
          challenges facing our planet — and feel empowered to take meaningful action. We believe
          education is the foundation of lasting change.
        </Text>
      </Card>

      {/* App info */}
      <Card style={{ marginBottom: 16 }}>
        <Text style={sx.aboutEmoji}>📱</Text>
        <Text style={sx.aboutCardTitle}>About This App</Text>
        <Text style={sx.aboutCardText}>
          EcoQuest is built with React Native + Expo, making it fully cross-platform for iOS,
          Android and web. It features interactive issue exploration, educational video content,
          and a 10-question knowledge quiz — all designed to make sustainability learning
          genuinely engaging.
        </Text>
      </Card>

      {/* Tech stack */}
      <Card style={{ marginBottom: 16 }}>
        <Text style={sx.aboutEmoji}>🛠️</Text>
        <Text style={sx.aboutCardTitle}>Technology Stack</Text>
        {[
          ['React Native', 'Cross-platform mobile UI framework'],
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
          This app was developed for Unit 7: Mobile Apps Development — Pearson BTEC International
          Level 3 IT. Learning Aims B (Design) and C (Development).
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
