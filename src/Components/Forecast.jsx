import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import {
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
} from "react-icons/ti";
import "react-accessible-accordion/dist/fancy-example.css"; // Import the CSS for the accordion
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const convertKelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

  const getWeatherIcon = (description) => {
    switch (description) {
      case "clear sky":
        return <TiWeatherSunny className="text-3xl text-yellow-500" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return <TiWeatherCloudy className="text-3xl text-gray-500" />;
      case "shower rain":
      case "rain":
      case "light rain":
      case "moderate rain":
      case "heavy rain":
        return <TiWeatherShower className="text-3xl text-blue-500" />;
      case "thunderstorm":
        return <TiWeatherStormy className="text-3xl text-purple-500" />;
      case "snow":
        return <TiWeatherSnow className="text-3xl text-white" />;
      default:
        return <TiWeatherSunny className="text-3xl text-yellow-500" />;
    }
  };

  return (
    <Reveal>
      <div className="mt-28 md:w-full">
        <label className="block font-bold mb-2 text-2xl md:text-4xl text-gray-800 bg-indigo-500 w-fit p-2 rounded-r-full bg-gradient-to-r from-slate-700 via-blue-400 to-orange-500 bg-clip-text text-transparent mx-auto border-t-2 border-orange-500">
          Weekly Forecast
        </label>
        <Accordion
          allowZeroExpanded
          className="grid md:grid-cols-4 gap-3 w-full"
        >
          {data.list.slice(0, 7).map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton className="rounded-md cursor-pointer hover:border-b-orange-500 sm:hover:border-b-4">
                  <Reveal>
                    <motion.div
                      className="flex flex-col mx-4 rounded-b-md items-center justify-between bg-neutral-100 hover:bg-orange-200 py-8  shadow-emerald-800 shadow-inner border-b border-gray-300 mb-4  cursor-pointer hover:transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {getWeatherIcon(item.weather[0].description)}
                      <label className="font-medium">{forecastDays[idx]}</label>
                      <label className="text-gray-500">
                        {item.weather[0].description}
                      </label>
                      <label className="font-medium flex justify-center items-center gap-x-1">
                        {convertKelvinToCelsius(item.main.temp_max)}°C
                        <FaArrowUp className="text-green-400" /> |{" "}
                        {convertKelvinToCelsius(item.main.temp_min)}°C
                        <FaArrowDown className="text-orange-400" />
                      </label>
                    </motion.div>
                  </Reveal>
                </AccordionItemButton>
              </AccordionItemHeading>

              <AccordionItemPanel>
                <motion.div
                  className="p-8 max-w-screen-md overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md px-18"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <div className="flex justify-between items-center font-semibold">
                    <label>Pressure</label>
                    <label>{item.main.pressure} hPa</label>
                  </div>
                  <hr className="text-gray-500 py-2 w-full" />
                  <div className="flex justify-between items-center font-semibold">
                    <label>Humidity</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <hr className="text-gray-500 py-2 w-full" />
                  <div className="flex justify-between items-center font-semibold">
                    <label>Clouds</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <hr className="text-gray-500 py-2 w-full" />
                  <div className="flex justify-between items-center font-semibold">
                    <label>Wind speed</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <hr className="text-gray-500 py-2 w-full" />
                  <div className="flex justify-between items-center font-semibold">
                    <label>Sea level</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <hr className="text-gray-500 py-2 w-full" />
                  <div className="flex justify-between items-center font-semibold">
                    <label>Feels like:</label>
                    <label>
                      {convertKelvinToCelsius(item.main.feels_like)}°C
                    </label>
                  </div>
                </motion.div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Reveal>
  );
};

export default Forecast;
