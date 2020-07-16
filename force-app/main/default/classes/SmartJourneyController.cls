public with sharing class SmartJourneyController {
	
	@AuraEnabled(Cacheable=true)
	public static List<Account> getAccountList(String recordId){
		return [SELECT Id, Industry, NotesfromLeadCreation__c, Name, Type, BillingAddress, (SELECT Id, Name, FirstName, LastName, Phone FROM contacts LIMIT 1) FROM Account WHERE Id =: recordId];        
	}

	@AuraEnabled
	public static Boolean saveDetailChange(String field, String data, Id id){
		System.debug('field : ' + field);
		System.debug('data : ' + data);
		System.debug('id : ' + id);

		Schema.SObjectType sobjectType = id.getSObjectType();
		String sobjectName = sobjectType.getDescribe().getName();
		List<SObject> record = Database.query('SELECT Id, ' + field + ' FROM ' + sobjectName + ' WHERE Id =: id');

		try{
			System.debug('record : ' + record);
			record[0].put(field, data);
			update record;
			return true;
		}catch(DmlException ex){
			return false;
		}
	}
}