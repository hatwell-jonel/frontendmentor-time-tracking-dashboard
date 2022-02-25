const DATA_URL = "https://raw.githubusercontent.com/hatwell-jonel/frontendmentor-time-tracking-dashboard/main/data.json";
const API_RANDOM_USER = "https://randomuser.me/api/";

const timeframesBtn = document.querySelectorAll(".btn-check");
const currentHrs = document.querySelectorAll(".number-hrs");
const prevHrs = document.querySelectorAll(".history-hour");
const fullnameEl = document.querySelector(".name");
const imgEl = document.querySelector(".profile-user__img")


document.addEventListener("DOMContentLoaded", () =>{
  // DATA
  timeframesBtn.forEach((btn) => {
    if(btn.checked){
        weeklyData();
    }
    btn.addEventListener("click", (e) => {
      let id = btn.dataset.id;
      if(id === "daily"){
        dailyData();
      }
      
      else if(id === "weekly"){
        weeklyData();
      }
      
      else if(id === "monthly"){
        monthlyData();
      }
    })
  })

  // RANDOM USER 
  const getRandomUser = () => {
    fetch(API_RANDOM_USER)
    .then(res => res.json())
    .then(data => {
      let {name, picture} = data.results[0];
      userProfile(picture, name);
    });
  }

  getRandomUser();

})

const dailyData = () => {
  fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    currentHrs.forEach((e,i) => {
      currentHrs[i].innerHTML = data[i].timeframes.daily.current;
      prevHrs[i].innerHTML = `Last Day - ${data[i].timeframes.daily.previous} hrs `;
    })
  });
}

const weeklyData = () => {
  fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    currentHrs.forEach((curVal,index) => {
      currentHrs[index].innerHTML = data[index].timeframes.weekly.current;
    })
    prevHrs.forEach( (curVal, index) => {
      prevHrs[index].innerHTML = `Last Week - ${data[index].timeframes.weekly.previous} hrs `;
    })
  });
}

const monthlyData = () => {
  fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    currentHrs.forEach((e,i) => {
      currentHrs[i].innerHTML = data[i].timeframes.monthly.current;
      prevHrs[i].innerHTML = `Last Month - ${data[i].timeframes.monthly.previous} hrs `;
    })
  });
}

const userProfile = (picture,name) => {
  let pictureEl = `
    <img src="${picture.large}" class="img-fluid user-img" alt="profile picture">`;
  imgEl.innerHTML = pictureEl;
  fullnameEl.innerHTML = `${name.first} ${name.last}`;
}




