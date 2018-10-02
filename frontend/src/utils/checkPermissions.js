export default {
	check(permission, crud, model) {
		let binary = permission.toString(2);
		binary = binary[0] == 1? '0' + binary : binary;
		return Array.from(Array(Math.floor(binary.length / 4)).keys())
		.map(i => {
			let position = ((i+1) * 4) - crud;
			return binary[position];
		})[model]
	}
}
