var id="bitcoin"
let link_precios=`https://api.coingecko.com/api/v3/coins/${this.id}/market_chart?vs_currency=usd&days=30&interval=daily`
var results=[]
var prices=[]
var time=[]
var myChart
fetch(link_precios, {
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
        results = response.prices;
        this.setPrices();
        setChart()
    })
    .catch(e => {
        console.error("Error " + e)
    })

function setPrices(){

    results.forEach(function(res, i){
        prices.push(res[1])
        const milliseconds = res[0]// 1575909015000
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString()
        time.push(humanDateFormat)
    })
}

function setChart() {
    var ctx = document.getElementById('myChart');

// eslint-disable-next-line no-unused-vars
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:time,
            datasets: [{
                data: prices,
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });
}

function setID(id, name){
    console.log(id)
    setTitle(name)
    this.prices=[]
    this.time=[]
    this.myChart.destroy();
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`, {
        headers: {
            Accept: 'application/json'
        },
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .then(response => {
            results = response.prices;
            this.setPrices();
            this.setChart()
        })
        .catch(e => {
            console.error("Error " + e)
        })
    window.scrollTo({top: 0, behavior: 'smooth'});
}
