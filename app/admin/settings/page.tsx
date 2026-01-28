'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={cn(
        'fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3',
        type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
      )}
    >
      {type === 'success' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </motion.div>
  )
}

export default function SettingsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('general')
  
  // Loading states
  const [isSavingGeneral, setIsSavingGeneral] = useState(false)
  const [isSavingAccount, setIsSavingAccount] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [isSavingNotifications, setIsSavingNotifications] = useState(false)
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  
  // Form states
  const [storeName, setStoreName] = useState('NAWAB KHANA')
  const [storeEmail, setStoreEmail] = useState('hello@nawabkhana.com')
  const [storePhone, setStorePhone] = useState('+91 93233 79975')
  const [currency, setCurrency] = useState('INR')
  const [taxRate, setTaxRate] = useState('18')
  
  // Password change
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
  ]

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSaveGeneral = async () => {
    setIsSavingGeneral(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSavingGeneral(false)
    showToast('Settings saved successfully!', 'success')
  }

  const handleSaveAccount = async () => {
    setIsSavingAccount(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSavingAccount(false)
    showToast('Profile updated successfully!', 'success')
  }

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match!', 'error')
      return
    }
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters!', 'error')
      return
    }
    setIsSavingPassword(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSavingPassword(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    showToast('Password updated successfully!', 'success')
  }

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSavingNotifications(false)
    showToast('Notification preferences saved!', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassPanel className="p-2 rounded-2xl inline-flex" animate={false}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-6 py-3 text-sm font-display rounded-xl transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-cocoa text-parchment'
                  : 'text-muted hover:text-ink'
              )}
            >
              {tab.label}
            </button>
          ))}
        </GlassPanel>
      </motion.div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Store Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Contact Email</label>
                <input
                  type="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Currency & Tax</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </GlassPanel>

          <div className="lg:col-span-2">
            <Button variant="gold" onClick={handleSaveGeneral} isLoading={isSavingGeneral}>
              Save Changes
            </Button>
          </div>
        </motion.div>
      )}

      {/* Account Settings */}
      {activeTab === 'account' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xl font-medium">
                  {session?.user?.name?.[0] || 'A'}
                </div>
                <div>
                  <p className="font-medium text-ink">{session?.user?.name || 'Admin'}</p>
                  <p className="text-sm text-muted">{session?.user?.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue={session?.user?.name || 'Admin'}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={session?.user?.email || ''}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <Button variant="gold" onClick={handleSaveAccount} isLoading={isSavingAccount}>
                Update Profile
              </Button>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                />
              </div>
              <Button variant="outline" onClick={handleUpdatePassword} isLoading={isSavingPassword}>
                Update Password
              </Button>
            </div>
          </GlassPanel>
        </motion.div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassPanel className="p-6 rounded-2xl max-w-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Email Notifications</h3>
            <div className="space-y-4">
              {[
                { id: 'orders', label: 'New Orders', description: 'Get notified when a new order is placed' },
                { id: 'stock', label: 'Low Stock Alerts', description: 'Get notified when product stock is low' },
                { id: 'reviews', label: 'Customer Reviews', description: 'Get notified about new customer reviews' },
                { id: 'newsletter', label: 'Newsletter Signups', description: 'Get notified about new newsletter subscribers' },
              ].map((item) => (
                <label key={item.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-parchment/30 transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-ink">{item.label}</p>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={item.id === 'orders' || item.id === 'stock'}
                    className="w-5 h-5 rounded border-cocoa/20 text-gold focus:ring-gold"
                  />
                </label>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="gold" onClick={handleSaveNotifications} isLoading={isSavingNotifications}>
                Save Preferences
              </Button>
            </div>
          </GlassPanel>
        </motion.div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

