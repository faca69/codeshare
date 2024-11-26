import Card from "./components/Card";
import ToolBar from "./components/ToolBar";

export default function App() {
  return (
    <div className="text-white bg-black bg-dot-white/25 min-h-screen flex flex-col justify-center items-center">
      <Card />
      <ToolBar />
    </div>
  );
}
