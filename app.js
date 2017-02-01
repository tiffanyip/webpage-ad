const init = function() {
    const adSizes = [
        { width: 300, height: 250 },
        { width: 320, height: 260 },
        { width: 300, height: 600 },
        { width: 120, height: 60 },
        { width: 970, height: 90 },
        { width: 88, height: 31 },
        { width: 180, height: 150 },
        { width: 160, height: 600 },
        { width: 728, height: 90 },
        { width: 550, height: 480 },
        { width: 970, height: 250 },
        { width: 250, height: 250 },
        { width: 240, height: 400 },
        { width: 336, height: 280 },
        { width: 300, height: 100 },
        { width: 720, height: 300 },
        { width: 468, height: 60 },
        { width: 234, height: 60 },
        { width: 120, height: 90 },
        { width: 125, height: 125 },
        { width: 120, height: 600 },
    ];
    // refractor adSizes to an object
    const adObj = {};
    adSizes.forEach((ad) => {
        if (ad.width in adObj) {
            adObj[ad.width].push(ad.height);
        } else {
            adObj[ad.width] = [ad.height];
        }
    });
    // get webpage URL
    const location = window.location.href;
    const advertisments = [];

    // get all ad elements
    const imgElements = document.getElementsByTagName("img");
    const iframeElements = window.parent.document.getElementsByTagName("iframe");

    const checkAdSize = function(elem) {
        const tagInfo = elem.getBoundingClientRect();
        const size = { width: Math.round(tagInfo.width), height: Math.round(tagInfo.height) };
        // check if it is adSize
        if (adObj[size.width] && adObj[size.width].includes(size.height)) {
            advertisments.push({
                width: size.width,
                height: size.height,
                position: {
                    x: tagInfo.left,
                    y: tagInfo.top,
                },
            });
        }
    };
    // loop through all iframes, check element size for each
    for (let j = 0; j < iframeElements.length; j += 1) {
        checkAdSize(iframeElements[j]);
    }
    // loop through all images, check element size for each
    for (let i = 0; i < imgElements.length; i += 1) {
        if (imgElements[i].parentElement &&
        imgElements[i].parentElement.tagName === "A") {
            checkAdSize(imgElements[i]);
        }
    }
    // console log json object
    const data = { location, advertisments };
    console.log(data);
    return data;
};
init();
