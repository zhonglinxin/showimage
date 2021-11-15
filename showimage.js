javascript: (function() {
    var table = document.getElementsByTagName('table')[0];
    var trs = table.getElementsByTagName('tr');
    var titleTds = trs[0].getElementsByTagName("td");
    var imageIdxs = [];
    var productIdx = amzIdx = productPic = amzPic = null;
    for (i = 0; i < titleTds.length; i++) {
        data = titleTds[i].innerHTML.replace(/<[^<>]+>/gi, "").trim();
        if (data == "Product Image" || data == "Amazon Image" || data == "Image") {
            if (data == "Product Image") productPic = i;
            if (data == "Amazon Image" || data == "Image") amzPic = i;
            imageIdxs.push(i);
        }
        if (data == "Source URL") productIdx = i;
        if (data == "Amazon URL") amzIdx = i;
    }
    var dataTds = [];
    var idx = 0;
    var inData = "";
    for (i = 1; i < trs.length; i++) {
        if (trs[i].style.display == 'none') {
            continue;
        }
        dataTds = trs[i].getElementsByTagName("td");
        for (j = 0; j < imageIdxs.length; j++) {
            idx = imageIdxs[j];
            if (dataTds[idx].innerHTML.indexOf("<img") === 0) {
                return;
            }
            inData = dataTds[idx].innerHTML.replace(/<[^<>]+>/gi, "");
            if (idx == productPic && productIdx != null) {
                var src = dataTds[productIdx].innerHTML.replace(/<[^<>]+>/gi, "").trim();
                dataTds[idx].innerHTML = "<div><a href=\"" + src + "\" target=\"_blank\">" + "<img src=\"" + inData + "\" width=\"150\" height=\"150\">" + "</a></div>";
            } else if (idx == amzPic && amzIdx != null) {
                var src = dataTds[amzIdx].innerHTML.replace(/<[^<>]+>/gi, "").trim();
                dataTds[idx].innerHTML = "<div><a href=\"" + src + "\" target=\"_blank\">" + "<img src=\"" + inData + "\" width=\"150\" height=\"150\">" + "</a></div>";
            } else {
                dataTds[idx].innerHTML = "<div><img src=\"" + inData + "\" width=\"150\" height=\"150\"></div>";
            }
        }
    }
})();
