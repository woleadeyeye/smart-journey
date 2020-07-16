({
	doInit : function(cmp, event){
		cmp.get("v.recordId");
		document.title = "Smart Journey";
	},

	handlePageChangeEvent : function(cmp, event) {
		var pageNumber = event.getParam('value');
		cmp.set('v.pageNumber', JSON.parse(pageNumber.value));
		cmp.set('v.accountDetails', JSON.parse(JSON.stringify(pageNumber.accountDets)));
	},
})