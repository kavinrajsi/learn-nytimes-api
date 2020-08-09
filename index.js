const baseURI = "http://api.nytimes.com/svc/topstories/v2";

class TheTimes {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  home(callback) {
    this.apiRequest("home", callback);
  }

  world(callback) {
    this.apiRequest("world", callback);
  }

  arts(callback) {
    this.apiRequest("arts", callback);
  }

  automobiles(callback) {
    this.apiRequest("automobiles", callback);
  }

  books(callback) {
    this.apiRequest("books", callback);
  }

  business(callback) {
    this.apiRequest("business", callback);
  }

  fashion(callback) {
    this.apiRequest("fashion", callback);
  }

  food(callback) {
    this.apiRequest("food", callback);
  }

  health(callback) {
    this.apiRequest("health", callback);
  }

  insider(callback) {
    this.apiRequest("insider", callback);
  }

  magazine(callback) {
    this.apiRequest("magazine", callback);
  }

  movies(callback) {
    this.apiRequest("movies", callback);
  }

  nyregion(callback) {
    this.apiRequest("nyregion", callback);
  }

  obituaries(callback) {
    this.apiRequest("obituaries", callback);
  }

  opinion(callback) {
    this.apiRequest("opinion", callback);
  }

  politics(callback) {
    this.apiRequest("politics", callback);
  }

  apiRequest(section, callback) {
    const url = `${baseURI}/${section}.json?api-key=${this.apiKey}`;
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
    };
    fetch(url, options).then(
        response => {
          if (response.ok) {
            return response.text();
          }
          return response.text().then(err => {
            return Promise.reject({
              status: response.status,
              statusText: response.statusText,
              errorMessage: err,
            });
          });
        })
      .then(data => {
        callback(JSON.parse(data));
      })
      .catch(err => {
        console.error(err);
      });
  }
}

const times = new TheTimes("nb0OnMcg0bUIf9Pp1txqFDIKV6Id04Gx");

times.home(function (data) {
  console.log('outer : ' + data);

  let htmlData, sectionData = '',
    sectionList = [];

  for (i = 0; i < data.num_results; i++) {
    sectionList.push(data.results[i].section);
  }
  sectionData = sectionList.filter((item, index) => sectionList.indexOf(item) === index);


  htmlData = `<nav class="nav d-flex justify-content-between">`;
  sectionData.forEach((element, index) => {
    htmlData += `<section>
    <a class="heading-2 text-muted" href="./${element}.html"> ${element} </a> <br>
    <div class="container p-0"><div class="row">`;
    console.log(data.results);

    for (i = 0; i < data.num_results; i++) {
      if (data.results[i].section === element) {
        const {
          title,
          subsection,
          abstract,
          byline,
          created_date,
          short_url,
          item_type,
          multimedia
        } = data.results[i];
        let mediaURL;
        for (j = 0; j < multimedia.length; j++) {
          if (multimedia[j].format === 'superJumbo') {
            mediaURL = multimedia[j].url;
          }
        }
        htmlData += `
    <div class="col-md-4">
    <img src="${mediaURL}" class="img-fluid">
    <p class="font-italic">${title}</p>
    <p class="lead my-3">${abstract}</p>
    <p class="lead mb-0"><a href="${short_url}" class="text-white font-weight-bold">Continue reading...</a></p>
  </div>`;
        // document.querySelector('#homePage .jumbotron').innerHTML += feature;
        // console.log(`${abstract}`);
        // console.log(`${title}`);
        // console.log(`${subsection}`);
        // console.log(`${byline}`);
        // console.log(`${moment(created_date).format("MMM Do")}`);
        // console.log(`${short_url}`);
        // console.log(`${item_type}`);
        // console.log(`${mediaURL}`);
      }
    }
    htmlData += `
    </div>
    </div>
    <br>
    <hr>
    <br>
    </section>`;
  });
  htmlData += `</nav>`;
  document.querySelector('#main').innerHTML += htmlData;
});