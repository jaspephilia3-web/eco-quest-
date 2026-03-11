import React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../types';
import { sx } from '../styles/sx';
import PulseDot from './PulseDot';

interface HeaderProps {
  screen: Screen;
}

const titles: Record<Screen, string> = {
  Home:   'EcoQuest',
  Issues: 'Global Issues',
  Videos: 'Watch & Learn',
  Quiz:   'Eco Quiz',
  About:  'About',
};

export default function Header({ screen }: HeaderProps) {
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
