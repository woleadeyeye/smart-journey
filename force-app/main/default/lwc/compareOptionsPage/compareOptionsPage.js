import { LightningElement, api } from 'lwc';
import { pageChangeEvent } from 'c/smartUtils';

export default class CompareOptionsPage extends LightningElement {
	@api accountDetailsFromParent;

	renderedCallback() {
		document.querySelector('body').setAttribute("style", "background:#F1F1F1;border:1px solid #fdfdfd;color:#0a266a;");
	}
	firePageChangeEvent(event){
		pageChangeEvent(event, this);
	}
}