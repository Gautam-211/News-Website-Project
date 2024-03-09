// const API_KEY = "aad850529a4540ceb99d4ce95436ad1d";
// const url = "https://newsapi.org/v2/everything?q=";

// $(window).on("load", () => {
//     fetchNews("India");
// });

// async function fetchNews(query){
//     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data = await res.json();
//     bindData(data.articles);
// }

// function bindData(articles){
//     const cardsContainer = $("#cards-container");
//     const newsCardTemplate = $("#template-news-card");

//     cardsContainer.html("");

//     articles.forEach(article => {
//         if (!article.urlToImage) return;

//         const cardClone = newsCardTemplate.clone(true);
//         fillDataInCard(cardClone, article);
//         cardsContainer.append(cardClone);
//     });
// }

// function fillDataInCard(cardClone, article){
//     const newsImg = cardClone.find("#news-img");
//     const newsTitle = cardClone.find("#news-title");
//     const newsSource = cardClone.find("#news-source");
//     const newsDesc = cardClone.find("#news-desc");

//     newsImg.attr("src", article.urlToImage);
//     newsTitle.text(article.title);
//     newsDesc.text(article.description);

//     const date = new Date(article.publishedAt).toLocaleString("en-US", {
//         timeZone: "Asia/Jakarta"
//     });

//     newsSource.text(`${article.source.name} • ${date}`);
// }

const API_KEY = "aad850529a4540ceb99d4ce95436ad1d";
const url = "https://newsapi.org/v2/everything?q=";
// const url = "https://inshorts.deta.dev/news?category="

window.addEventListener("load", () => {
    fetchNews("India");
});

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // const res = await fetch(`${url}${query}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.setAttribute("src", article.urlToImage);
    newsTitle.textContent = article.title;
    newsDesc.textContent = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.textContent = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.style.cursor = "pointer";
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"blank");
    })
}

let CurSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (CurSelectedNav !== null) CurSelectedNav.classList.remove("active");
    CurSelectedNav = navItem;
    CurSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    if (CurSelectedNav !== null) CurSelectedNav.classList.remove("active");
    CurSelectedNav = null;
})


