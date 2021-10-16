const tools = {
    sortBySorter: function (crit){
        switch(crit){
            case 'date asc':
                return '"date_due" asc;'
            case 'date desc':
                return '"date_due" desc;'
            case 'complete':
                return '"complete"';
            default:
                console.log('sorter error');
        }
    }  
};

module.exports = tools;