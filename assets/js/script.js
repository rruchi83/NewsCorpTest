var topNewsSection = document.querySelector("#top-news");
var allOtherNews = document.querySelector("#all-news")
const getCollections = async () => {
    const collectioRresponse = await fetch('../../Server/collections.json');
    return collectioRresponse.json(); 
}

const getArticlesById = async (id) => {
    const articleResponse = await fetch('../../Server/articles.json');
    const articleResponseJson = await articleResponse.json();   
    var articleData = articleResponseJson
    .filter(articleValue => articleValue.collectionid == id)
    .sort(function(a,b){
        
        return new Date(b.Published) - new Date(a.Published);
    });
    
    if(articleData.length > 0){
        articleData.map((news, index) => {
            if(index == 0){
                topNewsSection.innerHTML = createTopNews(news)
            }else{
                allOtherNews.innerHTML += createNews(news);
            }
        })
    }
 
}

function diff_minutes(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;

  const hours = Math.floor(Math.abs(Math.round(diff)) / 60);
  const minutes = Math.abs(Math.round(diff)) % 60;
  return { hours, minutes };
  
 }


getArticlesById("10002");
export function createNews(news){
 return `
    <a class="article" href="#">
        <figure class="article-image is-3by2">
        <img src="${news.Imageurl}" alt="">
        </figure>
        <div class="article-body">
        <h2 class="article-title">
            ${news.Title}
        </h2>
        <p class="article-content">
            ${news.Intro}
        </p>
        <footer class="article-info">
            <span>${diff_minutes(new Date(news.Published), new Date()).hours > 0 ? diff_minutes(new Date(news.Published), new Date()).hours + 'h' : diff_minutes(new Date(news.Published), new Date()).minutes + 'm'}</span>
        </footer>
        </div>
    </a>
 `;
}

export function createTopNews(news){
    return `
    <a class="article first-article" href="#">
        <figure class="article-image is-4by3">
        <img src="${news.Imageurl}" alt="">
        </figure>
        <div class="article-body">
        <h2 class="article-title">
            ${news.Title}
        </h2>
        <p class="article-content">
           ${news.Intro}
        </p>
        <footer class="article-info">
            <span>${diff_minutes(new Date(news.Published), new Date()).hours > 0 ? diff_minutes(new Date(news.Published), new Date()).hours + 'h' : diff_minutes(new Date(news.Published), new Date()).minutes + 'm'}</span>
        </footer>
        </div>
    </a>
    `;
   }