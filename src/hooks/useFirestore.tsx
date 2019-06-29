import { useEffect, useState } from 'react';
import { firestore } from 'firebase';

function useFirestore<T>(
	collection: firestore.CollectionReference,
	transformResults?: (snapshot: firestore.QuerySnapshot) => T
) {
	const [data, setData] = useState<firestore.QuerySnapshot | T>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error>();

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
	}, [collection, transformResults]);

	return [data, loading, error];
}

export default useFirestore;
