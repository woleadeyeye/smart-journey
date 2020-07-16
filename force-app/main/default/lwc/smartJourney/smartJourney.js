import { LightningElement, api, wire } from 'lwc';
import MPAN from '@salesforce/resourceUrl/MPAN';
import { pageChangeEvent } from 'c/smartUtils';
import getAccountRecords from '@salesforce/apex/SmartJourneyController.getAccountList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SMART_LOGO from '@salesforce/resourceUrl/HomePageHeader';

export default class SmartJourney extends LightningElement {

	@api recordId;
	accountDetails = {};
	isLoading = false;
	isHomePage = true;
	isCustomerProfileOpen = false;
	SmartImage = SMART_LOGO;
	mpanImage = MPAN;

	@wire(getAccountRecords , { recordId: (new URL(window.location.href)).searchParams.get('id') })
	wiredRecordsMethod({ error, data }) {
		if (data) {
			this.accountRecord  = data;
			this.accountDetails.accountRecord = data;
			this.accountDetails.recordId = data[0].Contacts[0].Id;
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
			this.accountRecord  = undefined;
		}
	}

	renderedCallback() {
		document.querySelector('body').setAttribute("style", "background-color: #08266B;border:1px solid #fdfdfd;color:white;");
	}

	openCustomerProfileModal(){
		this.isCustomerProfileOpen = true;
	}

	closeCustomerProfileModal(){
		this.isCustomerProfileOpen = false;
	}

	showNotification() {
		const evt = new ShowToastEvent({
			title: 'Success',
			message: 'Record updated Successfully!',
			variant: 'success',
		});
		this.dispatchEvent(evt);
	}
	firePageChangeEvent(event){
		pageChangeEvent(event.target.dataset.id, this.accountDetails, this);
		/*this.isLoading = true;
		const value = event.target.dataset.id;

		let timeout = new Promise((resolve, reject) => {
			let wait = setTimeout(() => {
				clearTimeout(wait);
				this.changePageEvent(value);
				this.isLoading = false;
			}, 100)
		  })

		timeout;*/
	}
}