import TopBar from "./components/top-bar";
import Footer from "./components/footer";
import Home from "./pages/home/Home";

export default function App() {
  return (
    <div className="min-w-300 overflow-x-hidden bg-ice">
      <TopBar />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}
