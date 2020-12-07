(function($) {
    'use strict';

    function remain(dday){
        const now = new Date(); 
        
        const days = (dday - now) / 1000 / 60 / 60 / 24; 
        const daysRound = Math.floor(days); 
        const hours = (dday - now) / 1000 / 60 / 60 - (24 * daysRound); 
        const hoursRound = Math.floor(hours); 
        const minutes = (dday - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound); 
        const minutesRound = Math.floor(minutes); 
        const seconds = (dday - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound); 
        
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