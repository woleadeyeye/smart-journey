import { LightningElement, api } from 'lwc';
import { showToast, pageChangeEvent, makeShallowCopy } from 'c/smartUtils';
import saveDetailChange from '@salesforce/apex/SmartJourneyController.saveDetailChange';

export default class ConfirmDetailsPage extends LightningElement {

   @api accountDetails;

	renderedCallback() {
		document.querySelector('body').setAttribute("style", "background:#F1F1F1;border:1px solid #fdfdfd;color:#0a266a;");
	}

	firePageChangeEvent(event){
		pageChangeEvent(event.target.dataset.id, this.accountDetails, this);
	}

	handleDetailChange(event){
		const field = event.target.name;
		let recordVal = event.target.value;
		var shallow = makeShallowCopy(this.accountDetails);
		let recordId = field.split('-')[0] == 'Contact' ? this.accountDetails['accountRecord'][0].Contacts[0].Id : this.accountDetails['accountRecord'][0].Id;
		saveDetailChange({field : field.split('-')[1], data : recordVal, id : recordId})
		.then(result => {
			this.dispatchEvent(
				showToast('success', 'dismissable', 'success', field.split('-')[0] + ' saved successfully')
			);
		})
		.catch(error => {
			
		});
	}
}