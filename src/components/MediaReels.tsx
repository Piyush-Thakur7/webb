import { useState, type FC } from 'react';
import { Camera, Film, Heart, Sparkles, Play, Pause } from 'lucide-react';

interface VideoItem {
  id: number;
  src: string;
  caption: string;
  tag: string;
}

export const MediaReels: FC = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videos: VideoItem[] = [
    { id: 1, src: '/media/reel_1.mp4', caption: 'Her adorable cute moments 🐼', tag: 'Pure Sweetness' },
    { id: 2, src: '/media/reel_2.mp4', caption: 'That gorgeous smile that melts me ✨', tag: 'My Sunshine' },
    { id: 3, src: '/media/reel_3.mp4', caption: 'Chubby cheeks & precious giggles 🌸', tag: 'Chubby Panda' },
    { id: 4, src: '/media/reel_4.mp4', caption: 'Living rent-free in my heart forever 💕', tag: 'Best Memories' },
    { id: 5, src: '/media/reel_5.mp4', caption: 'The prettiest girl in any room 👑', tag: 'Queen Matko' },
  ];

  const toggleVideoPlay = (id: number) => {
    const videoEl = document.getElementById(`video-${id}`) as HTMLVideoElement | null;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play();
      setActiveVideo(id);
    } else {
      videoEl.pause();
      setActiveVideo(null);
    }
  };

  return (
    <section className="my-14 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Camera className="w-3.5 h-3.5 text-purple-500" />
          <span>Matko's Hall of Cuteness</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-bubble">
          Our Special Moments & Memories 📸✨
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Look at how beautiful and cute you are! Every single video and picture reminds me why I'm the luckiest guy alive.
        </p>
      </div>

      {/* Featured Polaroid Photo Card */}
      <div className="flex justify-center mb-12">
        <div className="relative bg-white p-4 pb-8 rounded-xl shadow-2xl border border-gray-100 max-w-xs transform -rotate-2 hover:rotate-0 transition-transform duration-300 group">
          {/* Tape on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/80 backdrop-blur-sm -rotate-1 shadow-sm border border-amber-200/50" />

          {/* Photo frame */}
          <div className="overflow-hidden rounded-lg bg-pink-50 border border-gray-100 aspect-square flex items-center justify-center">
            <img
              src="/media/matko_photo.jpeg"
              alt="My Gorgeous Matko Aishwarya"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                // Fallback in case of local file load error
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="mt-4 text-center">
            <p className="font-handwriting text-2xl text-gray-800 font-bold">
              The Queen Herself: Matko ❤️
            </p>
            <p className="text-xs text-pink-600 font-semibold flex items-center justify-center gap-1 mt-1">
              <Sparkles className="w-3 h-3" /> Cutest Panda to Ever Exist
            </p>
          </div>
        </div>
      </div>

      {/* Video Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Tag Badge */}
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                {vid.tag}
              </span>
              <Film className="w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Video container */}
            <div
              onClick={() => toggleVideoPlay(vid.id)}
              className="relative rounded-xl overflow-hidden bg-black aspect-[9/16] cursor-pointer max-h-72 flex items-center justify-center"
            >
              <video
                id={`video-${vid.id}`}
                src={vid.src}
                loop
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setActiveVideo(null)}
              />

              {/* Play / Pause overlay */}
              <div
                className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${
                  activeVideo === vid.id ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-pink-600 shadow-lg group-hover:scale-110 transition-transform">
                  {activeVideo === vid.id ? (
                    <Pause className="w-6 h-6 fill-pink-600" />
                  ) : (
                    <Play className="w-6 h-6 fill-pink-600 ml-0.5" />
                  )}
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-3 px-1">
              <p className="text-xs font-bold text-gray-800 flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
                <span>{vid.caption}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
