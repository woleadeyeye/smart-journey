public with sharing class SmartJourneyController {
	
	@AuraEnabled(Cacheable=true)
	public static List<Account> getAccountList(String recordId){
		return [SELECT Id, Industry, NotesfromLeadCreation__c, Name, Type, BillingAddress, (SELECT Id, Name, Phone FROM contacts LIMIT 1) FROM Account WHERE Id =: recordId];        
	}
}