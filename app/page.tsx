import HeadlineDatePicker from "./headline/HeadlineDatePicker";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="p-10 text-4xl font-bold font-sans">
        NYT Headliner
      </h1>
      <HeadlineDatePicker />
    </div>
  );
}
