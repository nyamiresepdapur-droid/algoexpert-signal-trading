'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Wallet,
  Key,
} from 'lucide-react';

export default function AccountsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [accountType, setAccountType] = useState<'metaapi' | 'binance' | 'bybit'>('metaapi');
  const [accountName, setAccountName] = useState('');
  const [metaapiAccountId, setMetaapiAccountId] = useState('');
  const [metaapiAccessToken, setMetaapiAccessToken] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  useEffect(() => {
    if (user) {
      loadAccounts();
    }
  }, [user]);

  const loadAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('trading_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const accountData: any = {
        user_id: user?.id,
        account_type: accountType,
        account_name: accountName,
        is_active: true,
        is_verified: false,
      };

      if (accountType === 'metaapi') {
        accountData.metaapi_account_id = metaapiAccountId;
        accountData.metaapi_access_token = metaapiAccessToken;
        accountData.account_id = metaapiAccountId;
      } else {
        accountData.api_key = apiKey;
        accountData.api_secret = apiSecret;
        accountData.account_id = apiKey;
      }

      const { error } = await supabase.from('trading_accounts').insert(accountData);

      if (error) throw error;

      setSuccess('Account added successfully!');
      setAccountName('');
      setMetaapiAccountId('');
      setMetaapiAccessToken('');
      setApiKey('');
      setApiSecret('');
      setDialogOpen(false);
      await loadAccounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (!confirm('Are you sure you want to delete this account?')) return;

    try {
      const { error } = await supabase.from('trading_accounts').delete().eq('id', id);

      if (error) throw error;

      setSuccess('Account deleted successfully!');
      await loadAccounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('trading_accounts')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      await loadAccounts();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleVerifyAccount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trading_accounts')
        .update({ is_verified: true })
        .eq('id', id);

      if (error) throw error;

      setSuccess('Account verified successfully!');
      await loadAccounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message);
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">Trading Accounts</h1>
              <p className="text-gray-400">Connect your MT4/MT5 and crypto exchange accounts</p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 text-gray-100">
                <DialogHeader>
                  <DialogTitle>Add Trading Account</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Connect a new MT4/MT5 or crypto exchange account
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddAccount} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountType" className="text-gray-300">Account Type</Label>
                    <Select value={accountType} onValueChange={(value: any) => setAccountType(value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="metaapi">MetaAPI (MT4/MT5)</SelectItem>
                        <SelectItem value="binance">Binance</SelectItem>
                        <SelectItem value="bybit">Bybit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountName" className="text-gray-300">Account Name</Label>
                    <Input
                      id="accountName"
                      placeholder="My Trading Account"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      required
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>

                  {accountType === 'metaapi' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="metaapiAccountId" className="text-gray-300">
                          MetaAPI Account ID
                        </Label>
                        <Input
                          id="metaapiAccountId"
                          placeholder="e.g., 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p"
                          value={metaapiAccountId}
                          onChange={(e) => setMetaapiAccountId(e.target.value)}
                          required
                          className="bg-slate-800 border-slate-700"
                        />
                        <p className="text-xs text-gray-500">
                          Found in MetaAPI dashboard under account details
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaapiAccessToken" className="text-gray-300">
                          MetaAPI Access Token
                        </Label>
                        <Input
                          id="metaapiAccessToken"
                          type="password"
                          placeholder="••••••••"
                          value={metaapiAccessToken}
                          onChange={(e) => setMetaapiAccessToken(e.target.value)}
                          required
                          className="bg-slate-800 border-slate-700"
                        />
                        <p className="text-xs text-gray-500">
                          Your MetaAPI access token from cloud.metaapi.cloud
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="apiKey" className="text-gray-300">API Key</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          placeholder="••••••••"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          required
                          className="bg-slate-800 border-slate-700"
                        />
                        <p className="text-xs text-gray-500">
                          Your {accountType === 'binance' ? 'Binance' : 'Bybit'} API key
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="apiSecret" className="text-gray-300">API Secret</Label>
                        <Input
                          id="apiSecret"
                          type="password"
                          placeholder="••••••••"
                          value={apiSecret}
                          onChange={(e) => setApiSecret(e.target.value)}
                          required
                          className="bg-slate-800 border-slate-700"
                        />
                        <p className="text-xs text-gray-500">
                          Your {accountType === 'binance' ? 'Binance' : 'Bybit'} API secret
                        </p>
                      </div>
                    </>
                  )}

                  <Alert className="bg-blue-500/10 border-blue-500/30">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-400 text-sm">
                      Your API keys are encrypted and stored securely. We never store passwords.
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Account'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-500/10 border-green-500/30">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">{success}</AlertDescription>
            </Alert>
          )}

          {accounts.length === 0 ? (
            <Card className="bg-slate-900/50 border-slate-800 p-12 text-center">
              <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">No Accounts Connected</h3>
              <p className="text-gray-400 mb-6">
                Connect your first trading account to start automated trading
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Account
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {accounts.map((account) => (
                <Card key={account.id} className="bg-slate-900/50 border-slate-800 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">{account.account_name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{account.account_type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className={
                          account.is_verified
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }
                      >
                        {account.is_verified ? 'Verified' : 'Pending'}
                      </Badge>
                      <Badge
                        className={
                          account.is_active
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-gray-500/10 text-gray-500'
                        }
                      >
                        {account.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Account ID:</span>
                      <span className="text-gray-300 font-mono">{account.account_id}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Added:</span>
                      <span className="text-gray-300">
                        {new Date(account.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!account.is_verified && (
                      <Button
                        onClick={() => handleVerifyAccount(account.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verify
                      </Button>
                    )}
                    <Button
                      onClick={() => handleToggleActive(account.id, account.is_active)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-700"
                    >
                      {account.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      onClick={() => handleDeleteAccount(account.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <Card className="mt-8 bg-blue-500/5 border-blue-500/20 p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">Setup Instructions</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                    <span className="text-yellow-400 font-semibold text-xs">MT</span>
                  </div>
                  MetaAPI (MT4/MT5)
                </h4>
                <ol className="list-decimal list-inside space-y-1 ml-8 text-gray-400">
                  <li>
                    Go to{' '}
                    <a
                      href="https://app.metaapi.cloud"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      app.metaapi.cloud
                    </a>
                  </li>
                  <li>Connect your MT4/MT5 broker account</li>
                  <li>Copy the <strong>Account ID</strong> (found in account details)</li>
                  <li>Copy your <strong>Access Token</strong> (found in settings)</li>
                  <li>Paste both into the form above</li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                    <span className="text-yellow-400 font-semibold text-xs">₿</span>
                  </div>
                  Binance / Bybit
                </h4>
                <ol className="list-decimal list-inside space-y-1 ml-8 text-gray-400">
                  <li>Go to your exchange API management page</li>
                  <li>Create a new API key with <strong>trading permissions only</strong></li>
                  <li>
                    <strong className="text-red-400">Important:</strong> Do NOT enable withdrawal permissions
                  </li>
                  <li>Copy both the <strong>API Key</strong> and <strong>API Secret</strong></li>
                  <li>Paste both into the form above</li>
                </ol>
              </div>

              <Alert className="bg-yellow-500/10 border-yellow-500/30">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-400 text-xs">
                  <strong>Security Tips:</strong> Never share your API keys. Always use IP whitelisting if available. We encrypt all credentials before storing.
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
