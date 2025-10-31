import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Challenge } from '@/types';
import ProgressCircle from './ProgressCircle';

interface ChallengeCardProps {
  challenge: Challenge;
  onPress?: (challenge: Challenge) => void;
}

export default function ChallengeCard({ challenge, onPress }: ChallengeCardProps) {
  const getStatusColor = () => {
    switch (challenge.status) {
      case 'active':
        return Colors.primary;
      case 'completed':
        return Colors.success;
      case 'failed':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (challenge.status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getChallengeIcon = () => {
    switch (challenge.type) {
      case 'no-smoking':
        return '🚭';
      case 'no-alcohol':
        return '🚫🍺';
      case 'exercise':
        return '💪';
      case 'sleep':
        return '😴';
      default:
        return '📊';
    }
  };

  const daysRemaining = Math.ceil(
    (new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(challenge)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>{getChallengeIcon()}</Text>
          <View style={styles.titleText}>
            <Text style={styles.title}>{challenge.title}</Text>
            <Text style={styles.description}>{challenge.description}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.progressSection}>
          <ProgressCircle
            progress={challenge.progress}
            size={80}
            strokeWidth={6}
            color={getStatusColor()}
            showPercentage={true}
          />
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Stake</Text>
            <Text style={styles.detailValue}>${challenge.stake}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{challenge.duration} days</Text>
          </View>
          {challenge.status === 'active' && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Days Left</Text>
              <Text style={[styles.detailValue, { color: daysRemaining <= 3 ? Colors.error : Colors.text }]}>
                {daysRemaining} days
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  titleText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});