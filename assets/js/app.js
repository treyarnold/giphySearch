const app = {
  buttons: ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird",
    "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab",
    "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"],

  showButtons: function () {
    // let buttonDiv = "#buttons";
    $("#buttons").empty();
    this.buttons.forEach(element => {
      let newButton = `<button class="btn btn-info m-2 gifSearchButton">${element}</button>`;
      $("#buttons").append(newButton);
    })
  },

  gifAnimateHandler: function (event) {
    console.log(this);
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
              <img class="gif" src="${results[i].images.fixed_height_still.url}" 
                dataStill="${results[i].images.fixed_height_still.url}"
                dataAnimate="${results[i].images.fixed_height.url}" state="still"
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

$(document).on("click", ".gifSearchButton", event => {app.showGiphy(event.target.textContent)});
$(document).on("click", ".gif", function() {
  console.log("gif clicked");
  let state = $(this).attr("state");
  if (state === "still") {
    let src = $(this).attr("dataAnimate");
    $(this).attr("src", src);
    $(this).attr("state", "animate");
  } else {
    let src = $(this).attr("dataStill");
    $(this).attr("src", src);
    $(this).attr("state", "still");
  }
});
$(document).ready(function() {
  app.showButtons();
  $("#newButton").on("click", event => {
    event.preventDefault();
    app.buttons.push($("#buttonInput").val());
    app.showButtons();
  })
})