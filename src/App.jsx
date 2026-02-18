import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import MainMenu from "./screens/MainMenu";
import EndOfMatch from "./screens/EndOfMatch";
import PreMatch from "./screens/PreMatch";
import GameplayHUD from "./screens/GameplayHUD";
import DailyChallenge from "./screens/DailyChallenge";
import Leaderboard from "./screens/Leaderboard";
import Shop from "./screens/Shop";
import Settings from "./screens/Settings";
import CameraCalibration from "./screens/CameraCalibration";
import PlayerProfile from "./screens/PlayerProfile";
import Onboarding from "./screens/Onboarding";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/end-of-match" element={<EndOfMatch />} />
        <Route path="/pre-match" element={<PreMatch />} />
        <Route path="/gameplay-hud" element={<GameplayHUD />} />
        <Route path="/daily-challenge" element={<DailyChallenge />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/camera-calibration" element={<CameraCalibration />} />
        <Route path="/player-profile" element={<PlayerProfile />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}
