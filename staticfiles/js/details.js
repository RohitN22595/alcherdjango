const getdata = async ()=>{
    const responce = await fetch('/get-data/');
    const data = await responce.json();
    console.log('in details',data);
    detailsdata(data);
    searchmovie(data);
    searchbutton(data);
}
getdata();


function scrollButton(){

    const row = document.querySelector('.castItem');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');

    const scrollAmount = 500; // customize this based on your design

    leftArrow.addEventListener('click', () => {
    row.scrollLeft -= scrollAmount;
    });

    rightArrow.addEventListener('click', () => {
    row.scrollLeft += scrollAmount;
    });
};

function detailsdata(data){
    const i = localStorage.getItem('index');
    const currentMovie = data[i];
    console.log(i);
    console.log(currentMovie);
    console.log(`/media/${currentMovie.poster}`);

    document.querySelector('.container1').innerHTML = `<div class="moviePoster"><img src="${currentMovie.poster}"></div> 
                                                            <div class="movieCall">
                                                                <p class="movieTitle2">${currentMovie.title}</p>
                                                                <div class='yrla'>
                                                                    <p class="releaseYear2">${currentMovie.release_date}</p>
                                                                    <p class="language2"></p>
                                                                </div>
                                                                <div class='rating'>
                                                                    <i class="fa-brands fa-imdb"></i><p class="rating2">${currentMovie.rating}</p>
                                                                    <i class="fa-solid fa-square-poll-vertical"></i><p class="votes2">${currentMovie.votes}</p>
                                                                </div>
                                                                <div class="options">
                                                                    <button class="Watch"><i class="fa-solid fa-play"></i>Watch Free</button>
                                                                    <i class="fa-solid fa-bookmark"></i>
                                                                    <i class="fa-solid fa-circle-check"></i>
                                                                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                                                                </div>

                                                                <p class='movieDescription'>${currentMovie.description}</p>
                                                            </div>`

    document.querySelector('.titleCast').innerHTML = `Cast of ${currentMovie.title}`
    document.querySelector('.maincontainerwrap').style.backgroundImage = `url('${currentMovie.background}')`

    let html = '';                                                       
    currentMovie.cast_members.forEach(element => {
        html += `<div class="single">
                            <div class="PhotoContainer"><div class="castPhoto"><img src="${element.image}" alt="Profile"></div></div>
                            <div class="castDetails">
                                <p class="castName">${element.role_name}</p>
                                <p class="RealName">${element.real_name}</p>
                            </div>
                        </div>`     
    });

    document.querySelector('.castItem').innerHTML = html;  
}

function popupdiv(){
    const openBtn = document.querySelector(".open-btn");
    const popup = document.querySelector(".popup-overlay");

    openBtn.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    // Optional: click outside the popup-content to close
    document.addEventListener("click", (e) => {
        if (!popup.contains(e.target) && !openBtn.contains(e.target)) {
            popup.style.display = "none";
        }
    });
};

function resultsearch(){
    console.log("Typing..."); // ✅ Add this
    const query = document.querySelector('.searchBar').value.toLowerCase();
    const box = document.querySelectorAll('.resultcontainer');
    const popup = document.querySelector('.searchresults');

    if (query.trim() === '') {
        popup.style.display = 'none'; // hide if nothing is typed
        return;
    }

    popup.style.display = 'block'; // show only if there's text

    box.forEach((element)=>{
        const title = element.querySelector('.resultname').innerText.toLowerCase();
        if(title.includes(query)){
            element.style.display = 'flex'
        }else{
            element.style.display = 'none'
        }
    })
}

function searchbutton(data){
    document.querySelector('.searchButton').addEventListener('click',()=>{
        gotomovie(data);
    });

    document.querySelector('.searchBar').addEventListener('keydown',(e)=>{
        if(e.key === 'Enter'){
            gotomovie(data);
        }
    });
};

function gotomovie(data){
    const input = document.querySelector('.searchBar').value.toLowerCase();
        const titles = data.map((movie)=>{
            return( movie.title.toLowerCase() );
        });

        let found = false;

        titles.forEach((title, index)=>{
            if(title === input){
                localStorage.setItem('index', index);
                console.log(index);
                found = true;
                window.location.href = detailsUrl;
            }
        });

        if (!found){
            return alert('movie not found');
        };
}

function searchmovie(data){
    const box = document.querySelectorAll('.resultcontainer');

    box.forEach((element)=>{
        element.addEventListener('click', ()=>{
            const titles = data.map((movie)=>{
              return( movie.title.toLowerCase() );
            });
            const input = element.innerText.toLowerCase();

            titles.forEach((title, index)=>{
                if(title === input){
                    localStorage.setItem('index', index);
                }
            })
        })
    })
};

document.querySelector('.searchBar').addEventListener('input', ()=>{
    resultsearch();
});

document.addEventListener("DOMContentLoaded", () => {  
    popupdiv();    // Now safely called after DOM is ready
    scrollButton();
});
