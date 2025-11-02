'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/lib/toast-helpers';
import { TableSkeleton } from '@/components/ui/loading-skeleton';
import {
  Plus,
  Edit,
  Trash2,
  Tag,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

export default function PromoCodesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingPromo, setEditingPromo] = useState<any>(null);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    max_uses: '',
    valid_until: '',
    is_active: true,
  });

  useEffect(() => {
    checkAdminAndLoad();
  }, [user]);

  const checkAdminAndLoad = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
      toast.error('Access Denied');
      router.push('/dashboard');
      return;
    }

    loadPromoCodes();
  };

  const loadPromoCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromoCodes(data || []);
    } catch (error: any) {
      toast.error('Failed to load promo codes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPromo(null);
    setFormData({
      code: '',
      discount_type: 'percentage',
      discount_value: '',
      max_uses: '',
      valid_until: '',
      is_active: true,
    });
    setShowDialog(true);
  };

  const handleEdit = (promo: any) => {
    setEditingPromo(promo);
    setFormData({
      code: promo.code,
      discount_type: promo.discount_type,
      discount_value: promo.discount_value.toString(),
      max_uses: promo.max_uses?.toString() || '',
      valid_until: promo.valid_until ? new Date(promo.valid_until).toISOString().split('T')[0] : '',
      is_active: promo.is_active,
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formData.code || !formData.discount_value) {
      toast.error('Please fill required fields');
      return;
    }

    try {
      const payload = {
        code: formData.code.toUpperCase(),
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
        valid_until: formData.valid_until ? new Date(formData.valid_until).toISOString() : null,
        is_active: formData.is_active,
      };

      if (editingPromo) {
        const { error } = await supabase
          .from('promo_codes')
          .update(payload)
          .eq('id', editingPromo.id);

        if (error) throw error;
        toast.success('Promo code updated!');
      } else {
        const { error } = await supabase
          .from('promo_codes')
          .insert(payload);

        if (error) throw error;
        toast.success('Promo code created!');
      }

      setShowDialog(false);
      loadPromoCodes();
    } catch (error: any) {
      toast.error('Failed to save promo code', error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return;

    try {
      const { error } = await supabase
        .from('promo_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Promo code deleted');
      loadPromoCodes();
    } catch (error: any) {
      toast.error('Failed to delete promo code');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-bold text-gray-100">Promo Codes</h1>
            </div>
            <p className="text-gray-400">Manage discount codes for subscriptions</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push('/admin/dashboard')}
              variant="outline"
              className="border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Promo Code
            </Button>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Discount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Usage</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Valid Until</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.map((promo) => (
                  <tr key={promo.id} className="border-b border-slate-800/50">
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-yellow-400">{promo.code}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300">
                      {promo.discount_type === 'percentage'
                        ? `${promo.discount_value}%`
                        : `Rp${promo.discount_value.toLocaleString('id-ID')}`}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300">
                      {promo.used_count}/{promo.max_uses || '∞'}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-400">
                      {promo.valid_until
                        ? new Date(promo.valid_until).toLocaleDateString('id-ID')
                        : 'No expiry'}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          promo.is_active
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-gray-500/10 text-gray-400'
                        }
                      >
                        {promo.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(promo)}
                          size="sm"
                          variant="outline"
                          className="border-slate-700"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(promo.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-100">
              {editingPromo ? 'Edit Promo Code' : 'Create Promo Code'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Code *</Label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="PROMO2024"
                className="bg-slate-800 border-slate-700 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Type</Label>
                <Select
                  value={formData.discount_type}
                  onValueChange={(value) => setFormData({ ...formData, discount_type: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Value *</Label>
                <Input
                  type="number"
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                  placeholder={formData.discount_type === 'percentage' ? '50' : '100000'}
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Max Uses (Optional)</Label>
              <Input
                type="number"
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                placeholder="Leave empty for unlimited"
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Valid Until (Optional)</Label>
              <Input
                type="date"
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="is_active" className="text-gray-300">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="border-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
            >
              {editingPromo ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
