import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  RefreshCw, 
  Settings, 
  Mail, 
  Shield, 
  Database, 
  Bell,
  Palette,
  Globe,
  Key
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface SystemSettings {
  general: {
    site_name: string;
    site_description: string;
    contact_email: string;
    support_email: string;
    phone: string;
    address: string;
    timezone: string;
    language: string;
  };
  ecommerce: {
    currency: string;
    tax_rate: number;
    shipping_enabled: boolean;
    default_shipping_cost: number;
    free_shipping_threshold: number;
    inventory_tracking: boolean;
    low_stock_threshold: number;
  };
  email: {
    smtp_host: string;
    smtp_port: number;
    smtp_username: string;
    smtp_password: string;
    from_email: string;
    from_name: string;
    email_notifications: boolean;
  };
  security: {
    two_factor_required: boolean;
    password_min_length: number;
    session_timeout: number;
    max_login_attempts: number;
    ip_whitelist_enabled: boolean;
    ip_whitelist: string[];
  };
  notifications: {
    new_order_admin: boolean;
    new_order_customer: boolean;
    quote_request_admin: boolean;
    quote_submitted_customer: boolean;
    low_stock_admin: boolean;
    user_registration_admin: boolean;
  };
  appearance: {
    primary_color: string;
    secondary_color: string;
    logo_url: string;
    favicon_url: string;
    theme: 'light' | 'dark' | 'auto';
  };
}

const SystemSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      site_name: 'Standbyte Nexus Hub',
      site_description: 'Professional e-commerce platform',
      contact_email: 'contact@standbytenexushub.com',
      support_email: 'support@standbytenexushub.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, City, State 12345',
      timezone: 'UTC',
      language: 'en'
    },
    ecommerce: {
      currency: 'USD',
      tax_rate: 8.5,
      shipping_enabled: true,
      default_shipping_cost: 9.99,
      free_shipping_threshold: 100,
      inventory_tracking: true,
      low_stock_threshold: 10
    },
    email: {
      smtp_host: '',
      smtp_port: 587,
      smtp_username: '',
      smtp_password: '',
      from_email: 'noreply@standbytenexushub.com',
      from_name: 'Standbyte Nexus Hub',
      email_notifications: true
    },
    security: {
      two_factor_required: false,
      password_min_length: 8,
      session_timeout: 30,
      max_login_attempts: 5,
      ip_whitelist_enabled: false,
      ip_whitelist: []
    },
    notifications: {
      new_order_admin: true,
      new_order_customer: true,
      quote_request_admin: true,
      quote_submitted_customer: true,
      low_stock_admin: true,
      user_registration_admin: false
    },
    appearance: {
      primary_color: '#3b82f6',
      secondary_color: '#10b981',
      logo_url: '',
      favicon_url: '',
      theme: 'light'
    }
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // In a real app, fetch settings from database
      // For now, use default settings
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch system settings',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      // In a real app, save settings to database
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Success',
        description: 'Settings saved successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai'
  ];

  const currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'BRL'
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'pt', label: 'Portuguese' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <div className="flex gap-2">
          <Button onClick={fetchSettings} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={saveSettings} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            E-commerce
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic site configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    id="site_name"
                    value={settings.general.site_name}
                    onChange={(e) => updateSetting('general', 'site_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={settings.general.contact_email}
                    onChange={(e) => updateSetting('general', 'contact_email', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={settings.general.site_description}
                  onChange={(e) => updateSetting('general', 'site_description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="support_email">Support Email</Label>
                  <Input
                    id="support_email"
                    type="email"
                    value={settings.general.support_email}
                    onChange={(e) => updateSetting('general', 'support_email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={settings.general.phone}
                    onChange={(e) => updateSetting('general', 'phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.general.address}
                  onChange={(e) => updateSetting('general', 'address', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.general.timezone} onValueChange={(value) => updateSetting('general', 'timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map(tz => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.general.language} onValueChange={(value) => updateSetting('general', 'language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ecommerce">
          <Card>
            <CardHeader>
              <CardTitle>E-commerce Settings</CardTitle>
              <CardDescription>Configure store and payment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.ecommerce.currency} onValueChange={(value) => updateSetting('ecommerce', 'currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                  <Input
                    id="tax_rate"
                    type="number"
                    step="0.1"
                    value={settings.ecommerce.tax_rate}
                    onChange={(e) => updateSetting('ecommerce', 'tax_rate', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="low_stock_threshold">Low Stock Threshold</Label>
                  <Input
                    id="low_stock_threshold"
                    type="number"
                    value={settings.ecommerce.low_stock_threshold}
                    onChange={(e) => updateSetting('ecommerce', 'low_stock_threshold', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Shipping</Label>
                    <p className="text-sm text-gray-500">Allow customers to select shipping options</p>
                  </div>
                  <Switch
                    checked={settings.ecommerce.shipping_enabled}
                    onCheckedChange={(checked) => updateSetting('ecommerce', 'shipping_enabled', checked)}
                  />
                </div>

                {settings.ecommerce.shipping_enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="default_shipping_cost">Default Shipping Cost</Label>
                      <Input
                        id="default_shipping_cost"
                        type="number"
                        step="0.01"
                        value={settings.ecommerce.default_shipping_cost}
                        onChange={(e) => updateSetting('ecommerce', 'default_shipping_cost', parseFloat(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="free_shipping_threshold">Free Shipping Threshold</Label>
                      <Input
                        id="free_shipping_threshold"
                        type="number"
                        step="0.01"
                        value={settings.ecommerce.free_shipping_threshold}
                        onChange={(e) => updateSetting('ecommerce', 'free_shipping_threshold', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Inventory Tracking</Label>
                    <p className="text-sm text-gray-500">Track product stock levels</p>
                  </div>
                  <Switch
                    checked={settings.ecommerce.inventory_tracking}
                    onCheckedChange={(checked) => updateSetting('ecommerce', 'inventory_tracking', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure SMTP and email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Enable automated email notifications</p>
                </div>
                <Switch
                  checked={settings.email.email_notifications}
                  onCheckedChange={(checked) => updateSetting('email', 'email_notifications', checked)}
                />
              </div>

              {settings.email.email_notifications && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp_host">SMTP Host</Label>
                      <Input
                        id="smtp_host"
                        value={settings.email.smtp_host}
                        onChange={(e) => updateSetting('email', 'smtp_host', e.target.value)}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp_port">SMTP Port</Label>
                      <Input
                        id="smtp_port"
                        type="number"
                        value={settings.email.smtp_port}
                        onChange={(e) => updateSetting('email', 'smtp_port', parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp_username">SMTP Username</Label>
                      <Input
                        id="smtp_username"
                        value={settings.email.smtp_username}
                        onChange={(e) => updateSetting('email', 'smtp_username', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp_password">SMTP Password</Label>
                      <Input
                        id="smtp_password"
                        type="password"
                        value={settings.email.smtp_password}
                        onChange={(e) => updateSetting('email', 'smtp_password', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from_email">From Email</Label>
                      <Input
                        id="from_email"
                        type="email"
                        value={settings.email.from_email}
                        onChange={(e) => updateSetting('email', 'from_email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="from_name">From Name</Label>
                      <Input
                        id="from_name"
                        value={settings.email.from_name}
                        onChange={(e) => updateSetting('email', 'from_name', e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure authentication and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Force all admin users to enable 2FA</p>
                </div>
                <Switch
                  checked={settings.security.two_factor_required}
                  onCheckedChange={(checked) => updateSetting('security', 'two_factor_required', checked)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="password_min_length">Minimum Password Length</Label>
                  <Input
                    id="password_min_length"
                    type="number"
                    min="6"
                    max="20"
                    value={settings.security.password_min_length}
                    onChange={(e) => updateSetting('security', 'password_min_length', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session_timeout"
                    type="number"
                    value={settings.security.session_timeout}
                    onChange={(e) => updateSetting('security', 'session_timeout', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="max_login_attempts">Max Login Attempts</Label>
                  <Input
                    id="max_login_attempts"
                    type="number"
                    min="3"
                    max="10"
                    value={settings.security.max_login_attempts}
                    onChange={(e) => updateSetting('security', 'max_login_attempts', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>IP Whitelist</Label>
                  <p className="text-sm text-gray-500">Restrict admin access to specific IP addresses</p>
                </div>
                <Switch
                  checked={settings.security.ip_whitelist_enabled}
                  onCheckedChange={(checked) => updateSetting('security', 'ip_whitelist_enabled', checked)}
                />
              </div>

              {settings.security.ip_whitelist_enabled && (
                <div>
                  <Label htmlFor="ip_whitelist">Allowed IP Addresses</Label>
                  <Textarea
                    id="ip_whitelist"
                    placeholder="192.168.1.1&#10;10.0.0.1&#10;203.0.113.1"
                    value={settings.security.ip_whitelist.join('\n')}
                    onChange={(e) => updateSetting('security', 'ip_whitelist', e.target.value.split('\n').filter(ip => ip.trim()))}
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-1">One IP address per line</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure automated notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Order - Admin Notification</Label>
                    <p className="text-sm text-gray-500">Send email to admin when new order is placed</p>
                  </div>
                  <Switch
                    checked={settings.notifications.new_order_admin}
                    onCheckedChange={(checked) => updateSetting('notifications', 'new_order_admin', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Order - Customer Confirmation</Label>
                    <p className="text-sm text-gray-500">Send order confirmation to customer</p>
                  </div>
                  <Switch
                    checked={settings.notifications.new_order_customer}
                    onCheckedChange={(checked) => updateSetting('notifications', 'new_order_customer', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Quote Request - Admin Notification</Label>
                    <p className="text-sm text-gray-500">Send email to admin when quote is requested</p>
                  </div>
                  <Switch
                    checked={settings.notifications.quote_request_admin}
                    onCheckedChange={(checked) => updateSetting('notifications', 'quote_request_admin', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Quote Submitted - Customer Notification</Label>
                    <p className="text-sm text-gray-500">Send quote details to customer</p>
                  </div>
                  <Switch
                    checked={settings.notifications.quote_submitted_customer}
                    onCheckedChange={(checked) => updateSetting('notifications', 'quote_submitted_customer', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Low Stock - Admin Alert</Label>
                    <p className="text-sm text-gray-500">Alert admin when product stock is low</p>
                  </div>
                  <Switch
                    checked={settings.notifications.low_stock_admin}
                    onCheckedChange={(checked) => updateSetting('notifications', 'low_stock_admin', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>User Registration - Admin Notification</Label>
                    <p className="text-sm text-gray-500">Send email to admin when new user registers</p>
                  </div>
                  <Switch
                    checked={settings.notifications.user_registration_admin}
                    onCheckedChange={(checked) => updateSetting('notifications', 'user_registration_admin', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary_color"
                      type="color"
                      value={settings.appearance.primary_color}
                      onChange={(e) => updateSetting('appearance', 'primary_color', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.appearance.primary_color}
                      onChange={(e) => updateSetting('appearance', 'primary_color', e.target.value)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary_color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary_color"
                      type="color"
                      value={settings.appearance.secondary_color}
                      onChange={(e) => updateSetting('appearance', 'secondary_color', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.appearance.secondary_color}
                      onChange={(e) => updateSetting('appearance', 'secondary_color', e.target.value)}
                      placeholder="#10b981"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.appearance.theme} onValueChange={(value) => updateSetting('appearance', 'theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    value={settings.appearance.logo_url}
                    onChange={(e) => updateSetting('appearance', 'logo_url', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="favicon_url">Favicon URL</Label>
                  <Input
                    id="favicon_url"
                    value={settings.appearance.favicon_url}
                    onChange={(e) => updateSetting('appearance', 'favicon_url', e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
