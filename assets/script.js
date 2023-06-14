let horse1Data = {};
let horse2Data = {};

//conditional statement to check if winners array has anything if it does, adds it to the array if not, makes empty array

let winners;
if (localStorage.getItem("winners")){
  winners= JSON.parse(localStorage.getItem("winners"))
}else {
  winners = [];
}

async function fetchRandomHorse(targetClass, horseName, horseData) {
    const url = 'https://horse-racing-usa.p.rapidapi.com/results?date=2021-03-18';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd2eeb2e5e5msh326a9c42c5a980dp149abfjsnffe7aa302f90',
        'X-RapidAPI-Host': 'horse-racing-usa.p.rapidapi.com'
      }
    };

let age;
let convertedDistance;

try {
  const response = await fetch(url, options);
  const data = await response.json();

  // Generate a random index within the range of horses in API
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomHorse = data[randomIndex];

  const { course, distance } = randomHorse;
  // age conversion function turns "age" into a number we can use to compare horses
  age = randomHorse.age;
  age = ageConversion(age); 
  convertedDistance = distanceConversion(distance);

  console.log('Age:', age);
  console.log('Course:', course);
  console.log('Distance:', distance);
  
      var HorsestatsHTML = `
  <h3>
    <div>
      <div>
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

    horseData.age = age;
    horseData.convertedDistance = convertedDistance;
    horseData.name = horseName;
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

// converts furlongs, X miles Y yards into miles, returns value as XYZ miles

function distanceConversion(distanceString) {
  const yardToMiles = 1 / 1760;
  const furlongToMiles = 1 / 8;
  let distanceInMiles;

  // check for the various formats

  // if api returns furlongs
  if (distanceString.includes('furlong')) {
    let furlongValue = parseFloat(distanceString.replace('furlongs', '').replace('furlong', ''));
    distanceInMiles = furlongValue * furlongToMiles;
  } 
  
  // if API returns miles + yards
  else if (distanceString.includes('mile') && distanceString.includes('yard')) {
    let [miles, yards] = distanceString.split(' ');
    miles = parseFloat(miles.replace('mile', ''));
    yards = parseFloat(yards.replace('yards', '')) * yardToMiles;
    distanceInMiles = miles + yards;
  } else if 
  
  // if API returns miles
  (distanceString.includes('mile')) {
    distanceInMiles = parseFloat(distanceString.replace('miles', '').replace('mile', ''));
  }

  // rounding to the nearest hundredth
  return Math.round(distanceInMiles * 100) / 100;
};

// determines which horse won the race

function horseBattle() {
  var raceValueHorse1 = Math.abs(horse1Data.age - 3.5) + Math.abs(horse1Data.convertedDistance - 1.25);
  var raceValueHorse2 = Math.abs(horse2Data.age - 3.5) + Math.abs(horse2Data.convertedDistance - 1.25);

  if (raceValueHorse1 < raceValueHorse2) {
    var winner = horse1Data.name;
    console.log("Horse 1 wins!");
    $('#race-results').text(horse1Data.name + " wins!");
  } else if (raceValueHorse2 < raceValueHorse1) {
    var winner = horse2Data.name;
    console.log("Horse 2 wins!");
    $('#race-results').text(horse2Data.name + " wins!");
  } else {
    var winner = "It's a tie!";
    console.log("It's a tie!");
    $('#race-results').text("It's a tie!");
  }
  winners.push(winner);
  localStorage.setItem("winners", JSON.stringify(winners));
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


function attachImages() {
  var imagePaths = [
    './assets/images/horse2.png',
    './assets/images/horse3.png',
    './assets/images/horse6.png',
    './assets/images/horse7.png',
    './assets/images/horse8.png',
    './assets/images/horse9.png',
    './assets/images/horse10.png',
    './assets/images/horse11.png',
  ];

  // Randomly select two unique indices
  var randomIndex1 = getRandomIndex(imagePaths.length);
  var randomIndex2 = getRandomIndex(imagePaths.length, [randomIndex1]);

  // Get references to the image containers
  var image1container = $('#image-1');
  var image2container = $('#image-2');

  // Create image elements and set their sources
  var image1 = $('<img>');
  var image2 = $('<img>');
  image1.attr('src', imagePaths[randomIndex1]);
  image2.attr('src', imagePaths[randomIndex2]);

  // Append images to their respective containers
  image1container.append(image1);
  image2container.append(image2);

  // Add CSS class to apply styling
  image1.addClass('grow');
  image2.addClass('grow');

  // Flip image 2 horizontally
  image2container[0].style.transform = 'scaleX(-1)';
}

// Helper function to get a random index from the given length,
// excluding any indices in the exclude array (optional)
function getRandomIndex(length, exclude = []) {
  var index;
  do {
    index = Math.floor(Math.random() * length);
  } while (exclude.includes(index));
  return index;
}

attachImages();


// Now need a function that will return the winner. Logic as follows:

// take age, determine absolute value from 3.5, take distance, take determine absolute value from 1.25 miles, add numbers together, whichever horse has lowest number wins




$("#clearstorage").on("click", function(event) {
localStorage.clear();
console.log("Clearstorage Button clicked!");
});

// Create! button calls the fetchRandomPerson and fetchRandomHorse APIs, stores their race stats to horse1data and horse2data, then horseBattl(); uses a promise to wait for the APIs to finish pulling in the data, then determines which horse wins before Battle! button is clicked

$("#CreateFighters").on("click", function(event) {
  let horse1Promise = fetchRandomPerson()
    .then(name => {
      return fetchRandomHorse("#Horse-1", name, horse1Data);
    })
    .then(() => {
      $('#Horse-1-name').text(horse1Data.name);
    })
    .then(() => {
      console.log('Horse 1 data:', horse1Data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  let horse2Promise = fetchRandomPerson()
    .then(name => {
      return fetchRandomHorse("#Horse-2", name, horse2Data);
    })
    .then(() => {
      $('#Horse-2-name').text(horse2Data.name);
    })
    .then(() => {
      console.log('Horse 2 data:', horse2Data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  Promise.all([horse1Promise, horse2Promise])
    .then(() => {
      horseBattle();
    });

  console.log("Createfighters Button clicked!"); 
});





$("#ResetBattle").on("click", function(event){
    $(".Horse-1").html('');
    $(".Horse-2").html('');
    $('#Horse-1-name').text('');
    $('#Horse-2-name').text('');
    $("#race-results").html('');
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

  setTimeout(function() {
    $('#race-results').removeClass('hidden');
  }, 2500)
});


$("#previousfights").on("click", function(event) {
  var previousWinner = localStorage.getItem("winner");
  $("#previous-fighters").text("Previous Winner: " + previousWinner);
  
  console.log("Previousfight button clicked!");
  for (var i = 0; i < winners.length; i++) {
    var winner = winners[i];
    localStorage.getItem("winner" + i, winner);
  }
});
