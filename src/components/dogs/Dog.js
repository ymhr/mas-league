import React, {useState} from 'react';
import posed from 'react-pose';

const Box = posed.div({
	open: { height: '400px' },
	closed: {  height: '30px'}
});

export default function Dog({dog}) {
	const [open, setOpen] = useState(false);
	const data = dog.data();

	function toggle() {
		console.log('called')
		setOpen(!open);
	}

	return (
		<Box onClick={toggle} pose={open ? 'open' : 'closed'}>{data.name}</Box>
	);
}