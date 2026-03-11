import React from 'react';
import { View, Text } from 'react-native';
import { sx } from '../styles/sx';

interface TagProps {
  label: string;
  color: string;
}

export default function Tag({ label, color }: TagProps) {
  return (
    <View style={[sx.tag, { backgroundColor: color + '22', borderColor: color + '55' }]}>
      <Text style={[sx.tagText, { color }]}>{label}</Text>
    </View>
  );
}
