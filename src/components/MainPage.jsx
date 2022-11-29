import React, { useEffect, useState, useRef } from "react";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { RiSunFill } from "react-icons/ri";
import {
  BsCloudsFill,
  BsFillCloudDrizzleFill,
  BsFillCloudRainHeavyFill,
  BsFillCloudSnowFill,
  BsThermometerSnow,
  BsThermometerSun,
  BsThermometerHalf,
} from "react-icons/bs";
import Forcast from "./Forecast";
import axios from "axios";

export default function MainPage() {
  const [location, setLocation] = useState("georgia");
  const locatoinRef = useRef(null);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=446b1001cea52469f7ca74f028b594b6`;
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState({ current: 0, max: 0, min: 0 });
  const [forcast, setForcast] = useState();

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response);
    });
  }, [{ location, forcast }]);

  const ApiLocation = () => {
    locatoinRef.current.focus();
    if (locatoinRef.current.value === "") {
      return null;
    } else {
      setLocation(locatoinRef.current.value);
    }
    console.log(data);
    setWeather(data.data.list[0].weather[0].main);
    setTemp({
      current: data.data.list[0].main.temp,
      max: data.data.list[0].main.temp_max,
      min: data.data.list[0].main.temp_min,
    });
    setForcast(data.data.list);

    console.log(forcast);
  };
  const dataCheck = data.data === undefined;
  return (
    <main
      style={{
        background: `linear-gradient(${"68.4deg, #11998e -0.4%,#38ef7d 100.2% "})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-2  ">
        <div className="w-[14rem] h-[2.2rem] rounded-[20px] mt-[1rem] bg-blue-500 bg-opacity-25	 flex items-center justify-center">
          <input
            style={{ outline: "none" }}
            className="w-[10rem] h-[2.2rem]  bg-transparent placeholder-black "
            type="text"
            placeholder=" Search Location"
            ref={locatoinRef}
          />{" "}
          <CiSearch
            className="  w-[1rem] h-[2rem] cursor-pointer "
            onClick={() => ApiLocation()}
          />
        </div>
      </div>
      <section className="flex flex-col items-center justify-center mt-3 text-[2.3rem] ">
        <h1 className="flex flex-row items-center justify-center text-orange-600">
          <CiLocationOn className="text-red-600" />
          {dataCheck ? "Empty " : data.data.city.name}
        </h1>
        <h1 className="text-[2rem] flex flex-row items-center justify-center gap-2 mt-10 text-orange-800">
          {weather === "Clouds" ? (
            <BsCloudsFill className="text-blue-500" />
          ) : weather === "Clear" ? (
            <RiSunFill className="text-orange-500" />
          ) : weather === "Drizzle" ? (
            <BsFillCloudDrizzleFill className="text-blue-800" />
          ) : weather === "Rain" ? (
            <BsFillCloudRainHeavyFill className="text-blue-800" />
          ) : weather === "Snow" ? (
            <BsFillCloudSnowFill />
          ) : null}

          {dataCheck ? "Empty" : weather}
        </h1>
        <h1 className="text-[5rem] flex flex-row items-center justify-center text-white gap-2 mt-10">
          {dataCheck ? "00" : temp.current}°
          {temp.current < 0 ? (
            <BsThermometerSnow className="text-blue-300" />
          ) : temp.current > 30 ? (
            <BsThermometerSun className="text-orange-800" />
          ) : (
            <BsThermometerHalf className="text-yellow-300" />
          )}
        </h1>
        <div className="text-[1rem] text-white">
          <h2 className="gap-3">Max temp {temp.max}°</h2>
          <h2 className="gap-3">Min temp {temp.min}°</h2>
        </div>
        <Forcast forcast={forcast} />
      </section>
    </main>
  );
}
