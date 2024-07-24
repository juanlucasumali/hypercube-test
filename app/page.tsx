'use client'

import ClientOnly from './components/ClientOnly'
import Scene from './App'
import { AppProvider, useAppContext } from './contexts/AppContext'
import { TitleScreen } from './components/TitleScreen'

function HomeContent() {
  const { onTitleScreen } = useAppContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full z-0 h-screen">
        <TitleScreen />
        <ClientOnly>
          {!onTitleScreen && <Scene />}
        </ClientOnly>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  )
}