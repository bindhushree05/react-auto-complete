import { useState } from "react";
import data from "./resources/countryData.json";
import "./App.css";

export default function App() {
  const [value, setValue] = useState("");

  const onChange = (event) => setValue(event.target.value);
  const onSearch = (searchTerm) => setValue(searchTerm);

  const handleKey = (e) => {
    const dropdown = document.getElementById("dropdown");
    dropdown.style.display = e.key === "Escape" ? "none" : "inline";
  };

  const filterData = () => {
    const searchTerm = value.toLowerCase();

    return data
      .filter((item) => {
        const fullName = item.name.toLowerCase();
        return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm;
      })
      .slice(0, 10);
  };

  return (
    <div className="App">
      <h1>Search</h1>
      <div>
        <div>
          <input type="text" value={value} onChange={onChange} onKeyDown={handleKey} />
          <button onClick={() => onSearch(value)}>Search</button>
        </div>
        <div id="dropdown" style={{ display: filterData().length ? "inline" : "none" }}>
          {filterData().map((item) => (
            <div key={item.name} onClick={() => onSearch(item.name)}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
