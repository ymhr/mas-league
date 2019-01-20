import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import Loading from 'components/Loading';
import Error from 'components/Error';
import posed from 'react-pose';
import styled from 'styled-components';
import {Button} from 'antd';

const BoxPosed = posed.div({
	open: {
		height: 'auto',
		'background-color': '#eee',
		// 'box-shadow': '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
		'margin-bottom': '20px',
		position: 'relative',
		flip: true,
		duration: 300
	},
	closed: {
		height: 'auto',
		'background-color': '#fff',
		// 'box-shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.0)',
		'margin-bottom': '0px',
		position: 'relative',
		padding: '20px',
		flip: true,
		duration: 300
	}
});

const NamePosed = posed.h2({
	small: {
		'font-size': '16px',
		'font-weight': 'normal',
		padding: '0px',
		duration: 300
	},
	large: {
		'font-size': '30px',
		'font-weight': 'light',
		duration: 300
	}
});

const AppearingForm = posed.div({
	enter: {
		opacity: 1,
		height: 'auto',
		transform: 'translateY(0px)'
	},
	exit: {
		opacity: 0,
		height: '1px',
		transform: 'translateY(-20px)'
	}
});

const OverlayPosed = posed.div({
	visible: {
		opacity: 1
	},
	hidden: {
		opacity: 0
	}
});

const Box = styled(BoxPosed)`
	overflow: hidden;

	&.closed {
		z-index: 0;
		cursor: pointer;
		&:hover {
			background-color: #eee !important;
		}
	}

	&.open {
		z-index: 10;
	}
`;

const Name = styled(NamePosed)`
	margin: 0;
`;

const Close = styled(Button)`
	position: absolute;
	top: 5px;
	right: 5px;
`;

const Overlay = styled(OverlayPosed)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);

	&.hidden {
		pointer-events: none;
		z-index: 0;
	}

	&.visible {
		z-index: 9;
	}
`;

export default function Show({ match }) {
	const { dogId, showId } = match.params;

	const { loading, error, value } = useCollection(
		firebase.firestore().collection(`/dogs/${dogId}/shows/${showId}/runs`)
	);

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;

	return (
		<p>
			{dogId} {showId}
		</p>
	);
}
