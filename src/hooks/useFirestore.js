import { useEffect, useState } from 'react';

function useFirestore(collection, transformResults = null) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const unsubscribe = collection.onSnapshot(
			function(snapshot) {
				if (transformResults) {
					setData(transformResults(snapshot));
				} else {
					setData(snapshot);
				}
				setLoading(false);
			},
			function(e) {
				console.error(e);
				setError(e);
				setLoading(false);
			}
		);

		return unsubscribe;
	}, []);

	return [data, loading, error];
}

export default useFirestore;
