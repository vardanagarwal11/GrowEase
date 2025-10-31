import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, ArrowDownLeft, ArrowUpRight, CreditCard, ListFilter as Filter, TrendingUp } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import StatCard from '@/components/StatCard';
import { Transaction } from '@/types';

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'stake_return',
    amount: 200,
    challengeId: '3',
    challengeTitle: 'Alcohol-Free Month',
    date: '2024-01-01',
    status: 'completed',
  },
  {
    id: '2',
    type: 'stake_deposit',
    amount: -150,
    challengeId: '2',
    challengeTitle: 'Daily Exercise',
    date: '2024-01-10',
    status: 'completed',
  },
  {
    id: '3',
    type: 'bonus',
    amount: 50,
    challengeId: '3',
    challengeTitle: 'Completion Bonus',
    date: '2024-01-01',
    status: 'completed',
  },
  {
    id: '4',
    type: 'stake_deposit',
    amount: -200,
    challengeId: '1',
    challengeTitle: 'No Smoking Challenge',
    date: '2024-01-01',
    status: 'completed',
  },
  {
    id: '5',
    type: 'forfeit',
    amount: -75,
    challengeId: '4',
    challengeTitle: 'Sleep Schedule',
    date: '2023-11-29',
    status: 'completed',
  },
];

const currentBalance = 1250.00;
const totalEarned = 750.00;
const totalStaked = 350.00;
const totalForfeited = 75.00;

type FilterType = 'all' | 'deposits' | 'returns' | 'forfeits';

export default function WalletScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    switch (filter) {
      case 'deposits':
        return transaction.type === 'stake_deposit';
      case 'returns':
        return transaction.type === 'stake_return' || transaction.type === 'bonus';
      case 'forfeits':
        return transaction.type === 'forfeit';
      default:
        return true;
    }
  });

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'stake_deposit':
        return <ArrowUpRight size={20} color={Colors.error} />;
      case 'stake_return':
      case 'bonus':
        return <ArrowDownLeft size={20} color={Colors.success} />;
      case 'forfeit':
        return <ArrowUpRight size={20} color={Colors.error} />;
      default:
        return <CreditCard size={20} color={Colors.textSecondary} />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'stake_deposit':
      case 'forfeit':
        return Colors.error;
      case 'stake_return':
      case 'bonus':
        return Colors.success;
      default:
        return Colors.textSecondary;
    }
  };

  const getTransactionLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'stake_deposit':
        return 'Stake Deposit';
      case 'stake_return':
        return 'Stake Return';
      case 'bonus':
        return 'Bonus';
      case 'forfeit':
        return 'Forfeited';
      default:
        return 'Transaction';
    }
  };

  const handleAddFunds = () => {
    Alert.alert(
      'Add Funds',
      'Choose payment method:',
      [
        { text: 'Credit Card', onPress: () => console.log('Credit Card selected') },
        { text: 'Bank Transfer', onPress: () => console.log('Bank Transfer selected') },
        { text: 'PayPal', onPress: () => console.log('PayPal selected') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const FilterButton = ({ type, title }: { type: FilterType; title: string }) => (
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
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Wallet</Text>
            <Text style={styles.headerSubtitle}>Manage your stakes and earnings</Text>
          </View>
          <TouchableOpacity style={styles.filterHeaderButton}>
            <Filter size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <LinearGradient colors={Colors.gradient.primary} style={styles.balanceGradient}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <TouchableOpacity style={styles.balanceButton}>
                <CreditCard size={20} color={Colors.surface} />
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>${currentBalance.toFixed(2)}</Text>
            <View style={styles.balanceActions}>
              <TouchableOpacity style={styles.balanceActionButton} onPress={handleAddFunds}>
                <Plus size={16} color={Colors.surface} />
                <Text style={styles.balanceActionText}>Add Funds</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceActionButton}>
                <ArrowUpRight size={16} color={Colors.surface} />
                <Text style={styles.balanceActionText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              title="Total Earned"
              value={`$${totalEarned.toFixed(2)}`}
              icon={<TrendingUp size={20} color={Colors.success} />}
              color={Colors.success}
              trend="up"
              trendValue="$125 this month"
            />
            <StatCard
              title="Currently Staked"
              value={`$${totalStaked.toFixed(2)}`}
              icon={<ArrowUpRight size={20} color={Colors.primary} />}
              color={Colors.primary}
              subtitle="2 active challenges"
            />
          </View>
          
          <View style={styles.statsRow}>
            <StatCard
              title="Total Forfeited"
              value={`$${totalForfeited.toFixed(2)}`}
              icon={<ArrowDownLeft size={20} color={Colors.error} />}
              color={Colors.error}
              subtitle="1 failed challenge"
            />
            <StatCard
              title="Success Rate"
              value="89%"
              icon={<TrendingUp size={20} color={Colors.success} />}
              color={Colors.success}
              trend="up"
              trendValue="5% improvement"
            />
          </View>
        </View>

        {/* Transaction Filters */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Recent Transactions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
            <FilterButton type="all" title="All" />
            <FilterButton type="deposits" title="Deposits" />
            <FilterButton type="returns" title="Returns" />
            <FilterButton type="forfeits" title="Forfeits" />
          </ScrollView>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {filteredTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionCard}
              onPress={() => {
                Alert.alert(
                  'Transaction Details',
                  `${getTransactionLabel(transaction.type)}\nAmount: ${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount)}\nDate: ${new Date(transaction.date).toLocaleDateString()}\nChallenge: ${transaction.challengeTitle || 'N/A'}`,
                  [{ text: 'OK' }]
                );
              }}
            >
              <View style={styles.transactionIcon}>
                {getTransactionIcon(transaction.type)}
              </View>
              
              <View style={styles.transactionContent}>
                <Text style={styles.transactionTitle}>
                  {getTransactionLabel(transaction.type)}
                </Text>
                <Text style={styles.transactionSubtitle}>
                  {transaction.challengeTitle || 'General transaction'}
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
              </View>
              
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.transactionAmountText,
                  { color: getTransactionColor(transaction.type) }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                </Text>
                <Text style={[
                  styles.transactionStatus,
                  { color: transaction.status === 'completed' ? Colors.success : Colors.warning }
                ]}>
                  {transaction.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredTransactions.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No transactions found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your filters
              </Text>
            </View>
          )}
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
  filterHeaderButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
  },
  balanceCard: {
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
  balanceGradient: {
    padding: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: Colors.surface + 'CC',
  },
  balanceButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.surface + '20',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.surface,
    marginBottom: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface + '20',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  balanceActionText: {
    color: Colors.surface,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  statsGrid: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  filtersContent: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterButtonTextActive: {
    color: Colors.surface,
  },
  transactionsList: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: Colors.textLight,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
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
});