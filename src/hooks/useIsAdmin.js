import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import { useState } from 'react';
import { useDoc } from 'hooks/firebase';

export default function useIsAdmin() {
	const { initialising, user } = useAuthState(firebase.auth());
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(undefined);

	const { error, loading, value } = useDoc('meta', 'admin');

	//If we're done loading, and have not yet marked it as done, set it
	if (!loading && !initialising && isLoading === true) {
		setIsLoading(false);
	}

	//Better make a note of the errors so we can fix them
	if (error) {
		setHasError(error);
	}

	//Make a standard response
	const response = { isAdmin, loading: isLoading, error: hasError };

	//Exist early if we're loading, have an error, or have already determined that the user is an admin
	if (error || loading || initialising || isAdmin || !user) return response;

	//Is the user an admin?
	const { adminUids } = value.data();

	const userId = user.uid;

	if (adminUids.includes(userId)) {
		setIsAdmin(true);
	}

	return response;
}
