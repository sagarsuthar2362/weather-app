import React, { useState } from "react";
import cloudy from "./assets/clouds.png";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const fetchWeather = async () => {
    if (!query.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query.trim()}&units=metric&appid=${API_KEY}`
      );
      setData(response.data);
    } catch (err) {
      setData(null);
      alert("city not found!");
      console.log(err);
    }
  };

  // console.log(data.main.humidity);
  return (
    <div className="h-screen bg-gradient-to-tr from-blue-950 to-black text-white md:flex items-center justify-center  p-10">
      <div className="flex flex-col items-center md:w-3/12 gap-6 ">
        {/* searchbox */}
        <div className="flex border items-center p-2 md:text-xl rounded-md justify-between w-full">
          <input
            type="text"
            placeholder="search by city"
            className="outline-none"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <BiSearch
            className="cursor-pointer text-2xl"
            onClick={fetchWeather}
          />
        </div>

        <img
          src={
            data
              ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
              : cloudy
          }
          alt=""
          className="h-24"
        />

        {/* city and temperature */}
        <div className="text-center">
          <span className="md:text-4xl text-2xl md:font-bold font-semibold">
            {data ? `${data.main.temp} °C` : "--"}{" "}
          </span>
          <h2 className="text-xl">{data ? data.name : "Search city"}</h2>
        </div>

        <div className="flex w-full justify-between md:text-2xl text-lg">
          {/* humidity */}
          <div className="flex flex-col items-center gap-2">
            <WiHumidity className="md:text-4xl text-2xl" />
            <span>{data ? `${data.main.humidity} ` : "--"}</span>
            <h2>Humidity</h2>
          </div>

          {/* windspeed */}
          <div className="flex flex-col items-center gap-2">
            <FaWind className="md:text-4xl text-2xl" />
            <span>{data ? `${data.wind.speed} m/s` : "--"}</span>
            <h2>wind speed</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
