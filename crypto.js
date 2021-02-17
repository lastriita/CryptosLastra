var results=[]
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1d', {
    headers: {
        Accept: 'application/json'
    },
    method: 'GET'
    })
    .then(res => {
        console.log("Response here")
        return res.json()
    })
    .then(response => {
        results = response;
        console.log(response)
        this.updateTable()
    })
    .catch(e => {
        console.error("Error " + e)
    })

function updateTable(){
    let html='';

    results.forEach(function(res, i){
        console.log(res.id)
        html+=
        '<tr>\n' +
        `        <th scope="row">${ res.market_cap_rank }</th>\n` +
        `        <td><img src="${res.image}" width="20" height="20">  ${res.name}</td>\n` +
        `        <td>${res.current_price} $</td>\n` +
        `        <td>${res.market_cap_change_percentage_24h} % </td>\n` +
        `        <td><button onclick=setID("${res.id}","${res.name}") type="button" class="btn btn-primary" width="25" height="25">
                 <img src="http://cdn.onlinewebfonts.com/svg/img_414155.png" width="20" height="20"></button></td>`+
        '</tr>';
    })
    setTitle("Bitcoin")
    document.getElementById("contenido-tabla").innerHTML = html;
}

function setTitle(name) {
    document.getElementById("myText").innerHTML = name;
}