import { LightningElement } from 'lwc';
import KWH from '@salesforce/resourceUrl/KWH';
import path from '@salesforce/resourceUrl/path';
import MPAN from '@salesforce/resourceUrl/MPAN';
import MPANNew from '@salesforce/resourceUrl/MPANNew';
import backArrow from '@salesforce/resourceUrl/backArrow';

export default class CurrentEnergyPage extends LightningElement {
	KWH = KWH;
	path = path;
	MPAN = MPAN;
	MPANNew = MPANNew;
	backArrow = backArrow;
	copyOfBillsValue = '';
	contractStatusValue = '';

	get copyOfBillsOptions() {
		return [
			{ label: 'Yes', value: 'Yes' },
			{ label: 'No', value: 'No' },
		];
	}

	get contractStatusOptions() {
		return [
			{ label: 'In Contract', value: 'In Contract' },
			{ label: 'Out of Contract', value: 'Out of Contract' },
		];
	}

	firePageChangeEvent(){
		const value = 1;
		const pageChangeEvent = new CustomEvent('pagechange', {
			detail:  { value }
		});
		this.dispatchEvent(pageChangeEvent);
	}

}