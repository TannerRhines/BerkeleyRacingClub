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
  
      const { age, course, distance } = randomHorse;
      console.log('Age:', age);
      console.log('Course:', course);
      console.log('Distance:', distance);
  
      var HorsestatsHTML = `
        <h3>
          <div>
            <div>
              <div>Name: ${horseName}</div>
              <div>Age: ${age}</div>
              <div>Home Course: ${course}</div>
              <div>Even Length: ${distance}</div>
          </div>
        </h3>`;
  
      $(targetClass).html(HorsestatsHTML);
  
    } catch (error) {
      console.error(error);
    }
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
}

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
}

attachImages();





$("#clearstorage").on("click", function(event) {
localStorage.clear();
console.log("Clearstorage Button clicked!");
});

// click listener works with API, commenting out for now to save API calls

//  $("#CreateFighters").on("click", function(event) {
//   fetchRandomPerson()
//     .then(name => {
//       return fetchRandomHorse(".GenerateStats1", name);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
    
//   fetchRandomPerson()
//     .then(name => {
//       return fetchRandomHorse(".GenerateStats2", name);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
    
//   console.log("Createfighters Button clicked!"); 
// });


$("#ResetBattle").on("click", function(event){
    $(".GenerateStats1").html('');
    $(".GenerateStats2").html('');
console.log("ResetBattle Button clicked!");
});

$("#FightersBattle").on("click", function(event){
    console.log("ResetBattle Button clicked!")  
});

$("#previousfights").on("click", function(event){
console.log("Previousfight button clicked!")
});