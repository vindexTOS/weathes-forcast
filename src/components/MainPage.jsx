import React, { useEffect, useState, useRef } from "react";
import Forest from "../utils/Forest.jpg";
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

import axios from "axios";

export default function MainPage() {
  const [location, setLocation] = useState("georgia");
  const locatoinRef = useRef(null);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=446b1001cea52469f7ca74f028b594b6`;
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response);
    });
  }, [location]);

  const ApiLocation = () => {
    locatoinRef.current.focus();
    if (locatoinRef.current.value === "") {
      return null;
    } else {
      setLocation(locatoinRef.current.value);
    }
    console.log(data);
    setWeather(data.data.list[0].weather[0].main);
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
        <h1 className="flex flex-row items-center justify-center">
          <CiLocationOn />
          {dataCheck ? "Empty " : data.data.city.name}
        </h1>
        <h1 className="text-[2rem] flex flex-row items-center justify-center gap-2 mt-10">
          {weather === "Clouds" ? (
            <BsCloudsFill />
          ) : weather === "Clear" ? (
            <RiSunFill />
          ) : weather === "Drizzle" ? (
            <BsFillCloudDrizzleFill />
          ) : weather === "Rain" ? (
            <BsFillCloudRainHeavyFill />
          ) : weather === "Snow" ? (
            <BsFillCloudSnowFill />
          ) : null}

          {dataCheck ? "Empty" : weather}
        </h1>
        <h1 className="text-[5rem] flex flex-row items-center justify-center gap-2 mt-10">
          {dataCheck ? "00" : data.data.list[0].main.temp}°
          {data.data.list[0].main.temp < 0 ? (
            <BsThermometerSnow />
          ) : data.data.list[0].main.temp > 30 ? (
            <BsThermometerSun />
          ) : (
            <BsThermometerHalf />
          )}
        </h1>
      </section>
    </main>
  );
}
