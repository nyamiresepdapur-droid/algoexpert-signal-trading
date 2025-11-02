'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/lib/toast-helpers';
import {
  Loader2,
  Crown,
  Zap,
  Rocket,
  Check,
  X,
  Calendar,
  AlertCircle,
  CheckCircle,
  Tag,
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
} from 'lucide-react';

// Duitku payment methods
const paymentMethods = [
  { code: 'BCA', name: 'Bank BCA', icon: Building2, type: 'bank' },
  { code: 'BNI', name: 'Bank BNI', icon: Building2, type: 'bank' },
  { code: 'BRI', name: 'Bank BRI', icon: Building2, type: 'bank' },
  { code: 'MANDIRI', name: 'Bank Mandiri', icon: Building2, type: 'bank' },
  { code: 'PERMATA', name: 'Bank Permata', icon: Building2, type: 'bank' },
  { code: 'CIMB', name: 'Bank CIMB Niaga', icon: Building2, type: 'bank' },
  { code: 'OVO', name: 'OVO', icon: Wallet, type: 'ewallet' },
  { code: 'DANA', name: 'DANA', icon: Wallet, type: 'ewallet' },
  { code: 'LINKAJA', name: 'LinkAja', icon: Wallet, type: 'ewallet' },
  { code: 'SHOPEE', name: 'ShopeePay', icon: Wallet, type: 'ewallet' },
  { code: 'QRIS', name: 'QRIS', icon: Smartphone, type: 'qr' },
];

export default function SubscriptionPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    if (user) {
      loadData();
    }

    // Check for payment success
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      toast.success('Pembayaran Berhasil!', 'Subscription Anda sudah aktif');
    }
  }, [user, searchParams]);

  const loadData = async () => {
    try {
      // Load subscription plans
      const { data: plansData, error: plansError } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (plansError) throw plansError;
      setPlans(plansData || []);

      // Load current subscription
      const { data: subData, error: subError } = await supabase
        .from('user_subscriptions')
        .select('*, subscription_plans(*)')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .maybeSingle();

      if (!subError && subData) {
        setCurrentSubscription(subData);
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Gagal memuat data', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: any) => {
    if (plan.price_idr === 0) {
      // Free trial - activate immediately
      handleActivateFreeTrial(plan);
    } else {
      setSelectedPlan(plan);
      setShowPaymentDialog(true);
    }
  };

  const handleActivateFreeTrial = async (plan: any) => {
    setProcessing(true);
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + plan.duration_days);

      const { error } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: user?.id,
          plan_id: plan.id,
          status: 'active',
          started_at: new Date().toISOString(),
          expires_at: expiryDate.toISOString(),
        });

      if (error) throw error;

      toast.success('Trial Activated!', `${plan.name} trial dimulai`);
      await loadData();
    } catch (error: any) {
      toast.error('Gagal aktivasi trial', error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', promoCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error || !data) {
        toast.error('Kode promo tidak valid');
        return;
      }

      // Check if promo is applicable
      if (data.applicable_plans && !data.applicable_plans.includes(selectedPlan.id)) {
        toast.error('Kode promo tidak berlaku untuk paket ini');
        return;
      }

      let discount = 0;
      if (data.discount_type === 'percentage') {
        discount = (selectedPlan.price_idr * data.discount_value) / 100;
      } else {
        discount = data.discount_value;
      }

      setPromoDiscount(discount);
      toast.success('Kode promo berhasil!', `Diskon Rp${discount.toLocaleString('id-ID')}`);
    } catch (error: any) {
      toast.error('Error validating promo code', error.message);
    }
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Pilih metode pembayaran');
      return;
    }

    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('duitku-create-payment', {
        body: {
          planId: selectedPlan.id,
          paymentMethod: selectedPaymentMethod,
          promoCode: promoCode || undefined,
        },
      });

      if (error) throw error;

      if (data.success && data.payment.paymentUrl) {
        // Redirect to Duitku payment page
        window.location.href = data.payment.paymentUrl;
      } else {
        throw new Error('Failed to create payment');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Gagal membuat pembayaran', error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
        </div>
      </ProtectedRoute>
    );
  }

  const finalAmount = selectedPlan ? selectedPlan.price_idr - promoDiscount : 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-100 mb-2">Paket Langganan</h1>
            <p className="text-gray-400">Pilih paket terbaik untuk trading journey Anda</p>
          </div>

          {currentSubscription && (
            <Card className="mb-8 bg-slate-900/50 border-slate-800 p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">Paket Aktif</h3>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-yellow-400/10 text-yellow-400 text-lg px-3 py-1">
                      {currentSubscription.subscription_plans.name_id}
                    </Badge>
                    <Badge className="bg-green-500/10 text-green-500">
                      AKTIF
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Berakhir
                  </div>
                  <div className="text-sm font-semibold text-gray-100">
                    {new Date(currentSubscription.expires_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {plans.map((plan) => {
              const isCurrentPlan = currentSubscription?.plan_id === plan.id;
              const isTrial = plan.price_idr === 0;
              const features = Array.isArray(plan.features) ? plan.features : [];

              return (
                <Card
                  key={plan.id}
                  className={`relative bg-slate-900/50 border-2 p-6 ${
                    plan.name === 'Pro'
                      ? 'border-yellow-400'
                      : isCurrentPlan
                      ? 'border-green-500'
                      : 'border-slate-800'
                  }`}
                >
                  {plan.name === 'Pro' && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-yellow-400 text-slate-900 font-semibold px-3 py-1">
                        Paling Populer
                      </Badge>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4">
                      <Badge className="bg-green-500 text-white font-semibold px-3 py-1">
                        Paket Aktif
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/10 mb-4">
                      <Crown className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-100 mb-2">{plan.name_id}</h3>
                    {isTrial ? (
                      <div className="text-4xl font-bold text-yellow-400">GRATIS</div>
                    ) : (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm text-gray-400">Rp</span>
                        <span className="text-3xl font-bold text-yellow-400">
                          {(plan.price_idr / 1000).toFixed(0)}K
                        </span>
                        <span className="text-gray-400">/bulan</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{plan.duration_days} hari</p>
                  </div>

                  <div className="space-y-2 mb-6 min-h-[200px]">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {isCurrentPlan ? (
                    <Button disabled className="w-full bg-slate-800 text-gray-400 cursor-not-allowed">
                      Paket Aktif
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      disabled={processing}
                      className={`w-full font-semibold ${
                        plan.name === 'Pro'
                          ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900'
                          : 'bg-slate-800 hover:bg-slate-700 text-gray-100'
                      }`}
                    >
                      {processing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isTrial ? (
                        'Coba Gratis'
                      ) : (
                        'Pilih Paket'
                      )}
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Semua paket include trial gratis. Tidak perlu kartu kredit.
            </p>
            <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300">
              Lihat perbandingan lengkap →
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Pilih Metode Pembayaran</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedPlan && `${selectedPlan.name_id} - ${selectedPlan.duration_days} hari`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Promo Code */}
            <div className="space-y-2">
              <Label className="text-gray-300">Kode Promo (Opsional)</Label>
              <div className="flex gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Masukkan kode promo"
                  className="bg-slate-800 border-slate-700"
                />
                <Button
                  onClick={handleApplyPromo}
                  variant="outline"
                  className="border-slate-700"
                >
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="text-gray-300">Metode Pembayaran</Label>
              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <div className="px-2 py-1 text-xs font-semibold text-gray-400">Transfer Bank</div>
                  {paymentMethods.filter(m => m.type === 'bank').map((method) => (
                    <SelectItem key={method.code} value={method.code}>
                      {method.name}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-xs font-semibold text-gray-400 mt-2">E-Wallet</div>
                  {paymentMethods.filter(m => m.type === 'ewallet').map((method) => (
                    <SelectItem key={method.code} value={method.code}>
                      {method.name}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-xs font-semibold text-gray-400 mt-2">QR Code</div>
                  {paymentMethods.filter(m => m.type === 'qr').map((method) => (
                    <SelectItem key={method.code} value={method.code}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Summary */}
            <div className="bg-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Harga Paket</span>
                <span className="text-gray-100">Rp{selectedPlan?.price_idr.toLocaleString('id-ID')}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Diskon Promo</span>
                  <span className="text-green-400">-Rp{promoDiscount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="border-t border-slate-700 pt-2 flex justify-between font-semibold">
                <span className="text-gray-100">Total Pembayaran</span>
                <span className="text-yellow-400 text-lg">Rp{finalAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
              className="border-slate-700"
            >
              Batal
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!selectedPaymentMethod || processing}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Bayar Sekarang
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
