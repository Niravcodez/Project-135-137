status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
    
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = object_name + " found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_status").innerHTML = object_name + " not found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "not found");
                synth.speak(utterThis);
                s
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("MODEL IS LOADED!!");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}