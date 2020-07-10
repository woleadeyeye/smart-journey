({
    doInit : function(cmp, event){
        cmp.get("v.recordId");
    },

    handlePageChangeEvent : function(cmp, event) {
        var pageNumber = event.getParam('value');
        cmp.set('v.pageNumber', pageNumber);
    }
})
