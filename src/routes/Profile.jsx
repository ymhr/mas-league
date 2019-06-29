import React, { useRef } from 'react';
import ProfileForm from '@/components/onboard/ProfileForm';
import { useProfile } from '@/hooks/firebase';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

function Profile() {
	const data = useRef(null);

	const { profile, loading, error } = useProfile();

	if (error) return <Error error={error} />;

	if (loading || !profile) return <Loading />;

	data.current = profile.data() || {};

	return <ProfileForm />;
}

export default Profile;
