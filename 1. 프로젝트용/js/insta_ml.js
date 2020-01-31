// <!-- JS-step16 -->
// More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // 클라우드에 업로드한 모델 URL 넣기
    const URL = "https://teachablemachine.withgoogle.com/models/YquDGOer/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").innerHTML = ""
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        explain = document.getElementById("explain");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
            labelContainer.childNodes[i].classList.add('w3-container', 'w3-cell', 'w3-mobile')
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);

        // 분류기 조건 넣기 (각 클래스에 대한 설명)
        if(prediction[0].probability.toFixed(2) >= 0.95) {
            explain.innerHTML = "땅을 파도 1000원은 안 나온다.<br>\
            핫바 사먹고도 무려 10원이 남는 돈!"
        } else if (prediction[1].probability.toFixed(2) >= 0.95){
            explain.innerHTML = "역시나 땅을 파서 나올 금액은 아니다.<br>\
            5000원이면 든든하게 덮밥을 먹자!"
        } else {
            explain.innerHTML = " <br> <br>";          
        }
        // 클래스 별 확률 보여주기
        for (let i = 0; i < maxPredictions; i++) {
            const ratio = (prediction[i].probability.toFixed(2) * 100).toFixed(0);
            const pclass = ratio >= 95 ? '<div class="insta-bg">' : '<div>'
            const classPrediction =
            "<h5>" + prediction[i].className + "</h5><h4><b>" + ratio + "%</b></h4></div>";
            labelContainer.childNodes[i].innerHTML = pclass + classPrediction;
        }
    }

init()