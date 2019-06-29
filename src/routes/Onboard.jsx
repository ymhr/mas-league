import React, { useRef } from 'react';
import ProfileForm from '@/components/onboard/ProfileForm';
import { useProfile } from '@/hooks/firebase';
import Loading from '@/components/Loading';
import { Steps, Button } from 'antd';
import DogForm from '@/components/onboard/DogForm';
import Error from '@/components/Error';

function Onboard({ getFieldDecorator, history }) {
	const data = useRef(null);

	const { profile, loading, error, hasRequiredProfileData } = useProfile();

	if (error) {
		return <Error error={error} />;
	}

	if (loading || !profile) return <Loading />;

	data.current = profile.data() || {};

	const currentStep = hasRequiredProfileData() ? 1 : 0;

	function redirectToHome() {
		history.push('/');
	}

	return (
		<>
			<h1>Welcome to the fun MAS league!</h1>
			<p>You must fill out some basic details before you can continue.</p>
			<p>
				Don't worry, we just need this information for administrative
				purposes.
			</p>
			<Steps current={currentStep}>
				<Steps.Step
					title="Profile"
					description="Some basic details about you"
				/>
				<Steps.Step
					title="Dogs"
					description="Add your dogs to your profile!"
				/>
			</Steps>
			{hasRequiredProfileData() ? (
				<>
					<DogForm />
					<Button type="primary" block onClick={redirectToHome}>
						Done
					</Button>
				</>
			) : (
				<ProfileForm />
			)}
		</>
	);
}

export default Onboard;
