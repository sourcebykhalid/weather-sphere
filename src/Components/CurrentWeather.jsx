import React, { useState, useEffect } from "react";
import {
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
} from "react-icons/ti";
import "react-accessible-accordion/dist/fancy-example.css";
import { motion } from "framer-motion";
import {
  FaArrowsUpDown,
  FaCloudRain,
  FaClover,
  FaHeart,
  FaLocationDot,
  FaTemperatureHalf,
  FaWater,
  FaWind,
} from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { GiSunrise, GiSunset } from "react-icons/gi";

const CurrentWeather = ({ data }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage when the component mounts
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const getWeatherIcon = (description) => {
    switch (description) {
      case "clear sky":
        return <TiWeatherSunny className="text-5xl text-yellow-500" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <TiWeatherCloudy className="text-5xl text-gray-500" />;
      case "shower rain":
      case "rain":
        return <TiWeatherShower className="text-5xl text-blue-500" />;
      case "thunderstorm":
        return <TiWeatherStormy className="text-5xl text-purple-500" />;
      case "snow":
        return <TiWeatherSnow className="text-5xl text-white" />;
      default:
        return <TiWeatherSunny className="text-5xl text-yellow-500" />;
    }
  };

  const toggleFavorite = (city) => {
    const updatedFavorites = favorites.includes(city)
      ? favorites.filter((fav) => fav !== city)
      : [...favorites, city];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (city) => favorites.includes(city);

  const convertKelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

  const formatDate = (date) => {
    return date.toLocaleString([], {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };
  const weatherDetails = [
    {
      label: "Feels like",
      value: `${convertKelvinToCelsius(data.main.feels_like)}°C`,
      icon: <FaTemperatureHalf />,
    },
    {
      label: "Humidity",
      value: `${data.main.humidity}%`,
      icon: <WiHumidity />,
    },
    {
      label: "Pressure",
      value: `${data.main.pressure} hPa`,
      icon: <FaArrowsUpDown />,
    },
    {
      label: "Wind",
      value: `${data.wind.speed} m/s`,
      icon: <FaWind />,
    },
    {
      label: "Sunrise",
      value: formatTime(data.sys.sunrise),
      icon: <GiSunrise />,
    },

    {
      label: "Sunset",
      value: formatTime(data.sys.sunset),
      icon: <GiSunset />,
    },
    {
      label: "Clouds",
      value: `${data.clouds.all} oktas`,
      icon: <FaCloudRain />,
    },
  ];
  return (
    <div className=" flex flex-col md:w-1/2 mt-16">
      <div
        className={`flex flex-col items-center md:items-start  p-4 rounded-md shadow-black shadow-md w-full gap-y-6  ${
          isFavorite(data.city) ? "bg-yellow-100" : " bg-teal-100"
        }`}
      >
        <div className="text-2xl font-semibold flex justify-between items-center w-full space-x-2">
          <span className="flex justify-center items-center">
            <FaLocationDot
              className={` ${
                isFavorite(data.city) ? "text-green-800" : " text-green-400"
              }`}
            />
            {data.city}
          </span>
          <p className="text-sm text-gray-500">{formatDate(new Date())}</p>
          <CiStar
            className={`cursor-pointer hover:bg-orange-500 rounded-full ${
              isFavorite(data.city)
                ? "bg-orange-500 rounded-full"
                : "text-gray-500"
            }`}
            onClick={() => toggleFavorite(data.city)}
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-lg text-gray-500">{data.weather[0].description}</p>
          <p className="text-5xl text-gray-500 hover:scale-105">
            {" "}
            {getWeatherIcon(data.weather[0].description)}
          </p>
        </div>
        <p className=" text-7xl font-serif font-bold text-slate-800">
          {" "}
          {convertKelvinToCelsius(data.main.temp)}°C
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 ">
          {weatherDetails.map((detail, index) => (
            <motion.div
              key={index}
              className="flex flex-col w-24 h-24 p-2 justify-around items-center bg-black rounded-md shadow-md shadow-orange-700 text-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="font-semibold">{detail.label}</p>
              <p className="text-slate-400">{detail.value}</p>
              {detail.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
