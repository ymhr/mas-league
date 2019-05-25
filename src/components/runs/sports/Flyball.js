import React from 'react';
import { Form, Input } from 'antd';

export default function FlyballFields({ form, getFieldDecorator, data }) {
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
