import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

export default function Home() {
  return (
    <div className="bg-violet-200 flex justify-center items-center mx-auto w-screen h-screen">
      <h1 className="font-extrabold text-transparent md:text-8xl text-6xl bg-clip-text bg-gradient-to-r from-violet-400 to-pink-600">
        Klatch!
      </h1>
      <span className="md:text-8xl text-6xl">🚀</span>
    </div>
  )
}
