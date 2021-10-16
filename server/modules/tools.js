const tools = {
    sortBySorter: function (crit){
        switch(crit){
            case 'Date &uarr;':
                return '"date_due" ASC;'
            case 'Date &darr;':
                return '"date_due" DESC;'
            case 'Complete':
                return '"complete";';
            case 'Incomplete':
                return '"complete" DESC;';
            default:
                console.log('sorter error');
        }
    }  
};

module.exports = tools;