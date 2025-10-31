import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Heart, Moon, Zap, TrendingUp, Calendar } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import StatCard from '@/components/StatCard';
import ProgressCircle from '@/components/ProgressCircle';
import { HealthMetric } from '@/types';

// Mock data
const mockHealthMetrics: HealthMetric[] = [
  {
    id: '1',
    type: 'steps',
    value: 8420,
    unit: 'steps',
    date: '2024-01-15',
    target: 10000,
  },
  {
    id: '2',
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    date: '2024-01-15',
    target: 70,
  },
  {
    id: '3',
    type: 'sleep',
    value: 7.2,
    unit: 'hours',
    date: '2024-01-15',
    target: 8,
  },
  {
    id: '4',
    type: 'calories',
    value: 2340,
    unit: 'cal',
    date: '2024-01-15',
    target: 2200,
  },
];

const weeklySteps = [7200, 8500, 6800, 9200, 8420, 7800, 10200];
const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function FitnessScreen() {
  const stepsMetric = mockHealthMetrics.find(m => m.type === 'steps');
  const heartRateMetric = mockHealthMetrics.find(m => m.type === 'heart_rate');
  const sleepMetric = mockHealthMetrics.find(m => m.type === 'sleep');
  const caloriesMetric = mockHealthMetrics.find(m => m.type === 'calories');

  const stepsProgress = stepsMetric ? (stepsMetric.value / (stepsMetric.target || 1)) * 100 : 0;
  const sleepProgress = sleepMetric ? (sleepMetric.value / (sleepMetric.target || 1)) * 100 : 0;

  const maxSteps = Math.max(...weeklySteps);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Fitness</Text>
            <Text style={styles.headerSubtitle}>Today • January 15, 2024</Text>
          </View>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Main Stats */}
        <View style={styles.mainStats}>
          <View style={styles.mainStatCard}>
            <LinearGradient colors={Colors.gradient.primary} style={styles.mainStatGradient}>
              <View style={styles.mainStatContent}>
                <View style={styles.mainStatText}>
                  <Text style={styles.mainStatLabel}>Steps Today</Text>
                  <Text style={styles.mainStatValue}>
                    {stepsMetric?.value.toLocaleString() || '0'}
                  </Text>
                  <Text style={styles.mainStatTarget}>
                    Goal: {stepsMetric?.target?.toLocaleString() || '10,000'}
                  </Text>
                </View>
                <ProgressCircle
                  progress={stepsProgress}
                  size={80}
                  strokeWidth={6}
                  color={Colors.surface}
                  backgroundColor={Colors.surface + '30'}
                />
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Health Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricsRow}>
            <View style={styles.metricHalf}>
              <StatCard
                title="Heart Rate"
                value={`${heartRateMetric?.value || 0} ${heartRateMetric?.unit || 'bpm'}`}
                subtitle="Resting"
                icon={<Heart size={24} color={Colors.error} />}
                color={Colors.error}
                trend="down"
                trendValue="2 bpm lower"
              />
            </View>
            <View style={styles.metricHalf}>
              <StatCard
                title="Calories"
                value={`${caloriesMetric?.value?.toLocaleString() || 0}`}
                subtitle="Burned today"
                icon={<Zap size={24} color={Colors.warning} />}
                color={Colors.warning}
                trend="up"
                trendValue="140 cal more"
              />
            </View>
          </View>
        </View>

        {/* Sleep Card */}
        <View style={styles.sleepCard}>
          <LinearGradient colors={['#4C1D95', '#6366F1']} style={styles.sleepGradient}>
            <View style={styles.sleepContent}>
              <View style={styles.sleepText}>
                <Moon size={24} color={Colors.surface} />
                <Text style={styles.sleepLabel}>Sleep Last Night</Text>
                <Text style={styles.sleepValue}>
                  {sleepMetric?.value || 0}h
                </Text>
                <Text style={styles.sleepTarget}>
                  Goal: {sleepMetric?.target || 8}h
                </Text>
              </View>
              <ProgressCircle
                progress={sleepProgress}
                size={80}
                strokeWidth={6}
                color={Colors.surface}
                backgroundColor={Colors.surface + '30'}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Weekly Steps Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Steps</Text>
            <TouchableOpacity>
              <TrendingUp size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.chart}>
            <View style={styles.chartBars}>
              {weeklySteps.map((steps, index) => (
                <View key={index} style={styles.chartBarContainer}>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height: (steps / maxSteps) * 120,
                        backgroundColor: index === 4 ? Colors.primary : Colors.primaryLight,
                      },
                    ]}
                  />
                  <Text style={styles.chartBarValue}>
                    {(steps / 1000).toFixed(1)}k
                  </Text>
                  <Text style={styles.chartBarLabel}>{weeklyLabels[index]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Health Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.insightsTitle}>Health Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Activity size={20} color={Colors.success} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                Great job! You're 18% more active than last week.
              </Text>
              <Text style={styles.insightSubtext}>
                Keep maintaining this activity level to reach your fitness goals.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Heart size={20} color={Colors.primary} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                Your resting heart rate is improving consistently.
              </Text>
              <Text style={styles.insightSubtext}>
                This indicates better cardiovascular fitness.
              </Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: Colors.surface,
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
  calendarButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
  },
  mainStats: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  mainStatCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  mainStatGradient: {
    padding: 24,
  },
  mainStatContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainStatText: {
    flex: 1,
  },
  mainStatLabel: {
    fontSize: 16,
    color: Colors.surface + 'CC',
    marginBottom: 8,
  },
  mainStatValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.surface,
    marginBottom: 4,
  },
  mainStatTarget: {
    fontSize: 14,
    color: Colors.surface + 'AA',
  },
  metricsGrid: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  metricHalf: {
    flex: 1,
    marginHorizontal: 8,
  },
  sleepCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  sleepGradient: {
    padding: 24,
  },
  sleepContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sleepText: {
    flex: 1,
  },
  sleepLabel: {
    fontSize: 16,
    color: Colors.surface + 'CC',
    marginTop: 8,
    marginBottom: 8,
  },
  sleepValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.surface,
    marginBottom: 4,
  },
  sleepTarget: {
    fontSize: 14,
    color: Colors.surface + 'AA',
  },
  chartSection: {
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  chart: {
    height: 160,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 16,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 24,
    backgroundColor: Colors.primaryLight,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartBarValue: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  chartBarLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  insightsSection: {
    margin: 20,
  },
  insightsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  insightSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});