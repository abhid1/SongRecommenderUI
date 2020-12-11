function loadSongsJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'songs.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function loadArtistsJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'artists.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function loadModel1JSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'model1_UI_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function loadModel2JSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'model2_UI_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function loadModel3JSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'model3_UI_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function loadModel4JSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'model4_UI_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function outputRecommendations(selections)
{
    loadModel1JSON(function(response) {
        let tfidf_recommendations_dictionary = JSON.parse(response);
        let res = "";

        for (var sel in selections)
        {
            let key = selections[sel].split("\t");
            key = key[0] + " \t " + key[1];

            let recomendations = tfidf_recommendations_dictionary[key];
            for (var r in recomendations)
            {
                res += recomendations[r] + "----";
            }

            res += "\n";
        }

         d3.select("#tfidfOutput")
           .append("text")
           .attr("style", "position: absolute; top: 50%; left: 15%;")
           .text(res);
    });

    loadModel2JSON(function(response) {
        let kmeans_recommendations_dictionary = JSON.parse(response);
        let res = "";

        for (var sel in selections)
        {
            let key = selections[sel].split("\t");
            key = key[0] + " \t " + key[1];

            let recomendations = kmeans_recommendations_dictionary[key];
            for (var r in recomendations)
            {
                res += recomendations[r] + "----";
            }

            res += "\n";
        }

         d3.select("#tfidfOutput")
           .append("text")
           .attr("style", "position: absolute; top: 65%; left: 15%;")
           .text(res);
    });

    loadModel3JSON(function(response) {
        let spacy_recommendations_dictionary = JSON.parse(response);
        let res = "";

        console.log(spacy_recommendations_dictionary)

        for (var sel in selections)
        {
            let key = selections[sel].split("\t");
            key = key[0] + "\t" + key[1];

            let recomendations = spacy_recommendations_dictionary[key];
            for (var r in recomendations)
            {
                res += recomendations[r] + "----";
            }

            res += "\n";
        }

         d3.select("#tfidfOutput")
           .append("text")
           .attr("style", "position: absolute; top: 80%; left: 15%;")
           .text(res);
    });

    loadModel4JSON(function(response) {
        let knn_recommendations_dictionary = JSON.parse(response);
        let res = "";

        for (var sel in selections)
        {
            let key = selections[sel].split("\t");
            key = key[0] + "\t" + key[1];

            let recomendations = knn_recommendations_dictionary[key];
            for (var r in recomendations)
            {
                res += recomendations[r] + "----";
            }

            res += "\n";
        }

         d3.select("#tfidfOutput")
           .append("text")
           .attr("style", "position: absolute; top: 95%; left: 15%;")
           .text(res);
    });
}

function init_table() {
    loadSongsJSON(function(response) {
        let songs = JSON.parse(response);

       loadArtistsJSON(function(response) {
        let artists = JSON.parse(response);
        
        let songsAndArtistSelection = d3.select("#songsTableData")
                                    .selectAll("tr")
                                    .data(artists)
                                    .join("tr");

        let tableData = songsAndArtistSelection.selectAll("td")
                                               .data(["checkbox", "artist", "song"])
                                               .join("td");

        let table = document.getElementById('songsTableData');

        for (var i = 0;  i < table.rows.length; i++)
        {
            var firstCol = table.rows[i].cells[0]; //first column
            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            firstCol.append(checkbox);

            var secondCol = table.rows[i].cells[1];
            secondCol.innerHTML = artists[i];

            var thirdCol = table.rows[i].cells[2];
            thirdCol.innerHTML = songs[i];
        }


        d3.select("#recommendationButton")
          .on("click", function(){
            let selections = [];
            let selectedCount = 0;
            var checkBoxes = table.getElementsByTagName("input");
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].checked && selectedCount >= 5){
                    alert("Please select up to 5 songs.");
                    selections = [];
                    break;
                }
                else if(checkBoxes[i].checked && selectedCount < 5) {
                    var row = checkBoxes[i].parentNode.parentNode;
                    selections.push(row.cells[1].innerHTML + "\t" + row.cells[2].innerHTML);
                    selectedCount++;
                }
            }
            d3.select("#modelOutput")
              .selectAll("text")
              .remove();

            outputRecommendations(selections);
          });
    });
    });
}

init_table();