import styled from 'styled-components';

interface ContainerProps {
	mobilePadding: string;
}

const Container = styled.div`
	width: 80vw;
	margin: 0 auto;
	padding-top: 10px;

	@media screen and (max-width: 600px) {
		padding: 0 ${(props: ContainerProps) => props.mobilePadding || '20px'};
		padding-top: 10px;
		width: 100%;
	}
`;

export default Container;
