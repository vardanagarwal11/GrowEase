import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Award, Clock, DollarSign, Target } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import StatCard from '@/components/StatCard';
import ChallengeCard from '@/components/ChallengeCard';
import { Challenge, User } from '@/types';

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Manthan Chawala',
  email: 'ManthaChawala@gmail.com',
  balance: 1250.00,
  totalStaked: 500.00,
  totalEarned: 750.00,
  activeChallenges: 2,
  completedChallenges: 8,
};

const mockActiveChallenges: Challenge[] = [
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
    description: '30-day commitment to quit smoking',
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
];

export default function DashboardScreen() {
  const successRate = mockUser.completedChallenges / (mockUser.completedChallenges + 2) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={Colors.gradient.primary} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{mockUser.name}</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileInitial}>{mockUser.name.charAt(0)}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>${mockUser.balance.toFixed(2)}</Text>
            <Text style={styles.balanceSubtext}>
              ${mockUser.totalStaked.toFixed(2)} currently staked
            </Text>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              title="Total Earned"
              value={`$${mockUser.totalEarned.toFixed(2)}`}
              icon={<TrendingUp size={20} color={Colors.success} />}
              color={Colors.success}
              trend="up"
              trendValue="12% this month"
            />
            <StatCard
              title="Success Rate"
              value={`${Math.round(successRate)}%`}
              icon={<Award size={20} color={Colors.primary} />}
              color={Colors.primary}
              trend="up"
              trendValue="5% improvement"
            />
          </View>
          
          <View style={styles.statsRow}>
            <StatCard
              title="Active Challenges"
              value={mockUser.activeChallenges.toString()}
              icon={<Clock size={20} color={Colors.warning} />}
              color={Colors.warning}
            />
            <StatCard
              title="Completed"
              value={mockUser.completedChallenges.toString()}
              icon={<DollarSign size={20} color={Colors.success} />}
              color={Colors.success}
            />
          </View>
        </View>

        {/* Active Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {mockActiveChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={(challenge) => console.log('Challenge pressed:', challenge.title)}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient colors={Colors.gradient.primary} style={styles.actionGradient}>
                <View style={styles.actionIconContainer}>
                  <Target size={20} color={Colors.surface} />
                </View>
                <Text style={styles.actionText}>New Challenge</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient colors={Colors.gradient.success} style={styles.actionGradient}>
                <View style={styles.actionIconContainer}>
                  <DollarSign size={20} color={Colors.surface} />
                </View>
                <Text style={styles.actionText}>Add Funds</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.surface + 'CC',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.surface,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.surface + 'CC',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.surface,
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 12,
    color: Colors.surface + 'AA',
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  sectionLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    minHeight: 60,
  },
  actionIconContainer: {
    width: 24,
        justifyContent: 'center',

    alignItems: 'center',
    marginRight: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',

    color: Colors.surface,
    flex: 1,
  },
});