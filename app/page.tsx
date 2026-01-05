import ClientHeadphoneScroll from "./components/ClientHeadphoneScroll";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="z-10 text-center space-y-6 animate-fade-in-up">
          <h1 className="text-8xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
            Zenith X
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
            Redefining the architecture of sound.
          </p>
        </div>

        {/* Subtle background gradient or noise could go here */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black -z-10" />
      </section>

      {/* Scrollytelling Section */}
      <ClientHeadphoneScroll />

      {/* Feature / Footer Section */}
      <section className="py-32 px-6 flex flex-col items-center justify-center bg-zinc-950 border-t border-white/10">
        <h2 className="text-4xl font-bold mb-12">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Driver Unit</h3>
            <p className="text-neutral-400">50mm dynamic drivers with biocellulose diaphragm for rapid transient response.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Frequency</h3>
            <p className="text-neutral-400">4Hz - 40kHz extended range covering the full spectrum of audible sound and beyond.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Connectivity</h3>
            <p className="text-neutral-400">Bluetooth 5.4 with LDAC, AptX Lossless, and wired USB-C lossless audio support.</p>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-neutral-600 text-sm">
        &copy; {new Date().getFullYear()} Zenith Audio. Designed for the future.
      </footer>
    </main>
  );
}
