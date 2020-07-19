import { LightningElement, api } from 'lwc';
import { showToast, pageChangeEvent } from 'c/smartUtils';
import saveDetailChange from '@salesforce/apex/SmartJourneyController.saveDetailChange';

export default class ConfirmDetailsPage extends LightningElement {

   @api accountDetailsFromParent;
	firePageChangeEvent(event){
		pageChangeEvent(event, this);
	}

	handleDetailChange(event){
		const field = event.target.name;
		let recordVal = event.target.value;
		/*if(field.split('-')[0] == 'Contact'){
			if(field.split('-')[1] == 'FirstName'){
				this.accountDetailsFromParent.FirstName = recordVal;
			}else{
				this.accountDetailsFromParent.LastName = recordVal;
			}
		}*/
		let recordId = field.split('-')[0] == 'Contact' ? this.accountDetailsFromParent.recordId : this.accountDetailsFromParent.accountId;
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