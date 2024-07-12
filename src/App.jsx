import { useState, useEffect } from "react";
import Search from "./Components/Search/Search";
import CurrentWeather from "./Components/CurrentWeather";
import Forecast from "./Components/Forecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api";
import { TiWeatherSunny } from "react-icons/ti";
import { motion } from "framer-motion";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = (lat, lon, cityLabel) => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const currentForecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, currentForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: cityLabel, ...weatherResponse });
        setForecast({ city: cityLabel, ...forecastResponse });
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data");
      });
  };

  useEffect(() => {
    // Fetch weather data for Dubai on initial load
    const srinagarLat = "34.083656"; // Dubai latitude
    const srinagarLon = "74.797371"; // Dubai longitude
    fetchWeatherData(srinagarLat, srinagarLon, "Srinagar");
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon, searchData.label);
  };

  return (
    <div className=" bg-gradient-to-b from-slate-200 via-indigo-300 to-yellow-200">
      <header className="flex flex-col sm:flex-row sm:justify-between items-center backdrop-blur-md h-fit md:py-5 mb-24 fixed top-0 w-full sm:px-4">
        <div className="text-xl font-semibold text-orange-600 font-mono md:bg-black md:rounded-b-md md:shadow-emerald-400 md:shadow-lg scale-90 scale-y-90">
          <TiWeatherSunny className="text-3xl font-bold  text-emerald-400 mx-auto  hover:animate-spin" />
          <span>Weather</span>
          <span className="font-bold font-serif bg-gradient-to-r from-slate-700 via-blue-400 to-orange-500 bg-clip-text text-transparent">
            Sphere
          </span>
        </div>
        <Search onSearchChange={handleOnSearchChange} />
      </header>

      <div className="flex flex-col md:flex-row mx-2 gap-x-2 mt-10">
        {error && <p className="text-red-500">{error}</p>}

        <motion.p
          className="w-2/3 m-auto text-center font-bold mt-16 md:m-auto text-transparent bg-clip-text bg-gradient-to-r from-black via-orange-400 to-blue-700"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to{" "}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 font-mono text-xl"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Weather
          </motion.span>
          <motion.span
            className="bg-gradient-to-r from-slate-700 via-blue-400 to-orange-500 bg-clip-text text-transparent font-bold font-serif text-2xl border-b-2 border-orange-400"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            Sphere
          </motion.span>
          <br /> Your go-to app for real-time weather updates, forecasts, and
          more. Whether you’re planning a trip, checking the daily commute, or
          simply curious about the weather, we’ve got you covered. Stay
          informed, stay prepared, and stay{" "}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 font-mono text-xl"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            Weather
          </motion.span>
          <motion.span
            className="bg-gradient-to-r from-slate-700 via-blue-400 to-orange-500 bg-clip-text text-transparent font-bold font-serif text-2xl border-b-2 border-orange-400"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
          >
            Sphere
          </motion.span>
          <motion.hr
            className="mt-4 border border-orange-500 w-2/3 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "66%" }}
            transition={{ delay: 2.5, duration: 1 }}
          />
        </motion.p>
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
      <motion.hr
        className="mt-4 bg-yellow-200 rounded-full h-1 w-2/3 mx-auto"
        initial={{ width: 0 }}
        animate={{ width: "66%" }}
        transition={{ delay: 3.5, duration: 1 }}
      />
      <div className=" mt-10">
        {error && <p className="text-red-500">{error}</p>}

        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
