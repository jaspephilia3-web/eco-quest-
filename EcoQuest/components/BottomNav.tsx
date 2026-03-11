import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Screen } from '../types';
import { sx } from '../styles/sx';

interface BottomNavProps {
  active: Screen;
  navigate: (s: Screen) => void;
}

const NAV: { screen: Screen; icon: string; label: string }[] = [
  { screen: 'Home',   icon: '🏠', label: 'Home'   },
  { screen: 'Issues', icon: '⚠️', label: 'Issues' },
  { screen: 'Videos', icon: '▶️', label: 'Watch'  },
  { screen: 'Quiz',   icon: '🧠', label: 'Quiz'   },
  { screen: 'About',  icon: 'ℹ️', label: 'About'  },
];

export default function BottomNav({ active, navigate }: BottomNavProps) {
  return (
    <View style={sx.nav}>
      {NAV.map((n) => {
        const isActive = n.screen === active;
        return (
          <TouchableOpacity
            key={n.screen}
            style={sx.navBtn}
            onPress={() => navigate(n.screen)}
            activeOpacity={0.7}
          >
            {isActive && <View style={sx.navPill} />}
            <Text style={[sx.navIcon, isActive && { fontSize: 24 }]}>{n.icon}</Text>
            <Text style={[sx.navLabel, isActive ? sx.navActive : sx.navInactive]}>
              {n.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
