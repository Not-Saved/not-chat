module.exports = () => {
	const store = {};

	function add(key, value) {
		store[key] ? store[key].push(value) : (store[key] = [value]);
	}

	function remove(key, value) {
		if (!store[key]) return;
		if (store[key].length === 1) {
			delete store[key];
		} else {
			store[key].splice(store[key].indexOf(value), 1);
		}
	}

	return [store, add, remove];
};
