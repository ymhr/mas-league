import React from 'react';
import currentLeague from '@/utils/currentLeague';
import styled from 'styled-components';

const BorderedTable = styled.table`
	td {
		border-bottom: 1px solid #ccc;
		padding: 3px;
	}
`;

export default function() {
	const leagueName = currentLeague();

	return (
		<>
			<h1>Welcome to the MAS League!</h1>
			<p>
				Welcome the Miniature American Shepherd Agility League. This is
				just for fun!
			</p>
			<p>
				This is open to anyone who runs a Miniature American Shepherd in
				agility in the UK. To join it is £4 per dog.
			</p>
			<p>
				The league will run from 01/01/{leagueName} until 20/12/
				{leagueName}. All shows and placings count, including special
				classes.
			</p>

			<h3>Points</h3>
			<BorderedTable>
				<tbody>
					<tr>
						<td>1st</td>
						<td>20</td>
					</tr>
					<tr>
						<td>2nd</td>
						<td>19</td>
					</tr>
					<tr>
						<td>3rd</td>
						<td>18</td>
					</tr>
					<tr>
						<td>4th</td>
						<td>17</td>
					</tr>
					<tr>
						<td>5th</td>
						<td>16</td>
					</tr>
					<tr>
						<td>6th</td>
						<td>15</td>
					</tr>
					<tr>
						<td>7th</td>
						<td>14</td>
					</tr>
					<tr>
						<td>8th</td>
						<td>13</td>
					</tr>
					<tr>
						<td>9th</td>
						<td>12</td>
					</tr>
					<tr>
						<td>10th</td>
						<td>11</td>
					</tr>
					<tr>
						<td>10+</td>
						<td>10</td>
					</tr>
					<tr>
						<td>Clear rounds</td>
						<td>2</td>
					</tr>
				</tbody>
			</BorderedTable>
			<p>
				<strong>
					All classes count, including special classes and fun classes
				</strong>
			</p>

			<p>The league is split into 3 groups:</p>
			<BorderedTable>
				<tbody>
					<tr>
						<td>Beginner</td>
						<td>Grades 1 and 2</td>
					</tr>
					<tr>
						<td>Novice</td>
						<td>Grades 3, 4, and 5</td>
					</tr>
					<tr>
						<td>Senior</td>
						<td>Grades 6 and 7</td>
					</tr>
				</tbody>
			</BorderedTable>
			<p>You will be competing in your own group.</p>
			<p>
				At the end of the year, the winnner of each group will win a
				trophy, and we will do rosettes for 1st, 2nd and 3rd.
			</p>
		</>
	);
}
