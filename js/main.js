(function($) {
    'use strict';

    function remain(dday){
        now = new Date(); 
        
        days = (dday - now) / 1000 / 60 / 60 / 24; 
        daysRound = Math.floor(days); 
        hours = (dday - now) / 1000 / 60 / 60 - (24 * daysRound); 
        hoursRound = Math.floor(hours); 
        minutes = (dday - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound); 
        minutesRound = Math.floor(minutes); 
        seconds = (dday - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound); 
        document.getElementById('text').innerHTML = daysRound.toString().padStart(3, 0) + ' : ' 
            + hoursRound.toString().padStart(2, 0) + ' : ' 
            + minutesRound.toString().padStart(2, 0) + ' : ' 
            + Math.floor(seconds).toString().padStart(2, 0);
        document.getElementsByTagName('title').item(0).text = 'D-' + daysRound;
    }
    
    const dday = new Date(2021, 10, 18, 8, 40, 0);
    remain(dday);
    setInterval(() => remain(dday), 1000);
})(jQuery);