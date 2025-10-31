import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = Colors.primary,
  backgroundColor = Colors.surface,
  onPress,
  trend,
  trendValue,
}: StatCardProps) {
  const Component = onPress ? TouchableOpacity : View;

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return Colors.success;
      case 'down':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <Component
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon && <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>{icon}</View>}
      </View>
      
      <Text style={[styles.value, { color }]}>{value}</Text>
      
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      
      {trend && trendValue && (
        <View style={styles.trendContainer}>
          <Text style={[styles.trendText, { color: getTrendColor() }]}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
          </Text>
        </View>
      )}
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 8,
  },
  trendContainer: {
    marginTop: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
  },
});