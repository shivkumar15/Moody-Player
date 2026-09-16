import FaceDetection from "./components/FaceDetection";
import MoodSongs from "./components/Songs";
import { useState } from "react";
function App() {
  const [songs,setSongs] = useState([
    // {
    //   title: "Test Title",
    //   artist: "Test Artist",
    //   url: "test_url",
    // },
    //   {
    //   title: "Test Title",
    //   artist: "Test Artist",
    //   url: "test_url",
    // },
    //   {
    //   title: "Test Title",
    //   artist: "Test Artist",
    //   url: "test_url",
    // },
  ]);

  return (
    <div className="p-10 bg-black h-full w-screen">
      <FaceDetection setSongs={setSongs} />
      <MoodSongs songs={songs}/>
    </div>
  );
}

export default App;