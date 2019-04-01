const app = {
  buttons: ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird",
    "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab",
    "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"],

  showButtons: function () {
    // let buttonDiv = "#buttons";
    $("#buttons").empty();
    this.buttons.forEach(element => {
      let newButton = `<button class="btn btn-success m-2">${element}</button>`;
      $("#buttons").append(newButton);
    })
  },

  showGiphy: function (searchName) {
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchName}&api_key=PuuPQsrsjng1r0I7cuzVFmsS7K86krrj&limit=12`;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(response => {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var gifDiv = 
            `<div class="col-md-4">
              <p>Rating: ${results[i].rating}</p>
              <img src="${results[i].images.fixed_height.url}"
            </div>`
          $("#gifDiv").prepend(gifDiv);
          if ((i + 1) % 3 === 0) {
            console.log(i);
            $("#gifDiv").prepend(`<div class="d-none d-md-block w-100 my-3"></div>`)
          }
        }
      })
  }
}

$(document).on("click", "button", event => {app.showGiphy(event.target.textContent)})
app.showButtons();