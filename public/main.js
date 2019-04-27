/*
  Here is a guide for the steps you could take:
*/
console.log("talking");
// 1. First select and store the elements you'll be working with
let searchIn = document.getElementById("search_field");
let submit = document.getElementById('submit_button');
let searchform = document.getElementById("search-form");
let searchResults;

let player = document.getElementById('music-player');
//console.log("what's in search?:", search);


// 2. Create your `onSubmit` event for getting the user's search term

submit.addEventListener('click', goSearch);
searchIn.addEventListener('keypress',goSearch);



//
function goSearch() {
  let searchQuery = searchIn.value;
  //console.log(searchQuery);

  // 3. Create your `fetch` request that is called after a submission

    fetch('https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=' + searchQuery )
    .then(
      function (response) {

        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        } else {
          response.json().then(function (data) {
            //console.log(searchResults);
            for (let i = 0; i < data.length; i++) {
              console.log("show each title:", data[i].title);
              let markup = `
              <style>
              .box{
                background: #E0EAFC;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                }

                .media{
                  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);

                    border-radius: 10px 10px 10px 10px;
                    -moz-border-radius: 10px 10px 10px 10px;
                    -webkit-border-radius: 10px 10px 10px 10px;
                    border: 0px solid #000000;

                    .rounded{
                      
                    }
                }
                </style>

              <div class="columns is-gapless">
                  <div class="column">
                  <div class="box">
                    <article class="media">
                      <div class="media-left">

                        <img class= "rounded";  >
                          <img class="${data[i].stream_url}?client_id=8538a1744a7fdaa59981232897501e04" src="${data[i].user.avatar_url}" >
                        </img>
                       </div>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>${data[i].user.username}</strong> <small>click sobre la foto</small> <small></small>
                            <br>
                            
                            <br>
                            ${data[i].title}
                          </p>
                        </div>
                        
                      </div>
                     </div> `
              document.getElementById("results").innerHTML += markup;
              document.getElementById('music-player').innerHTML += markup;
            }
          });
        }
      })
  document.getElementById("results").innerHTML = "" //this clears the page for the next search
}

document.getElementById("results").addEventListener("click", function(e) {
  if (e.target && e.target.nodeName == "IMG") {
    let url = e.target.className;
    player.removeAttribute("src");
    player.setAttribute("src", url);
    player.play();
    


    let playerSource = player.src;
    console.log(playerSource);
  }
});







