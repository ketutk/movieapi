// Using ajax
// $('.search-btn').on('click',function(){

//     $.ajax({
//         url:'http://www.omdbapi.com/?apikey=9fd11ba7&s='+ $('.input-keyword').val(),
//         success:results=>{
//             const movies = results.Search;
//             const search = document.querySelector('.searcher');
//             let penampung ='';
//             movies.forEach(m => {
//                 penampung += showCard(m);
//             });
//             $(search).html(penampung);

//             // Tombol detail diklik
//             $('.btn-detail-modal').on('click', function(){
//                 $.ajax({
//                     url:'http://www.omdbapi.com/?apikey=9fd11ba7&i='+$(this).data('imdbid'),
//                     success: m =>{
//                         const movieDetail = showDetail(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: ()=>{
//                         console.log(e.responseText);
//                     }
//                 })
//             })
//         },
//         error:()=>{
//             console.log(e.responseText);
//         }
//     });
// });

// Using Fetch ================================
// const searchButton = document.querySelector('.search-btn');

// searchButton.addEventListener('click',function(){

//     const searchMovies = document.querySelector('.input-keyword');

//     fetch('http://www.omdbapi.com/?apikey=9fd11ba7&s='+searchMovies.value)
//      .then(response => response.json())
//      .then(response => {
//         const movies = response.Search;
//         const search = document.querySelector('.searcher');
//         let cards = '';
//         movies.forEach(m => cards+=showCard(m));
//         search.innerHTML = cards;

//         // Ketika btn Detail diklik

//         const modalDetailModal = document.querySelectorAll('.btn-detail-modal');
//         modalDetailModal.forEach(btn => {
//             btn.addEventListener('click', function(){
//                 const imdbid = this.dataset.imdbid;

//                 fetch('http://www.omdbapi.com/?apikey=9fd11ba7&i='+imdbid)
//                  .then(response => response.json())
//                  .then(m => {
//                     const movieDetail = showDetail(m);
//                     const modalBody = document.querySelector('.modal-body');
//                     modalBody.innerHTML=movieDetail;
//                  })
//             })
//         })
//      });
// });

// Using Fetch (REFACTOR) =================================
const searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=9fd11ba7&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  const search = document.querySelector(".searcher");
  let cards = "";
  movies.forEach((m) => (cards += showCard(m)));
  search.innerHTML = cards;
}

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("btn-detail-modal")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=9fd11ba7&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showCard(m) {
  return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary btn-detail-modal" data-toggle="modal" data-target="#movieDetailModal" data-imdbID="${m.imdbID}">About Movie</a>
                    </div>
                </div>
            </div>`;
}
function showDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" alt="" srcset="" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><H4>${m.Title}</H4></li>
                            <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writers :</strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot :</strong><br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
