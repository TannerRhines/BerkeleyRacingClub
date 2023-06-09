async function fetchRandomHorse() {
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
              <div>${age}</div>
              <div>${course}</div>
              <div>${distance}</div>
          </div>
        </h3>`;
  
      $(".GenerateStats").html(HorsestatsHTML);
  
    } catch (error) {
      console.error(error);
    }
  }













$("#clearstorage").on("click", function(event) {
localStorage.clear();
console.log("Clearstorage Button clicked!");
});

$("#CreateFighters").on("click", function(event) {
fetchRandomHorse()
console.log("Createfighters Button clicked!"); 
});

$("#ResetBattle").on("click", function(event){
    $(".GenerateStats").html('')
console.log("ResetBattle Button clicked!");
});

$("#FightersBattle").on("click", function(event){
    console.log("ResetBattle Button clicked!")  
});

$("#previousfights").on("click", function(event){
console.log("Previousfight button clicked!")
});