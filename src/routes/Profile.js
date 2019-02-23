import React, { useRef } from 'react';
import ProfileForm from '@/components/onboard/ProfileForm';
import { useProfile } from '@/hooks/firebase';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

function Profile({ history }) {
	const data = useRef(null);

	const { value, loading, error } = useProfile();

	if (error) return <Error error={error} />;

	if (!data || loading || !value) return <Loading />;

	data.current = value.data() || {};

	return <ProfileForm />;
}

export default Profile;
