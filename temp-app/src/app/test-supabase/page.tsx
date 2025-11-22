'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Check if we can connect to Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(5)

        if (error) {
          // If table doesn't exist yet, that's okay - connection works
          if (error.message.includes('relation') || error.message.includes('does not exist')) {
            setStatus('success')
            setMessage('✅ Connected to Supabase! Database tables need to be created. Run the SQL setup script.')
          } else {
            throw error
          }
        } else {
          setStatus('success')
          setMessage(`✅ Connected to Supabase! Found ${data?.length || 0} products.`)
          setProducts(data || [])
        }
      } catch (err: any) {
        setStatus('error')
        setMessage(`❌ Connection failed: ${err.message}`)
        console.error('Supabase connection error:', err)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          
          {status === 'loading' && (
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Testing connection...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">{message}</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">{message}</p>
              <p className="text-red-600 text-sm mt-2">
                Check your .env.local file and make sure your Supabase credentials are correct.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-medium w-32">Project URL:</span>
              <span className="text-gray-600">{process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured'}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Project ID:</span>
              <span className="text-gray-600">flmyvxwsnjzizgsosntl</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Status:</span>
              <span className={`font-medium ${status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>
                {status === 'loading' ? 'Connecting...' : status === 'success' ? 'Connected' : 'Failed'}
              </span>
            </div>
          </div>
        </div>

        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
            <div className="overflow-x-auto">
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(products, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>If connection successful but no tables: Run the SQL setup script in Supabase</li>
            <li>Go to your Supabase dashboard → SQL Editor</li>
            <li>Copy and run the contents of <code className="bg-blue-100 px-1 rounded">supabase-setup.sql</code></li>
            <li>Refresh this page to see your products</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
