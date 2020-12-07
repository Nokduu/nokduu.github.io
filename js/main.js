(function($) {
    'use strict';

    function remain(id, dday){
        const now = new Date(); 
        
        const days = (dday - now) / 1000 / 60 / 60 / 24; 
        const daysRound = Math.floor(days); 
        const hours = (dday - now) / 1000 / 60 / 60 - (24 * daysRound); 
        const hoursRound = Math.floor(hours); 
        const minutes = (dday - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound); 
        const minutesRound = Math.floor(minutes); 
        const seconds = (dday - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound); 
        
        $(id).text(daysRound.toString().padStart(3, 0) + ' : ' 
            + hoursRound.toString().padStart(2, 0) + ' : ' 
            + minutesRound.toString().padStart(2, 0) + ' : ' 
            + Math.floor(seconds).toString().padStart(2, 0));
    }
    
    const dday = new Date(2021, 10, 18, 8, 40, 0);
    remain('#default', dday);
    setInterval(() => remain('#default', dday), 1000);

    $(document).on('click', '#add', () => {
        alert('추가 예정');
    });
})(jQuery);