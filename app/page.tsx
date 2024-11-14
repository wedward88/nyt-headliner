import ThemeToggle from "./components/ThemeToggle";
import HeadlineDatePicker from "./headline/HeadlineDatePicker";

export default function Home() {
  return (
    <div className="flex flex-col">
      <ThemeToggle />
      <h1 className={"p-10 text-7xl font-chomsky self-center"}>
        NYT Headliner
      </h1>
      <HeadlineDatePicker />
    </div>
  );
}
