'use client'

import ClientOnly from './components/ClientOnly'
import Scene from './App'
import { AppProvider } from './contexts/AppContext'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full z-0 h-screen">
        <AppProvider> 
          <ClientOnly>
            <Scene />
          </ClientOnly>
        </AppProvider>
      </div>
    </main>
  )
}