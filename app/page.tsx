import ClientOnly from './ClientOnly'
import Scene from './Scene'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full h-screen">
        <ClientOnly>
          <Scene />
        </ClientOnly>
      </div>
    </main>
  )
}