//global
var mute = false

//scroll bar
document.addEventListener("DOMContentLoaded", function() {
    
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

                // move live time
                LiveTimePos = parseInt((document.getElementById("live-time").style.transform).replace("translateY(","").replace("px)",""))
                if (isNaN(LiveTimePos)) {
                    LiveTimePos = 0
                }
                
                if  (index*window.innerHeight < LiveTimePos) {
                    document.getElementById("live-time").style.transition = "transform 1.3s ease, top 1.25s ease, font-size 1.25s ease"

                    setTimeout(moveLiveTime,100)

                } else {
                    document.getElementById("live-time").style.transition = "transform 1.25s ease, top 1.25s ease, font-size 1.25s ease"
                    moveLiveTime()
                }

                function moveLiveTime () {
                    if (index === 0) {
                        document.getElementById("live-time").style.top = "50vh"
                        document.getElementById("live-time").style.transform = "translateY(0px)"
                        document.getElementById("live-time").style.fontSize = "clamp(var(--min-font-size),var(--default-font-size),var(--default-font-size))"
                    } else {
                        document.getElementById("live-time").style.top = "0px"
                        document.getElementById("live-time").style.transform = "translateY("+String(index*window.innerHeight)+"px)"
                        document.getElementById("live-time").style.fontSize = "100px"
                    }
                }

                document.getElementById("wrap").addEventListener("transitionend", function(child){
                    if (child.target.id == "live-time") {
                        document.getElementById("live-time").style.transition = ""
                    }
                })

            } else {
                slideIndicator.className = "";
            }
        });
    }
})

//live time
document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("live-date").innerHTML = new Date().toLocaleDateString()
    document.getElementById("live-time").innerHTML = new Date().toLocaleTimeString()
    setInterval(function(){
        document.getElementById("live-date").innerHTML = new Date().toLocaleDateString()
        document.getElementById("live-time").innerHTML = new Date().toLocaleTimeString()
    }, 1000)

})

//stars
document.addEventListener("DOMContentLoaded", function() {
    
    const starClasses = ["fa-solid", "fa-star", "fa-2xs"]
    const starColors = ["#EF476F","#FFD166","#06D6A0","#118AB2","#073B4C","#233D4D","#FE7F2D","#FCCA46","#A1C181","#619B8A"]
    
    for (let i = 0; i < 20+Math.floor(Math.random()*100); i++) {
        const star_div = document.getElementById("stars");
        const star = document.createElement("i")

        for (let i = 0; i < starClasses.length; i++) {
            star.classList.add(starClasses[i])
        }

        colour = starColors[(Math.floor(Math.random() * starColors.length))]
        x = String(Math.floor(Math.random()*window.innerWidth))
        y = String(Math.floor(Math.random()*window.innerHeight))
        size = String(2+Math.floor(Math.random()*20))

        
        star.style.rotate = String(Math.floor(Math.random()*360))+"deg"

        star.style.color = colour
        star.style.left = x+"px"
        star.style.top = y+"px"
        star.style.fontSize = size+"px"
        star.style.position = "absolute"
        star.style.zIndex = 1
        star_div.appendChild(star)

        const glow = document.createElement("div")
        glow.style.display = "inline-block"
        glow.style.left = String((parseInt(x)+((parseInt(size)/1.5))))+"px"
        glow.style.top = String((parseInt(y)))+"px"
        glow.style.width = "1px"
        glow.style.height = "1px"
        glow.style.borderRadius = "1px"
        glow.style.position = "absolute"
        glow.style.boxShadow = "0 0 10px 5px "+colour

        star_div.appendChild(glow)


    }
})

//timer numbers
document.addEventListener("DOMContentLoaded", function() {

    var hour = document.getElementById("hour")
    var min = document.getElementById("min")
    var sec = document.getElementById("sec")

    var hourInc1 = document.getElementById("hour-inc-1")
    var hourInc10 = document.getElementById("hour-inc-10")
    var hourDec1 = document.getElementById("hour-dec-1")
    var hourDec10 = document.getElementById("hour-dec-10")

    var minInc1 = document.getElementById("min-inc-1")
    var minInc10 = document.getElementById("min-inc-10")
    var minDec1 = document.getElementById("min-dec-1")
    var minDec10 = document.getElementById("min-dec-10")

    var secInc1 = document.getElementById("sec-inc-1")
    var secInc10 = document.getElementById("sec-inc-10")
    var secDec1 = document.getElementById("sec-dec-1")
    var secDec10 = document.getElementById("sec-dec-10")


    hourInc1.addEventListener("click", function() {hour.innerHTML = parseInt(hour.innerHTML)+1; validNumbers(1)})
    hourInc10.addEventListener("click", function() {hour.innerHTML = parseInt(hour.innerHTML)+10; validNumbers(10)})
    hourDec1.addEventListener("click", function() {hour.innerHTML = parseInt(hour.innerHTML)-1; validNumbers(1)})
    hourDec10.addEventListener("click", function() {hour.innerHTML = parseInt(hour.innerHTML)-10; validNumbers(10)})

    minInc1.addEventListener("click", function() {min.innerHTML = parseInt(min.innerHTML)+1; validNumbers(1)})
    minInc10.addEventListener("click", function() {min.innerHTML = parseInt(min.innerHTML)+10; validNumbers(10)})
    minDec1.addEventListener("click", function() {min.innerHTML = parseInt(min.innerHTML)-1; validNumbers(1)})
    minDec10.addEventListener("click", function() {min.innerHTML = parseInt(min.innerHTML)-10; validNumbers(10)})

    secInc1.addEventListener("click", function() {sec.innerHTML = parseInt(sec.innerHTML)+1; validNumbers(1)})
    secInc10.addEventListener("click", function() {sec.innerHTML = parseInt(sec.innerHTML)+10; validNumbers(10)})
    secDec1.addEventListener("click", function() {sec.innerHTML = parseInt(sec.innerHTML)-1; validNumbers(1)})
    secDec10.addEventListener("click", function() {sec.innerHTML = parseInt(sec.innerHTML)-10; validNumbers(10)})

    function validNumbers (change) {
        //inc sec
        if (parseInt(sec.innerHTML) > 59 ) {
            sec.innerHTML = parseInt(sec.innerHTML)-60
            min.innerHTML = parseInt(min.innerHTML)+1
        }

        //dec sec
        if (parseInt(sec.innerHTML) < 0 ) {
            if (parseInt(min.innerHTML) <= 0 ) {
                if (parseInt(hour.innerHTML) <= 0 ) {
                    sec.innerHTML = 0
                } else {
                    sec.innerHTML = 60 - change
                    min.innerHTML = 60 - change
                    hour.innerHTML = parseInt(hour.innerHTML)-1
                    if (change === 10) {sec.innerHTML = 50}
                }
            } else {
                sec.innerHTML = 60 - change
                min.innerHTML = parseInt(min.innerHTML)-1
            }
        }

        //inc min
        if (parseInt(min.innerHTML) > 59 ) {
            min.innerHTML = parseInt(min.innerHTML)-60
            hour.innerHTML = parseInt(hour.innerHTML)+1
        }

        //dec min
        if (parseInt(min.innerHTML) < 0 ) {
            if (parseInt(hour.innerHTML) <= 0 ) {
                min.innerHTML = 0
            } else {
                min.innerHTML = 60 - change
                hour.innerHTML = parseInt(hour.innerHTML)-1
            }
        }

        //dec hour
        if (parseInt(hour.innerHTML) < 0 ) {
            hour.innerHTML = 0
        }

        // double digit
        double_digits()
    }
})

// timer function
document.addEventListener("DOMContentLoaded", function() {

    var start = document.getElementById("start")
    var rest = document.getElementById("timer-reset")
    var timerDoneSound = new Audio("alarm.mp3")
    var started = false
    var running = false
    var done = false
    var last = []

    setInterval(function(){
        if (running) {
            sec.innerHTML = parseInt(sec.innerHTML)-1

            // double digit
            double_digits()
    
            // check if done
            if ( parseInt(sec.innerHTML) <= 0 && parseInt(min.innerHTML) <= 0 && parseInt(hour.innerHTML) <= 0 ) {
                sec.innerHTML = "00"
                running = false
                done = true
                start.innerHTML = "Start"
                if (!mute) {timerDoneSound.play()}
            }
        }
    },1000)

    start.addEventListener("click", function(){
        if (running && started) {
            running = false
            start.innerHTML = "Resume"
        } else {
            running = true
            started = true
            start.innerHTML = "Pause"
            last = [hour.innerHTML,min.innerHTML,sec.innerHTML]
        }
    } )

    rest.addEventListener("click", function() {
        running = false
        done = true
        start.innerHTML = "Start"
        hour.innerHTML = last[0]
        min.innerHTML = last[1]
        sec.innerHTML = last[2]
        double_digits()
    })

})

// reset spin
document.addEventListener("DOMContentLoaded", function() {
    $(".timer-reset").hover(function () {
        $(this).toggleClass("fa-spin");
    });
})

// swaps volume icons
document.addEventListener("DOMContentLoaded", function() {
    $(".timer-volume-unmute").click(function () {
        $(this).toggleClass("hide");
        $(".timer-volume-mute").toggleClass("hide")
        mute = true
    });
})

document.addEventListener("DOMContentLoaded", function() {
    $(".timer-volume-mute").click(function () {
        $(this).toggleClass("hide");
        $(".timer-volume-unmute").toggleClass("hide")
        mute = false
    });
})


// double digits
function double_digits () {
    if (parseInt(sec.innerHTML) <= 9 ) {
        sec.innerHTML = "0"+String(parseInt(sec.innerHTML))
    }

    if (parseInt(min.innerHTML) <= 9 ) {
        min.innerHTML = "0"+String(parseInt(min.innerHTML))
    }

    if (parseInt(hour.innerHTML) <= 9 ) {
        hour.innerHTML = "0"+String(parseInt(hour.innerHTML))
    }
}

//stopwatch background
document.addEventListener("DOMContentLoaded", function() {
    
    // blue
    for (let i = 0; i < 15+Math.floor(Math.random()*100); i++) {
        const backgroundBlue = document.getElementById("background-blue");
        const Blue = document.createElement("div")

        Blue.style.left = String(Math.floor(Math.random()*window.innerWidth))+"px"
        Blue.style.top = String(Math.floor(Math.random()*window.innerHeight))+"px"
        Blue.style.width = String(Math.floor(Math.random()*300))+"px"
        Blue.style.height = String(Math.floor(Math.random()*300))+"px"
        Blue.style.borderRadius = "50%"
        Blue.style.background = "radial-gradient(rgba(0,0,255,"+String(Math.random())+"), rgba(0,0,0,0), rgba(0,0,0,0))"
        Blue.style.zIndex = 1
        Blue.style.position = "absolute"
        backgroundBlue.appendChild(Blue)

    }

    //falling
    count = 0
    setInterval( function() {
        for (let i = 0; i < 1+Math.floor(Math.random()*1); i++) {

            fallingClasses = ["fa-moon","fa-meteor","fa-satellite","fa-face-smile","fa-face-grin-hearts","fa-face-angry","fa-face-grin-tears","fa-lemon","fa-apple-whole"]

            const backgroundFalling = document.getElementById("background-falling");
            const pic = document.createElement("div")

            pic.id = "falling-image-"+count

            pic.classList.add("fa-solid")
            pic.classList.add(fallingClasses[Math.floor(Math.random() * fallingClasses.length)])

            pic.style = "color: rgba(255,255,255,0.8);font-size: 20px; line-height: .1em; vertical-align: 0.22em;"
            pic.style.left = String(Math.floor(Math.random()*window.innerWidth))+"px"
            pic.style.zIndex = "100"
            pic.style.top = "-20px"
            pic.style.position = "absolute"
            pic.style.transition = "all 7s linear"
            pic.style.transform = "translateY(0vh)"
            backgroundFalling.appendChild(pic)
            count++

        }
    },600)

    setInterval(function() {
        const backgroundFalling = document.getElementById("background-falling");
        backgroundFalling.childNodes.forEach((pic) =>
        pic.style.transform = "translateY(103vh)"
        )
    },650)

    document.getElementById("background-falling").addEventListener("transitionend", function(child){
        document.getElementById(child.target.id).remove()
    })
})