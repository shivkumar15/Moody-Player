// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import axios from "axios"

// function FaceDetection({setSongs}) {
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   const [mood, setMood] = useState("Loading models...");
//   const [isReady, setIsReady] = useState(false);
//   const [isDetecting, setIsDetecting] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     async function start() {
//       try {
//         setMood("Loading models...");

//         await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

//         await faceapi.nets.faceExpressionNet.loadFromUri("/models");

//         if (!isMounted) return;

//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });

//         streamRef.current = stream;

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }

//         setIsReady(true);
//         setMood("Camera ready");
//       } catch (error) {
//         console.error("Error:", error);
//         setMood("Error: " + error.message);
//       }
//     }

//     start();

//     return () => {
//       isMounted = false;

//       streamRef.current?.getTracks().forEach((track) => {
//         track.stop();
//       });
//     };
//   }, []);

//   async function detectMood() {
//     if (!videoRef.current || !isReady) return;

//     try {
//       setIsDetecting(true);
//       setMood("Detecting...");

//       const detection = await faceapi
//         .detectSingleFace(
//           videoRef.current,
//           new faceapi.TinyFaceDetectorOptions()
//         )
//         .withFaceExpressions();

//       if (!detection) {
//         setMood("No face detected");
//         return;
//       }

//       const expressions = detection.expressions;

//       const [bestMood, score] = Object.entries(expressions).sort(
//         (a, b) => b[1] - a[1]
//       )[0];

//       console.log("Best mood:", bestMood);
//       console.log("Best mood score:", score);

//       setMood(`${bestMood} (${(score * 100).toFixed(1)}%)`);

//       axios.get(`http://localhost:3000/songs?mood=${bestMood}`)
//     .then(response=>{
//       console.log(response.data)
//       setSongs(response.data.song)
//       console.log(response.data.song)
//     })

//     } catch (error) {
//       console.error("Detection error:", error);
//       setMood("Detection failed");
//     } finally {
//       setIsDetecting(false);
//     }

//     // get http://localhost:3000/songs?mood=happy

    
//   }

//   return (
//     <div className="  ">
    

   
//       <h1 className="text-4xl font-bold text-white">Face Mood Detector</h1>
//     <div className="flex mt-5 items-center gap-5">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         playsInline
//         className="w-96 rounded-md"
//       />
//     <div className="flex flex-col gap-3">
//     <button
//         className="bg-red-400 px-2 py-1 rounded-md text-white bg-sky-500 "
//         onClick={detectMood}
//         disabled={!isReady || isDetecting}
//       >
//         {isDetecting ? "Detecting..." : "Detect Mood"}
//       </button>

//       <h2 className="text-white text-lg "> {mood}</h2>
//     </div>
      

//     </div>  
//     </div>
//   );
// }

// export default FaceDetection;





import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

function FaceDetection({ setSongs }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [mood, setMood] = useState("Loading models...");
  const [isReady, setIsReady] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function startCamera() {
      try {
        setMood("Loading models...");

        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");

        if (!isMounted) return;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setIsReady(true);
        setMood("Camera ready");
      } catch (error) {
        console.error(error);
        setMood(error.message || "Camera unavailable");
      }
    }

    startCamera();

    return () => {
      isMounted = false;

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  async function detectMood() {
    if (!videoRef.current || !isReady || isDetecting) return;

    try {
      setIsDetecting(true);
      setMood("Analyzing...");

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (!detection) {
        setMood("No face detected");
        return;
      }

      const [bestMood, score] = Object.entries(
        detection.expressions
      ).sort((a, b) => b[1] - a[1])[0];

      setMood(`${bestMood} · ${(score * 100).toFixed(1)}%`);

      const response = await axios.get(
        `http://localhost:3000/songs?mood=${bestMood}`
      );

      setSongs(Array.isArray(response.data.song) ? response.data.song : []);
    } catch (error) {
      console.error("Detection error:", error);
      setMood("Detection failed");
    } finally {
      setIsDetecting(false);
    }
  }

  return (
    <section className="w-full ">
      <div className="mb-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          AI Music Experience
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Music that matches your mood.
        </h1>

        <p className="mt-1 max-w-lg text-xs leading-5 text-zinc-500">
          Detect your facial expression and discover songs that match your
          current feeling.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        {/* Camera Card */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-zinc-300">Live camera</span>
            </div>

            <span className="text-[11px] text-zinc-500">
              {isReady ? "Connected" : "Initializing"}
            </span>
          </div>

          <div className="relative aspect-[16/9] max-h-[265px] bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />

            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                <p className="text-xs text-zinc-500">Preparing camera...</p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-3 rounded-lg border border-white/10" />
          </div>

          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                Current mood
              </p>

              <p className="mt-1 truncate text-sm font-medium capitalize text-white">
                {mood}
              </p>
            </div>

            <button
              type="button"
              onClick={detectMood}
              disabled={!isReady || isDetecting}
              className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {isDetecting ? "Analyzing..." : "Detect mood"}
            </button>
          </div>
        </div>

        {/* Information Card */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            How it works
          </p>

          <div className="mt-4 space-y-4">
            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[11px] text-zinc-400">
                01
              </span>

              <div>
                <h3 className="text-sm font-medium text-white">
                  Show your face
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-zinc-500">
                  Allow camera access.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[11px] text-zinc-400">
                02
              </span>

              <div>
                <h3 className="text-sm font-medium text-white">
                  Detect your mood
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-zinc-500">
                  AI analyzes your facial expression.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[11px] text-zinc-400">
                03
              </span>

              <div>
                <h3 className="text-sm font-medium text-white">
                  Enjoy your playlist
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-zinc-500">
                  Get songs based on your mood.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-3">
            <p className="text-[10px] leading-4 text-zinc-600">
              Your camera stream is processed by this component and is not
              uploaded to your music API.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaceDetection;