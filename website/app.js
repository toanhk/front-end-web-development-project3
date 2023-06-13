/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "a0db832b01aa92ca7cc5afa5b8b86cf9&units=imperial";

const urlServer = "http://localhost:3000";

const zipCode = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const btnGenerate = document.querySelector("#generate");

const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

btnGenerate.addEventListener("click", function () {
  getTempByZipCode(baseURL, zipCode.value, apiKey).then(function (data) {
    //console.log(data);
    postData(`${urlServer}/add`, {
      temp: data.main.temp,
      feeling: feelings.value,
      date: newDate,
    });
    updateUI();
  });
});

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//get data from https://openweathermap.org/
const getTempByZipCode = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(`${baseURL}?zip=${zipCode},us&appid=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch(`${urlServer}/all`, { method: "GET" });
  try {
    const data = await request.json();
    console.log(data, "hello");
    temp.innerHTML = Math.round(data.temp) + "" + "degrees";
    content.innerHTML = data.content;
    date.innerHTML = data.date;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
