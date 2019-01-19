import React, { useRef } from 'react';
import ProfileForm from 'components/onboard/ProfileForm';
import { useProfile } from 'hooks/firebase';
import Loading from 'components/Loading';

function Onboard({ getFieldDecorator }) {
	const data = useRef(null);

	const { value, loading, error } = useProfile();

	if (!data || loading || error || !value) return <Loading />;

	data.current = value.data();

	const hasRequiredData = ['firstName', 'lastName']
		.map((fieldName) => !!data.current[fieldName])
		.every((f) => f);

	return (
		<>
			<h1>Welcome to the fun MAS league!</h1>
			<p>You must fill out some basic details before you can continue.</p>
			<p>
				Don't worry, we just need this information for administrative
				purposes.
			</p>
			{hasRequiredData ? <h1>All good!</h1> : <ProfileForm />}
		</>
	);
}

export default Onboard;
