import React from 'react';
import { View } from 'react-native';
import { sx } from '../styles/sx';

interface CardProps {
  children: React.ReactNode;
  style?: object;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[sx.card, style]}>{children}</View>;
}
