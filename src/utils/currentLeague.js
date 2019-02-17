let name;

export default function() {
	if (name) return name;

	const date = new Date();

	name = date.getFullYear().toString();

	return name;
}
