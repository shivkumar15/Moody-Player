// import { useState } from "react";
// import { RiPlayFill } from "@remixicon/react";

// function MoodSongs({songs}) {
  

//   return (
//     <div className="moodsongs w-full pt-0 color-white  ">
//       <h2 className="text-white mb-[1rem] text-2xl mt-3 ">Recommended Songs</h2>

//       {songs.map((song, index) => {
//         return (
//           <div className=" w-full flex justify-between border mt-3" key={index}>
//             <div className="title ">
//               <h3 className="text-white font-bold "> {song.title}</h3>
//               <p className="text-white text-sm">{song.artist}</p>
//             </div>

//             <div className="play-pause-button flex justify-center items-center mr-40">
//               {/* <h3 className="text-white"></h3> */}
//               <audio src={songs[0].audio} controls ></audio>
//               <RiPlayFill
//                 size={25}
//                 color="white"
//                 className="my-icon"
//               />

//               {/* {songs[0].audio} */}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default MoodSongs;





function MoodSongs({ songs = [] }) {
  const safeSongs = Array.isArray(songs) ? songs : [];

  return (
    <section className="mt-6 w-full">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Your playlist
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
            Recommended songs
          </h2>
        </div>

        <span className="text-xs text-zinc-500">
          {safeSongs.length} tracks
        </span>
      </div>

      {safeSongs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-zinc-900/30 px-4 py-7 text-center">
          <p className="text-xs text-zinc-400">
            Detect your mood to discover songs.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {safeSongs.map((song, index) => (
            <article
              key={song._id || `${song.title}-${index}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2.5 transition hover:border-white/20 hover:bg-zinc-900"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[10px] text-zinc-500">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-white">
                    {song.title}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {song.artist}
                  </p>
                </div>
              </div>

              <audio
                src={song.audio}
                controls
                preload="none"
                className="h-8 w-[150px] shrink-0 sm:w-[210px]"
              />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MoodSongs;