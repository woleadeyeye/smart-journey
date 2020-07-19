import { LightningElement, api, wire } from 'lwc';
import MPAN from '@salesforce/resourceUrl/MPAN';
import { pageChangeEvent } from 'c/smartUtils';
import SMART_LOGO from '@salesforce/resourceUrl/HomePageHeader';

export default class SmartJourney extends LightningElement {

	@api accountDetailsFromParent;
	isLoading = false;
	isCustomerProfileOpen = false;
	SmartImage = SMART_LOGO;
	mpanImage = MPAN;

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
		pageChangeEvent(event, this);
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