import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { sx } from '../styles/sx';
import { ISSUES } from '../constants/data';

export default function IssuesScreen() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ScrollView
      style={sx.screen}
      contentContainerStyle={sx.scrollContent}
      showsVerticalScrollIndicator={false}
    >
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
                  <Text style={[sx.severityText, { color: issue.severityColor }]}>
                    ● {issue.severity}
                  </Text>
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
