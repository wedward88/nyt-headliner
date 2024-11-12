import DatePickerWrapper from "./components/date-picker-wrapper";
import Headline from "./components/headline";

export default function Home() {
  return (
    <div>
      <h1>NYT Headliner</h1>
      <Headline />    
      <DatePickerWrapper />  
    </div>
  );
}
