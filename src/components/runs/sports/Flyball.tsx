import React from 'react';
import { Form, Input } from 'antd';
import { SportFieldProps } from '../Form';

export default function FlyballFields({ form, data }: SportFieldProps) {
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
