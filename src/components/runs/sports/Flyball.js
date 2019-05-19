import React from 'react';
import { Form, Input } from 'antd';

export default function AgilityFields({ form, data }) {
	const { getFieldDecorator } = form;
	return (
		<>
			<Form.Item label="Time">
				{getFieldDecorator('time', {
					rules: [
						{
							required: true,
							message: 'How fast did you complete the run?'
						}
					],
					initialValue: data.time
				})(<Input />)}
			</Form.Item>
		</>
	);
}
