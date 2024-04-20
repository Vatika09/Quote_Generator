const quote=document.getElementById('quote');
const author=document.getElementById('author');
const api_url="https://api.quotable.io/random";



async function getQuote(url){
    btnvar.style.color = "grey";

    const response =await fetch(url);
    var data=await response.json()
    quote.innerHTML=data.content;
    author.innerHTML="---By"+data.author;
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles=${data.author}&origin=*`)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const firstPageId = Object.keys(pages)[0];
            const page = pages[firstPageId];
            if (page.original && page.original.source) {
                const imageUrl = page.original.source;
                const authorImage = document.createElement('img');
                authorImage.src = imageUrl;
                authorImage.alt = `${data.author}'s image`;
                author.appendChild(authorImage);
            }
        })
        .catch(error => {
            console.error("Error fetching author image:", error);
        });
}


function tweet(){
    window.open(href="https://twitter.com/intent/tweet?text="+quote.innerHTML+"---by"+author.innerHTML,"Twitter ","width=700,height=400");
}


const btnvar=document.getElementById('btn');
function Toggle(){
    if(btnvar.style.color=="red"){
        btnvar.style.color="grey"
    }else{
        btnvar.style.color="red"
    }
}


const copybtn = document.getElementById('copybtn');
function Copy() {
    const quoteText = document.getElementById('quote').innerText;
    navigator.clipboard.writeText(quoteText)
        .then(() => {
            console.log('Text copied to clipboard:', quoteText);
        })
        .catch(err => {
            console.error('Unable to copy text to clipboard:', err);
        });
}
