//loading Models

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models')
]).then(uploadImage)


// function for image detection and image upload 

function uploadImage() {

    const con = document.querySelector('.container')

    const input = document.querySelector('#myImg')

    const imgFile = document.querySelector('#myFile')

    var canv;

    var img;

    imgFile.addEventListener('change', async () => {
        if (canv) {

            canv.remove()

        }
        if (img) {
            img.remove()

        }

        // creating a html element from a blob 

        img = await faceapi.bufferToImage(myFile.files[0])

        input.src = img.src

        const results = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();

        console.log(results)

        const faceMatcher = new faceapi.FaceMatcher(results)

        results.forEach(fd => {

            const bestMatch = faceMatcher.findBestMatch(fd.descriptor)

            console.log(bestMatch)

        })

        // create an canvas 

        canv = faceapi.createCanvasFromMedia(input)

        con.append(canv)



        faceapi.matchDimensions(canv, { width: input.width, height: input.height, })

        console.log(canv.getBoundingClientRect())

        //resize the box 

        const detectionForSize = faceapi.resizeResults(results, { width: input.width, height: input.height, })

        const box = results[0].detection.box

        const facebox = new faceapi.draw.DrawBox(box)

        faceapi.draw.drawDetections(canv, detectionForSize)
        faceapi.draw.drawFaceLandmarks(canv, detectionForSize)

        console.log('hello', detectionForSize)

    })
}
