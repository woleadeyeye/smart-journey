import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const showToast = (variant = 'info', mode = 'dismissable', title, message) => {
	const event = new ShowToastEvent({
		mode : mode,
		title : title,
		message : message,
		variant : variant
	});
	return event;
}

const pageChangeEvent = (event, cmp) => {
	const pageChangeEvent = new CustomEvent('pagechange', { detail: event.target.dataset.id });
	cmp.dispatchEvent(pageChangeEvent);
}

const makeShallowCopy = (source) => {
	return {
		...source,
	}
}

export { showToast, pageChangeEvent, makeShallowCopy };