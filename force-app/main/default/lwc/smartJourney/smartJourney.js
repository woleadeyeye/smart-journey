import { LightningElement, api, track, wire } from 'lwc';
import MPAN from '@salesforce/resourceUrl/MPAN';
import { getRecord } from 'lightning/uiRecordApi';
import getAccountRecords from '@salesforce/apex/SmartJourneyController.getAccountList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SMART_LOGO from '@salesforce/resourceUrl/HomePageHeader';

export default class SmartJourney extends LightningElement {

	@api recordId;
	isLoading = false;
	accountRecord;
	accountName;
	contactName;
	contactAddress;
	contactNotes;
	randomText;
	error;
	isHomePage = true;
	isCustomerProfileOpen = false;
	editAddressModal = false;
	SmartImage = SMART_LOGO;
	mpanImage = MPAN;

	@wire(getAccountRecords , { recordId: (new URL(window.location.href)).searchParams.get('id') })
	wiredRecordsMethod({ error, data }) {
		if (data) {
			this.accountRecord  = data;
			this.recordId = data[0].Contacts[0].Id;
			this.accountName = data[0].Name;
			this.contactName = data[0].Contacts[0].Name;
			let billingAddress = data[0].BillingAddress;
			this.contactNotes = data[0].NotesfromLeadCreation__c;
			this.contactAddress = billingAddress.street + ', ' + billingAddress.city + ', ' + billingAddress.postalCode;
			this.error = undefined;
		} else if (error) {
			this.error = error;
			this.accountRecord  = undefined;
		}
	}

	openChooseServicePage(){
		this.isHomePage = false;
		this.isChooseServicePage = true;
	}

	openCustomerProfileModal(){
		this.isCustomerProfileOpen = true;
	}

	openMainPage(){
		this.isHomePage = true;
		this.isChooseServicePage = false;
	}

	closeCustomerProfileModal(){
		this.isCustomerProfileOpen = false;
	}

	handleEditAddressModal(){
		this.editAddressModal = true;
	}

	closeRecordEditModal(){
		this.editAddressModal = false;
	}

	handleRecordEditSuccess(){
		this.showNotification();
		setTimeout(() => {
			this.editAddressModal = false;
		}, 1000);
	}

	showNotification() {
		const evt = new ShowToastEvent({
			title: 'Success',
			message: 'Record updated Successfully!',
			variant: 'success',
		});
		this.dispatchEvent(evt);
	}

	firePageChangeEvent(){
		this.isLoading = true;

		let timeout = new Promise((resolve, reject) => {
			let wait = setTimeout(() => {
				clearTimeout(wait);
				this.changePageEvent();
				this.isLoading = false;
			}, 800)
		  })

		timeout;
	}

	changePageEvent(){
		const value = 2;
		const pageChangeEvent = new CustomEvent('pagechange', {
            detail:  { value }
        });
		this.dispatchEvent(pageChangeEvent);
	}
}