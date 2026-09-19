import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { CholeKulcheGame } from './components/CholeKulcheGame';
import { ApologyLetter } from './components/ApologyLetter';
import { MediaReels } from './components/MediaReels';
import { ForgivenessGame } from './components/ForgivenessGame';
import { LoveCoupons } from './components/LoveCoupons';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { SurpriseModal } from './components/SurpriseModal';
import { ScrollIndicator } from './components/ScrollIndicator';
import { Heart, Sparkles } from 'lucide-react';

export function App() {
  const [angerLevel, setAngerLevel] = useState(100);
  const [isForgiven, setIsForgiven] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  return (
    <div className="min-h-screen relative selection:bg-pink-300 selection:text-pink-900 pb-20">
      {/* 🎁 Initial Surprise Gift Box Entrance Modal */}
      <SurpriseModal onOpen={() => setMusicTrigger(true)} />

      {/* Floating Sparkles & Ambient Hearts */}
      <FloatingHearts />

      {/* Floating Romantic Song Player (Starts on surprise box open at 25% volume) */}
      <MusicPlayer forcePlay={musicTrigger} />

      {/* ⬇️ Bottom Left Corner Scroll Indicator */}
      <ScrollIndicator />

      {/* Hero Section with Angry Panda & Anger-O-Meter */}
      <HeroSection angerLevel={angerLevel} />

      {/* Interactive Chole Kulche Feeding Station */}
      <CholeKulcheGame angerLevel={angerLevel} setAngerLevel={setAngerLevel} />

      {/* Heartfelt Confession & Apology Letter */}
      <ApologyLetter />

      {/* Memories & Media Gallery (Aishwarya's photo & video reels) */}
      <MediaReels />

      {/* The Runaway NO Button & YES Forgiveness Quest */}
      <ForgivenessGame 
        isForgiven={isForgiven} 
        setIsForgiven={setIsForgiven} 
        setAngerLevel={setAngerLevel} 
      />

      {/* Unlocked / Redeemable Love Coupons for Matko (Locked until YES) */}
      <LoveCoupons isForgiven={isForgiven} />

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-gray-500 text-xs md:text-sm border-t border-pink-200/60 max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-2 text-pink-600 font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Crafted with infinite love for Aishwarya (Matko)</span>
          <Heart className="w-4 h-4 fill-pink-500" />
        </div>
        <p className="text-gray-400">
          Built by Piyush • Guaranteed zero arguments & unlimited Chole Kulche forever • 🐼❤️
        </p>
      </footer>
    </div>
  );
}

export default App;
