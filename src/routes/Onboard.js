import React from 'react';
import ProfileForm from 'components/onboard/ProfileForm';
import { useHasProfile } from 'hooks/firebase';

function Onboard({ getFieldDecorator }) {
	// const hasProfile = useHasProfile();

	return (
		<>
			<h1>Welcome to the fun MAS league!</h1>
			<p>You must fill out some basic details before you can continue.</p>
			<p>
				Don't worry, we just need this information for administrative
				purposes.
			</p>
			<ProfileForm />
		</>
	);
}

export default Onboard;
