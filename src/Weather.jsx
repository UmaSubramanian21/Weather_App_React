// import axios from "axios"
// import { useState } from "react"
// import './index.css'

// // const axios = require('axios')

// function Weather() {
//     const [city, setCity] = useState("")
//     const [type, setType] = useState("")

//     // get values from api

//     const [temp, setTemp] = useState("")
//     const [desc, setDesc] = useState("")
//     const [weather, setWeather] = useState("")

//     var celcius = "°C"
//     // to get the city name from user
//     function handleCity(evt) {
//         setCity(evt.target.value)
//         // setCity("")
//         // console.log(city)
//     }

//     // API call using axios

//     function getAPI() {
//         const data = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=a9f241787286337a94be93e653a870c1`)
//         console.log(data)
//         data.then(
//             function (value) {
//                 console.log(value.data.main.temp)

//                 // to store values of weather,desc,temp from api 
//                 setTemp(Math.round(value.data.main.temp - 273.15))
//                 setWeather(value.data.weather[0].main)
//                 setDesc(value.data.weather[0].description)
//             }
//         )
//             .catch(
//                 function (errmsg) {
//                     console.log("Error fetching weather data:", errmsg)
//                 }
//             )
//     }
//     // backgroudn change fucntion
//     function handleType(weather) {
//         setType(weather)
//         console.log(type)
//     }
//     // to reload the window
//     function handleRefresh() {
//         window.location.reload()
//     }
//     return (
//         <>
//             <div>

//                 {/* weather report */}
//                 <div
//                     className=" p-20 flex flex-col gap-10 justify-center items-center">
//                     <h1 className=" md:text-7xl text-blue-800 font-bold">Weather Report</h1>
//                     <input
//                         type="text"
//                         onChange={handleCity}
//                         className="border border-blue-950 p-1 text-2xl
//                     rounded-md w-72 h-14 bg-transparent outline-none"
//                         placeholder="Enter city name"></input>
//                     <div className="flex gap-5 items-center">
//                         <button
//                             onClick={getAPI}
//                             className="p-2 text-2xl md:text-4xl text-blue-700 bg-blue-300 w-56 rounded-md hover:bg-blue-200">Get weather
//                         </button>
//                         <span
//                             onClick={handleRefresh}
//                             className="cursor-pointer text-2xl ">🔄</span>
//                     </div>
//                     <div className="flex flex-col gap-10 text-2xl ">

//                         <p>Weather : {weather}</p>
//                         <p>Temparature : {temp} {celcius}</p>
//                         <p>Description : {desc}</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Weather

import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";

function Weather() {
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [temp, setTemp] = useState("");
    const [desc, setDesc] = useState("");
    const [weather, setWeather] = useState("");
    const [background, setBackground] = useState("");

    var celcius = "°C";

    function handleCity(evt) {
        setCity(evt.target.value);
    }

    function getAPI() {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a9f241787286337a94be93e653a870c1`)
            .then((value) => {
                setTemp(Math.round(value.data.main.temp - 273.15));
                setWeather(value.data.weather[0].main);
                setDesc(value.data.weather[0].description);
            })
            .catch((errmsg) => {
                console.log("Error fetching weather data:", errmsg);
            });
    }

    function handleRefresh() {
        window.location.reload();
    }

    // Update background image based on weather condition
    useEffect(() => {
        switch (weather.toLowerCase()) {
            case "clear":
                setBackground("url('/images/clear.jpg')");
                break;
            case "clouds":
                setBackground("url('/images/cloudy.jpg')");
                break;
            case "rain":
                setBackground("url('/images/rainy.jpg')");
                break;
            case "snow":
                setBackground("url('/images/snowy.jpg')");
                break;
            case "thunderstorm":
                setBackground("url('/images/thunder.jpg')");
                break;
            default:
                setBackground("url('./images/default.jpg')");
        }
    }, [weather]);

    return (
        <>
            <div
                className="p-20 flex flex-col gap-10 justify-center items-center bg-cover bg-center h-screen"
                style={{ backgroundImage: background }}
            >
                <h1 className="md:text-7xl text-blue-800 font-bold">Weather Report</h1>
                <input
                    type="text"
                    onChange={handleCity}
                    className="border border-blue-950 p-1 text-2xl rounded-md w-72 h-14 bg-transparent outline-none"
                    placeholder="Enter city name"
                />
                <div className="flex gap-5 items-center">
                    <button
                        onClick={getAPI}
                        className="p-2 text-2xl md:text-4xl text-blue-700 bg-blue-300 w-56 rounded-md hover:bg-blue-200"
                    >
                        Get Weather
                    </button>
                    <span onClick={handleRefresh} className="cursor-pointer text-2xl">
                        🔄
                    </span>
                </div>
                <div 
                className="flex flex-col gap-10 text-2xl text-blue-900 font-extrabold bg-transparent">
                    <p>Weather: {weather}</p>
                    <p>Temperature: {temp} {celcius}</p>
                    <p>Description: {desc}</p>
                </div>
            </div>
        </>
    );
}

export default Weather;
