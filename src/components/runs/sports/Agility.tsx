import React from 'react';
import { Form, Input, Select } from 'antd';
import { SportFieldProps } from '../Form';

export default function AgilityFields({ form, data }: SportFieldProps) {
	const { getFieldDecorator } = form;
	return (
		<>
			<Form.Item label="Class grade">
				{getFieldDecorator('grade', {
					rules: [
						{
							required: true,
							message: 'What grade was the class?'
						}
					],
					initialValue: data.grade
				})(<Input />)}
			</Form.Item>

			<Form.Item label="Class type">
				{getFieldDecorator('type', {
					rules: [
						{
							required: true,
							message: 'What type of class was it?'
						}
					],
					initialValue: data.type
				})(
					<Select>
						<Select.Option value="agility">Agility</Select.Option>
						<Select.Option value="jumping">Jumping</Select.Option>
						<Select.Option value="special">Special</Select.Option>
					</Select>
				)}
			</Form.Item>

			<Form.Item label="Graded or combined">
				{getFieldDecorator('gradedOrCombined', {
					rules: [
						{
							required: true,
							message: 'Graded or combined?'
						}
					],
					initialValue: data.gradedOrCombined
				})(
					<Select>
						<Select.Option value="graded">Graded</Select.Option>
						<Select.Option value="combined">Combined</Select.Option>
					</Select>
				)}
			</Form.Item>
		</>
	);
}
