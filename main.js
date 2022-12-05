prediction1 = ""
prediction2 = ""

Webcam . set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
})

camera = document.getElementById("camera")
Webcam.attach('#camera')

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}

console.log("ml5 version = ",ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Qqeua-ROj/model.json',modelLoaded)

function modelLoaded(){
    console.log("Model loaded")
}

function speak(){
    synt = window.speechSynthesis
    speakdata1 = "The first prediction is " + prediction1
    speakdata2 = "The second prediction is " + prediction2
    var utterthis  = new SpeechSynthesisUtterance(speakdata1 + speakdata2)
    synt.speak(utterthis)
}

function check(){
    img = document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}

function gotResult(error,results){
    if (error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("resultGestureName").innerHTML = results[0].label
        document.getElementById("resultGestureName2").innerHTML = results[1].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
        if (results[0].label == "Amazing"){
            document.getElementById("updateGesture").innerHTML = "&#128076;"
        }
        if (results[0].label == "Best"){
            document.getElementById("updateGesture").innerHTML = "&#128077;"
        }
        if (results[0].label == "Victory"){
            document.getElementById("updateGesture").innerHTML = "&#9996;"
        }
        if (results[1].label == "Amazing"){
            document.getElementById("updateGesture2").innerHTML = "&#128076;"
        }
        if (results[1].label == "Best"){
            document.getElementById("updateGesture2").innerHTML = "&#128077;"
        }
        if (results[1].label == "Victory"){
            document.getElementById("updateGesture2").innerHTML = "&#9996;"
        }
    }
}