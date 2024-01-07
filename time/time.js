document.addEventListener("DOMContentLoaded", function() {
    //scroll bar
    var wrap = document.getElementById("wrap")
    var fps = new FullPageScroll(wrap)
    var indicator = document.createElement("div")
    var slideIndicators =[]

    indicator.id = 'indicator'

    fps.slides.forEach(function(slide, index) {
        var slideIndicator = document.createElement("div")
        slideIndicator.onclick = function() {
            fps.goToSlide(index)
        }

        if (index === fps.currentSlide) {
            slideIndicator.className = "active"
        }

        indicator.appendChild(slideIndicator)
        slideIndicators.push(slideIndicator);
    })

    document.body.appendChild(indicator)
    fps.onslide = function() {
        slideIndicators.forEach(function(slideIndicator, index) {
            if (index === fps.currentSlide) {
                slideIndicator.className = "active";
            } else {
                slideIndicator.className = "";
            }
        });
    }

    //live time
    document.getElementById("live-date").innerHTML = new Date().toLocaleDateString()
    document.getElementById("live-time").innerHTML = new Date().toLocaleTimeString()
    setInterval(function(){
        document.getElementById("live-date").innerHTML = new Date().toLocaleDateString()
        document.getElementById("live-time").innerHTML = new Date().toLocaleTimeString()
    }, 1000)

    //stars
    const starClasses = ["fa-solid", "fa-star", "fa-2xs"]
    const starColors = ["#EF476F","#FFD166","#06D6A0","#118AB2","#073B4C","#233D4D","#FE7F2D","#FCCA46","#A1C181","#619B8A"]
    
    for (let i = 0; i < 20+Math.floor(Math.random()*100); i++) {
        const star = document.createElement("i")

        for (let i = 0; i < starClasses.length; i++) {
            star.classList.add(starClasses[i])
        }

        star.style.color = starColors[(Math.floor(Math.random() * starColors.length))]
        star.style.left = String(Math.floor(Math.random()*window.innerWidth))+"px"
        star.style.top = String(Math.floor(Math.random()*window.innerHeight))+"px"
        star.style.fontSize = String(Math.floor(Math.random()*20))+"px"
        star.style.rotate = String(Math.floor(Math.random()*360))+"deg"

        star.style.position = "absolute"
        const live = document.getElementById("live");
        live.appendChild(star);
    }
})