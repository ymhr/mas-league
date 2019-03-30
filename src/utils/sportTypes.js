const typeSettings = {
	agility: {
		places: {
			1: '1st',
			2: '2nd',
			3: '3rd',
			4: '4th',
			5: '5th',
			6: '6th',
			7: '7th',
			8: '8th',
			9: '9th',
			10: '10th',
			'10+': '10+',
			upc: 'upc'
		}
	},
	obedience: {},
	flyball: {},
	showing: {},
	rally: {}
};

export default typeSettings;

export const types = Object.keys(typeSettings);
