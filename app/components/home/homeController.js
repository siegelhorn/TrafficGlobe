app.controller('HomeController', function($firebase, $firebaseAuth, firebaseService) {
    var homeCtrl = this;
    var globe;
    var refreshIntervalId;



    var elem = document.getElementById("everything");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }

    //elem.requestFullscreen(); // standard


    previewGlobe();

    homeCtrl.login = function() {
        firebaseService.login();
        clearInterval(refreshIntervalId);
        globe.stopAnimation();
        globe = null;

    };



    function previewGlobe(){
        var div = document.getElementById('previewGlobe');
        var urls = {
            earth: 'img/globeImages/worldBlue.jpg',
            bump: 'img/bump.jpg',
            specular: 'img/specular.jpg',
        }



        // create a globe
        globe = new Globe(div, urls);

        // start it
        globe.init();
        addData(globe);

    }

    function addData(globe){
        var xhr;

        xhr = new XMLHttpRequest();
        xhr.open('GET', 'components/home/search.json', true);
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    console.log(data.length)

                    refreshIntervalId = setInterval(function() {
                        var dice = Math.floor(Math.random() * 22000 + 1);
                        var i = 4 * dice;
                        var lat = data[i];
                        var lng = data[i + 1];


                        var point = {
                            //color: '#'+Math.floor(Math.random()*16777215).toString(16),
                            color: "#39FF14",
                            lat: lat,
                            lon: lng,
                            size: 20
                        };

                        globe.addDynamicBlock(point);

                    }, 1000);


                    console.log(data);
                }
            }
        };
        xhr.send(null);
    }


});