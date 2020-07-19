import { LightningElement, api, wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/SmartJourneyController.getAccountList';

export default class ParentComponent extends LightningElement {

	homePage = true;
	confirmDetail = false;
	compareOptions = false;
	currentEnergy = false;
	@api accountDetails = {};

	@wire(getAccountRecords , { recordId: (new URL(window.location.href)).searchParams.get('id') })
	wiredRecordsMethod({ error, data }) {
		if (data) {
			this.accountDetails.recordId = data[0].Contacts[0].Id;
			this.accountDetails.accountId = data[0].Id;
			this.accountDetails.accountName = data[0].Name;
			this.accountDetails.contactName = data[0].Contacts[0].Name;
			this.accountDetails.FirstName = data[0].Contacts[0].FirstName;
			this.accountDetails.LastName = data[0].Contacts[0].LastName;
			this.accountDetails.billingAddress = data[0].BillingAddress;
			this.accountDetails.BillingStreet = this.accountDetails.billingAddress.street;
			this.accountDetails.BillingCity = this.accountDetails.billingAddress.city;
			this.accountDetails.BillingPostalCode = this.accountDetails.billingAddress.postalCode;
			this.accountDetails.NotesfromLeadCreation__c = data[0].NotesfromLeadCreation__c;
			this.accountDetails.contactAddress = this.accountDetails.billingAddress.street + ', ' + this.accountDetails.billingAddress.city + ', ' + this.accountDetails.billingAddress.postalCode;
			this.accountDetails.error = undefined;
		} else if (error) {
			this.error = error;
		}
	}

	handlePageChangeEvent(event){
		[this.homePage, this.confirmDetail, this.compareOptions, this.currentEnergy] = [false, false, false, false];
		this.page = event.detail;
		switch (event.detail) {
			default:
				this.homePage = true;
			case '1':
				this.homePage = true;
				break;
			case '2':
				this.confirmDetail = true;
				break;
			case '3':
				this.compareOptions = true;
				break;
			case '4':
				this.currentEnergy = true;
				break;
		}
	}
}