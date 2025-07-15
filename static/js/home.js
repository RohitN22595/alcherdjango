const getdata = async ()=>{
    const responce = await fetch('/get-data/');
    const data = await responce.json();
    console.log('in home',data);
    sendindex();
    searchmovie(data);
    searchbutton(data);
    bgImage(data);
}
getdata();

function sendindex(){
    document.querySelectorAll('.page2').forEach((element)=>{
        element.addEventListener('click', ()=>{
            const i = element.dataset.index;
            localStorage.setItem('index', i); 
        });   
    });
}


function scroolMouse(){

    const scrollRow = document.querySelector('.row');

    scrollRow.addEventListener('wheel', (evt) => {
        if (Math.abs(evt.deltaX) === 0) {
            evt.preventDefault();
            scrollRow.scrollLeft += evt.deltaY * 7; // Adjust sensitivity here
        }
    });

};


function scrollButton(){

    const row = document.querySelector('.row');
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
                    // window.location.href = detailsUrl;
                }
            })
        })
    })
};

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

function bgImage(data){
    const images = data.map(item => item.background);
    const div = document.querySelector('.trilerWrap');
    let index = 0;
    const styling = div.style
    styling.backgroundSize = 'cover';
    styling.backgroundPosition = 'top';
    

    setInterval(() => {
        index = (index + 1) % images.length; // loop back to start
        div.style.backgroundImage = `url('${images[index]}')`;
    }, 4000);
}

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

document.querySelector('.searchBar').addEventListener('input', ()=>{
    resultsearch();
});

document.addEventListener("click", (e) => {
    const popup = document.querySelector('.searchresults');
    const input = document.querySelector('.searchBar');
    if (!popup.contains(e.target) && !input.contains(e.target)) {
        popup.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", () => {  
    scroolMouse();
    scrollButton();
    popupdiv();
});