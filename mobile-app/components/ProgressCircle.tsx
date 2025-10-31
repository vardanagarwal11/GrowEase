import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ProgressCircleProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

export default function ProgressCircle({
  progress,
  size = 120,
  strokeWidth = 8,
  color = Colors.primary,
  backgroundColor = Colors.borderLight,
  showPercentage = true,
  children,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressValue = Math.min(Math.max(progress, 0), 100);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progressValue / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View 
        style={[
          styles.backgroundCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: backgroundColor,
          },
        ]}
      />
      <View 
        style={[
          styles.progressCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: 'transparent',
            borderTopColor: color,
            transform: [
              { rotate: '-90deg' },
              { rotateZ: `${(progressValue / 100) * 360}deg` }
            ],
          },
        ]}
      />
      <View style={styles.content}>
        {children || (
          showPercentage && (
            <Text style={[styles.percentageText, { color, fontSize: size * 0.15 }]}>
              {Math.round(progressValue)}%
            </Text>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
  },
  progressCircle: {
    position: 'absolute',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  percentageText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});