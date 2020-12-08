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
        const secondsRound = Math.floor(seconds);

        const checkDate = daysRound <= 0 && hoursRound <= 0 && minutesRound <= 0 && secondsRound <= 0;

        if(checkDate) {
            $(id).text('000 : 00 : 00 : 00');
        }else {
            $(id).text(daysRound.toString().padStart(3, 0) + ' : ' 
                + hoursRound.toString().padStart(2, 0) + ' : ' 
                + minutesRound.toString().padStart(2, 0) + ' : ' 
                + secondsRound.toString().padStart(2, 0));
        }

        return checkDate;
    }

    function removeStorage(key) {
        const idx = list.findIndex(o => o.key === key);
        if(idx > -1) list.splice(idx, 1);
        localStorage.setItem('list', JSON.stringify(list));
    }

    function addDateInterval(key, date) {
        const dday = new Date(date);
        dday.setSeconds(0);
        
        if(!remain('#data' + key, dday)) {
            const plus = setInterval(() => {
                if(remain('#data' + key, dday)) {
                    removeStorage(key);
                    clearInterval(plus);
                }
            }, 1000);
        }else {
            console.log('load failed');
        }


    }

    function addBlock(title, key) {
        const container = $('<div>', {'id': 'container' + key, 'class': 'container'});
        
        const header = $('<div>', {'class': 'row header'});
        const headerContent = $('<div>', {'class': 'col content'});

        const content = $('<div>', {'class': 'row content'});
        const contentCol = $('<div>', {'class': 'col'});
        const text = $('<div>', {'id': 'data'+key, 'class': 'text'});
        const deleteBtn = $('<div>', {'class': 'deletebtn btn btn-secondary', 'data-key': key}).text('삭제');

        header.append(headerContent.text(title));

        content
            .append(contentCol
                .append(text)
                .append(deleteBtn));

        container
            .append(header)
            .append(content);
        
        $(document.body).append(container);
    }
    
    function defaultInterval() {
        const dday = new Date(2021, 10, 18, 8, 40, 0);

        if(!remain('#default', dday)) {
            const main = setInterval(() => {
                if(remain('#default', dday)) {
                    clearInterval(main);
                }
            }, 1000);
        }
    }

    function setTimes(name, input, key) {
        console.log(name, input, key);
        if(key === undefined || key === null) {
            key = list.map(o => o.key);

            if(key.length > 0) {
                key = key.reduce((p, c) => p > c ? p : c) + 1;
            }else {
                key = 1;
            }
        }
        
        addBlock(name, key);
        addDateInterval(key, input);

        return key;
    }

    defaultInterval();
    let list = localStorage.getItem('list');
    if(list === null || list.length <= 0) {
        list = new Array();
    }else {
        list = JSON.parse(list);
        for(let obj of list) {
            setTimes(obj.name, obj.date, obj.key);
        }
    }

    $(document).on('click', '#add', () => {
        const name = $('#name').val();
        const input = $('#dateTime').val();
        
        if(name === null || name.length <= 0) {
            alert('입력된 타이틀이 없습니다.');
            $('#name').focus();
            return;
        }

        if(input === null || input.length <= 0) {
            alert('입력된 날짜가 없습니다.');
            $('#dateTime').focus();
            return;
        }

        if(list.filter(o => o.name === name).length > 0) {
            alert('이미 존재하는 타이틀입니다.');
            $('#name').focus();
            return;
        }

        let key = setTimes(name, input);     
        list.push({'key': key, 'name': name, 'date': input});
        localStorage.setItem('list', JSON.stringify(list));   
    });

    $(document).on('click', '.deletebtn', function() {
        const key = $(this).data('key');
        $('#container' + key).remove();
        removeStorage(key);
    });
})(jQuery);