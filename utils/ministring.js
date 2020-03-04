// array which stores the range of decimal values
// for numbers, lowercase and uppercase characters
// from the ascii table
const characterTypes = [
	{
		type: 'number',
		start: 0,
		end: 9
	},
	{
		type: 'lowercase',
		start: 97,
		end: 122
	},
	{
		type: 'uppercase',
		start: 65,
		end: 90
	}
];

// gets a random value between two numbers (min and max included)
const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

// filters the characterTypes array and returns
// the character types the user wants
const parseCharacterTypes = obj => {
	const selectedCharacters = obj.characters
		.toString()
		.replace(/\s+/g, '')
		.split(',');

	const types = [];

	selectedCharacters.forEach(charType =>
		types.push(characterTypes.filter(characterType => characterType.type === charType)[0])
	);

	return types;
};

const generate = (obj = { characters: 'number, lowercase, uppercase', length: 6 }) => {
	if (!obj.characters) obj.characters = 'number, lowercase, uppercase';
	if (!obj.length) obj.length = 6;

	// array which will store all random characters
	const randomChars = [];
	const availableCharactersTypes = parseCharacterTypes(obj);

	// get n characters
	for (let i = 0; i < obj.length; i++) {
		// ---------------------------------------
		// chooses a random number between 0 and 2
		const tmpIndex = randomIntFromInterval(0, availableCharactersTypes.length - 1);

		// selects value type from characterTypes array
		// through the given index
		const tmpCharacterType = availableCharactersTypes[tmpIndex];
		const tmp = randomIntFromInterval(tmpCharacterType.start, tmpCharacterType.end);
		if (tmpCharacterType.type !== 'number') {
			randomChars.push(String.fromCharCode(tmp));
		} else {
			randomChars.push(tmp);
		}
	}

	// parse array to string
	const parsedString = randomChars.toString().replace(/,/g, '');

	return parsedString;
};

exports.generate = generate;
