const tools = {
    sortBySorter: function (crit){
        switch(crit){
            case 'date asc':
                return '"date_due" ASC;'
            case 'date desc':
                return '"date_due" DESC;'
            case 'complete':
                return '"complete";';
            case 'complete desc':
                return '"complete" DESC;';
            case 'none':
                return ';'
            default:
                console.log('sorter error');
        }
    }  
};

module.exports = tools;