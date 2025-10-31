import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, ListFilter as Filter, Search } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import ChallengeCard from '@/components/ChallengeCard';
import { Challenge } from '@/types';

// Mock data
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'No Smoking Challenge',
    type: 'no-smoking',
    stake: 200,
    duration: 30,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    progress: 75,
    status: 'active',
    description: '30-day commitment to quit smoking completely',
  },
  {
    id: '2',
    title: 'Daily Exercise',
    type: 'exercise',
    stake: 150,
    duration: 21,
    startDate: '2024-01-10',
    endDate: '2024-01-31',
    progress: 60,
    status: 'active',
    description: 'Exercise for at least 30 minutes daily',
  },
  {
    id: '3',
    title: 'Alcohol-Free Month',
    type: 'no-alcohol',
    stake: 100,
    duration: 30,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    progress: 100,
    status: 'completed',
    description: 'Complete month without alcohol consumption',
  },
  {
    id: '4',
    title: 'Sleep Schedule',
    type: 'sleep',
    stake: 75,
    duration: 14,
    startDate: '2023-11-15',
    endDate: '2023-11-29',
    progress: 45,
    status: 'failed',
    description: 'Maintain consistent 8-hour sleep schedule',
  },
  {
    id: '5',
    title: 'Weekend Workout',
    type: 'exercise',
    stake: 120,
    duration: 28,
    startDate: '2023-12-15',
    endDate: '2024-01-12',
    progress: 100,
    status: 'completed',
    description: 'Complete workout sessions every weekend',
  },
];

type FilterType = 'all' | 'active' | 'completed' | 'failed';

export default function ChallengesScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  
  const filteredChallenges = mockChallenges.filter(challenge => {
    if (filter === 'all') return true;
    return challenge.status === filter;
  });

  const activeChallenges = mockChallenges.filter(c => c.status === 'active').length;
  const completedChallenges = mockChallenges.filter(c => c.status === 'completed').length;
  const failedChallenges = mockChallenges.filter(c => c.status === 'failed').length;
  const totalStaked = mockChallenges
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.stake, 0);

  const handleCreateChallenge = () => {
    Alert.alert(
      'Create New Challenge',
      'Choose your challenge type:',
      [
        { text: 'No Smoking', onPress: () => console.log('No Smoking selected') },
        { text: 'No Alcohol', onPress: () => console.log('No Alcohol selected') },
        { text: 'Exercise', onPress: () => console.log('Exercise selected') },
        { text: 'Sleep', onPress: () => console.log('Sleep selected') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const FilterButton = ({ type, title, count }: { type: FilterType; title: string; count?: number }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === type && styles.filterButtonActive,
      ]}
      onPress={() => setFilter(type)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === type && styles.filterButtonTextActive,
        ]}
      >
        {title} {count !== undefined && `(${count})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Challenges</Text>
            <Text style={styles.headerSubtitle}>
              {activeChallenges} active • ${totalStaked} staked
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Search size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Filter size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Cards - Fixed layout */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeChallenges}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, styles.statValueCompleted]}>{completedChallenges}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, styles.statValueStaked]}>${totalStaked}</Text>
          <Text style={styles.statLabel}>Total Staked</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
          <FilterButton type="all" title="All" count={mockChallenges.length} />
          <FilterButton type="active" title="Active" count={activeChallenges} />
          <FilterButton type="completed" title="Completed" count={completedChallenges} />
          <FilterButton type="failed" title="Failed" count={failedChallenges} />
        </ScrollView>
      </View>

      {/* Challenges List */}
      <View style={styles.challengesContainer}>
        <ScrollView 
          style={styles.challengesList} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.challengesContent}
        >
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={(challenge) => {
                Alert.alert(
                  challenge.title,
                  `Status: ${challenge.status}\nProgress: ${challenge.progress}%\nStake: $${challenge.stake}`,
                  [{ text: 'OK' }]
                );
              }}
            />
          ))}
          
          {filteredChallenges.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No challenges found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your filters or create a new challenge
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateChallenge}>
        <LinearGradient colors={Colors.gradient.primary} style={styles.fabGradient}>
          <Plus size={24} color={Colors.surface} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Colors.surface,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
  },
  // Fixed Stats Container
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  statValueCompleted: {
    color: Colors.success,
  },
  statValueStaked: {
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  // Filters
  filtersContainer: {
    backgroundColor: Colors.surface,
    paddingVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterButtonTextActive: {
    color: Colors.surface,
  },
  // Challenges List
  challengesContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  challengesList: {
    flex: 1,
  },
  challengesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32, // Extra padding for FAB
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});