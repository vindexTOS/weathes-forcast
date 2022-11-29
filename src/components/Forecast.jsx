import React from "react";
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
import { MdDateRange } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";

export default function Forecast({ forcast }) {
  return (
    <div className="flex flex-row  overflow-x-scroll w-[10rem]  max_sm:w-[90%] sm:w-[60%] sm:mt-[5rem] max_sm:mt-[50%] gap-2 ">
      {forcast === undefined
        ? "null"
        : forcast.map((item) => {
            const weatherMain = item.weather[0].main;
            const temp = item.main.temp;
            const date = item.dt_txt.slice(5, 10).replace("-", "/");
            const time = item.dt_txt.slice(11, 16);
            return (
              <div className="flex flex-col bg-emerald-500  w-[20rem]     ">
                {" "}
                {weatherMain === "Clouds" ? (
                  <BsCloudsFill className="text-blue-500" />
                ) : weatherMain === "Clear" ? (
                  <RiSunFill className="text-orange-500" />
                ) : weatherMain === "Rain" ? (
                  <BsFillCloudRainHeavyFill className="text-blue-800" />
                ) : null}
                <p className="text-white">{temp}°</p>
                <p className="text-[1rem] text-white flex flex-row items-center  ">
                  <MdDateRange />
                  {date}
                </p>
                <p className="text-[0.8rem] text-white flex flex-row items-center">
                  <AiOutlineFieldTime />
                  {time}
                </p>
              </div>
            );
          })}
    </div>
  );
}
