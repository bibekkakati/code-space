export default function debounce(fn, delayTime) {
	//Creating a closure with function
	let timer;
	return function () {
		let context = this;
		//Clearing previous timeout if another key is pressed before delayTime
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(context);
		}, delayTime);
	};
}
