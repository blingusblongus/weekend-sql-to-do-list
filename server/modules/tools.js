const tools = {
    sortBySorter: function (crit){
        switch(crit){
            case 'Date &uarr;':
                return '"date_due" DESC, id;'
            case 'Date &darr;':
                return '"date_due" ASC, id;'
            case 'Complete':
                return '"complete" DESC, id;';
            case 'Incomplete':
                return '"complete" ASC, id;';
            default:
                console.log('sorter error');
        }
    }  
};

module.exports = tools;