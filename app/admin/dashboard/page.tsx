'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/lib/toast-helpers';
import { DashboardSkeleton } from '@/components/ui/loading-skeleton';
import {
  Users,
  CreditCard,
  TrendingUp,
  DollarSign,
  Clock,
  Tag,
  Shield,
  Settings,
  LogOut,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      // Check if user is admin
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error', 'Failed to check admin access');
        router.push('/dashboard');
        return;
      }

      if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
        toast.error('Access Denied', 'You do not have admin privileges');
        router.push('/dashboard');
        return;
      }

      setIsAdmin(true);
      await loadDashboardData();
    } catch (error: any) {
      console.error('Error checking admin access:', error);
      toast.error('Error', error.message);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      // Load statistics
      const { data: statsData, error: statsError } = await supabase
        .from('admin_statistics')
        .select('*')
        .single();

      if (statsError) throw statsError;
      setStats(statsData);

      // Load recent payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*, profiles(email, full_name), subscription_plans(name, name_id)')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!paymentsError) {
        setRecentPayments(paymentsData || []);
      }

      // Load recent users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!usersError) {
        setRecentUsers(usersData || []);
      }
    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    loadDashboardData();
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
            </div>
            <p className="text-gray-400">Manage users, payments, and subscriptions</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="border-slate-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="border-slate-700"
            >
              Back to App
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-blue-400" />
              <Badge className="bg-blue-500/10 text-blue-400">Total</Badge>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-1">
              {stats?.total_users || 0}
            </div>
            <div className="text-sm text-gray-400">Registered Users</div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <Badge className="bg-green-500/10 text-green-400">Active</Badge>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-1">
              {stats?.active_subscriptions || 0}
            </div>
            <div className="text-sm text-gray-400">Active Subscriptions</div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-yellow-400" />
              <Badge className="bg-yellow-500/10 text-yellow-400">Revenue</Badge>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-1">
              Rp{((stats?.total_revenue || 0) / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <CreditCard className="w-8 h-8 text-purple-400" />
              <Badge className="bg-purple-500/10 text-purple-400">Success</Badge>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-1">
              {stats?.successful_payments || 0}
            </div>
            <div className="text-sm text-gray-400">Successful Payments</div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-orange-400" />
              <Badge className="bg-orange-500/10 text-orange-400">Pending</Badge>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-1">
              {stats?.pending_payments || 0}
            </div>
            <div className="text-sm text-gray-400">Pending Payments</div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <Tag className="w-8 h-8 text-pink-400" />
              <Badge className="bg-pink-500/10 text-pink-400">Active</Badge>
            </div>
            <div className="text-3xl font-bold text-gray-100 mb-1">
              {stats?.active_promo_codes || 0}
            </div>
            <div className="text-sm text-gray-400">Promo Codes</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="payments">Recent Payments</TabsTrigger>
            <TabsTrigger value="users">Recent Users</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card className="bg-slate-900/50 border-slate-800">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Payments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">User</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Plan</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="border-b border-slate-800/50">
                          <td className="py-4 px-4 text-sm text-gray-300">
                            {payment.profiles?.email || 'Unknown'}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-300">
                            {payment.subscription_plans?.name_id || 'N/A'}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-300">
                            Rp{payment.amount.toLocaleString('id-ID')}
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              className={
                                payment.status === 'success'
                                  ? 'bg-green-500/10 text-green-400'
                                  : payment.status === 'pending'
                                  ? 'bg-yellow-500/10 text-yellow-400'
                                  : 'bg-red-500/10 text-red-400'
                              }
                            >
                              {payment.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-400">
                            {new Date(payment.created_at).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-slate-900/50 border-slate-800">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-slate-800/50">
                          <td className="py-4 px-4 text-sm text-gray-300">{user.email}</td>
                          <td className="py-4 px-4 text-sm text-gray-300">
                            {user.full_name || '-'}
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              className={
                                user.role === 'super_admin'
                                  ? 'bg-red-500/10 text-red-400'
                                  : user.role === 'admin'
                                  ? 'bg-yellow-500/10 text-yellow-400'
                                  : 'bg-gray-500/10 text-gray-400'
                              }
                            >
                              {user.role.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-400">
                            {new Date(user.created_at).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="management">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push('/admin/payments')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Payments
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/signals')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Manage Signals
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/promo-codes')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Manage Promo Codes
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/users')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/subscriptions')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Manage Subscriptions
                  </Button>
                </div>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">System Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Database</span>
                    <Badge className="bg-green-500/10 text-green-400">Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Gateway</span>
                    <Badge className="bg-green-500/10 text-green-400">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Edge Functions</span>
                    <Badge className="bg-green-500/10 text-green-400">Deployed</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version</span>
                    <span className="text-gray-300">1.0.0</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
