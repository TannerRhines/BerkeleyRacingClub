async function fetchRandomHorse(targetClass, horseName) {
    const url = 'https://horse-racing-usa.p.rapidapi.com/results?date=2021-03-18';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd2eeb2e5e5msh326a9c42c5a980dp149abfjsnffe7aa302f90',
        'X-RapidAPI-Host': 'horse-racing-usa.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      // Generate a random index within the range of horses in API
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomHorse = data[randomIndex];
  
      const { course, distance } = randomHorse;
      // age conversion function turns "age" into a number we can use to compare horses
      let age = randomHorse.age;
      age = ageConversion(age); 
      let convertedDistance = distanceConversion(distance);

      console.log('Age:', age);
      console.log('Course:', course);
      console.log('Distance:', distance);
  
      var HorsestatsHTML = `
  <h3>
    <div>
      <div>
        <div>Name: ${horseName}</div>
        <div id='age-result'>Age: ${age % 1 !== 0 ? age.toFixed(1) : Math.floor(age)}yo</div>
        <div>Home Course: ${course}</div>
        <div id='distance-result'>Event Length: ${convertedDistance} miles</div>
      </div>
    </div>
  </h3>`;

  
      $(targetClass).html(HorsestatsHTML);
  
    } catch (error) {
      console.error(error);
    }
  };

  // converts age string into a number, removes the "yo" and "yo+", turns "yo+" into .5, so 3yo+ = 3.5

  function ageConversion(ageString) {
    let ageValue;
    if (ageString.includes('+')) {
        ageValue = parseFloat(ageString.replace('yo+', '')) + 0.5;
    } else {
        ageValue = parseFloat(ageString.replace('yo', ''));
    }
    return ageValue;
}

function distanceConversion(distanceString) {
  const yardToMiles = 1 / 1760;
  const furlongToMiles = 1 / 8;
  let distanceInMiles;

  // check for the various formats
  if (distanceString.includes('furlong')) {
    let furlongValue = parseFloat(distanceString.replace('furlongs', '').replace('furlong', ''));
    distanceInMiles = furlongValue * furlongToMiles;
  } else if (distanceString.includes('mile') && distanceString.includes('yard')) {
    let [miles, yards] = distanceString.split(' ');
    miles = parseFloat(miles.replace('mile', ''));
    yards = parseFloat(yards.replace('yards', '')) * yardToMiles;
    distanceInMiles = miles + yards;
  } else if (distanceString.includes('mile')) {
    distanceInMiles = parseFloat(distanceString.replace('miles', '').replace('mile', ''));
  }

  // rounding to the nearest hundredth
  return Math.round(distanceInMiles * 100) / 100;
}


async function fetchRandomPerson() {
    try {
      const peopleResponse = await fetch('https://swapi.dev/api/people/');
      const peopleData = await peopleResponse.json();
      const totalPeople = peopleData.count;
      const randomPersonId = Math.floor(Math.random() * totalPeople) + 1;

      // use backticks (`) and ${} to interpolate the variable
      const personResponse = await fetch(`https://swapi.dev/api/people/${randomPersonId}/`);
      const personData = await personResponse.json();
      return personData.name;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};

// fetchRandomPerson()
//   .then(data => {
//     console.log(data.name);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


function attachImages () {
  var image1container = $('#image-1');
  var image2container = $('#image-2');

  var image1 = $('<img>');
  var image2 = $('<img>');

  image1.attr('src', './assets/images/horse2.png');
  image2.attr('src', './assets/images/horse7.png' );

  image1container.append(image1);
  image2container.append(image2);

  image1.addClass('grow');
  image2.addClass('grow');

  // I'm using the below method to flip image 2 horizontally. If we can upload ~10 images of the horses all facing the same way then when we flip image 2 it will look like they're facing off head to head

  image2container[0].style.transform = 'scaleX(-1)';
}

attachImages();


// Now need a function that will return the winner. Logic as follows:

// take age, determine absolute value from 3.5, take distance, take determine absolute value from 1.25 miles, add numbers together, whichever horse has lowest number wins


$("#clearstorage").on("click", function(event) {
localStorage.clear();
console.log("Clearstorage Button clicked!");
});

// click listener works with API, commenting out for now to save API calls

 $("#CreateFighters").on("click", function(event) {
  fetchRandomPerson()
    .then(name => {
      return fetchRandomHorse(".GenerateStats1", name);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  fetchRandomPerson()
    .then(name => {
      return fetchRandomHorse(".GenerateStats2", name);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  console.log("Createfighters Button clicked!"); 
});


$("#ResetBattle").on("click", function(event){
    $(".GenerateStats1").html('');
    $(".GenerateStats2").html('');
console.log("ResetBattle Button clicked!");
});

$("#FightersBattle").on("click", function(event){
  console.log("ResetBattle Button clicked!")  
  $('body').addClass('darken');
  $('#image-1 img').addClass('battle1');
  $('#image-2 img').addClass('battle2');
  
  setTimeout(function() {
    $('body').removeClass('darken');
    $('#image-1 img').removeClass('battle1');
    $('#image-2 img').removeClass('battle2');
  }, 2000);  // The duration of the animations in milliseconds
});

$("#previousfights").on("click", function(event){
console.log("Previousfight button clicked!")
});