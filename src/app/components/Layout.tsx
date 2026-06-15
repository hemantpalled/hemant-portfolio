import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SinglePage } from "../pages/SinglePage";
import { MusicPlayer } from "./MusicPlayer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <SinglePage />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}
