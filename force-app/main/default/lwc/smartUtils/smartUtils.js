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

const pageChangeEvent = (idValue = '1', accountDets, event) => {
	var value = {
		value: idValue,
		accountDets: accountDets
	};
	const pageChangeEvent = new CustomEvent('pagechange', {
		detail:  { value }
	});
	event.dispatchEvent(pageChangeEvent);
}

const makeShallowCopy = (source) => {
	return {
		...source,
	}
}

export { showToast, pageChangeEvent, makeShallowCopy };