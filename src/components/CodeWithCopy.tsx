import * as copyToClipboard from 'copy-to-clipboard';
import * as React from 'react';
import FaClipboard = require('react-icons/lib/fa/clipboard');
import styled from 'styled-components';
import asRendition from '../asRendition';
import { DefaultProps, EnhancedType, Tooltip } from '../common-types';
import { stopEvent } from '../utils';
import Button from './Button';
import Txt, { TxtProps } from './Txt';

export interface CodeWithCopyProps extends DefaultProps, Tooltip, TxtProps {
	color?: string;
	copy?: string;
	text: string;
	showCopyButton?: 'hover' | 'always';
}

export interface CodeWithCopyBaseProps extends DefaultProps, Tooltip, TxtProps {
	showCopyButton?: 'hover' | 'always';
}

const Wrapper = styled(Txt.span)<CodeWithCopyBaseProps>`
	white-space: initial;

	code {
		font-family: ${props => props.theme.monospace};
		padding: 2px 4px;
		font-size: 90%;
		color: #c7254e;
		background-color: #f9f2f4;
		border-radius: 2px;
		white-space: normal;
		word-wrap: break-word;
		font-size: 1em;
		margin-right: 3px;
	}

	.code-with-copy__copy {
		.text-selection--none;
		cursor: pointer;
		visibility: ${props =>
			props.showCopyButton
				? props.showCopyButton === 'always'
					? 'visible'
					: 'hidden'
				: 'visible'};
	}

	&:hover .code-with-copy__copy {
		visibility: visible;
	}
` as React.ComponentType<EnhancedType<CodeWithCopyBaseProps>>;

const Base = ({ copy, text, color, ...props }: CodeWithCopyProps) => {
	const normalizedText = (text || '').toString().trim();
	const normalizedCopy = (copy || normalizedText).toString().trim();

	return (
		<Wrapper {...props} className="code-with-copy">
			<code title={normalizedCopy}>{normalizedText || normalizedCopy}</code>

			<span onClick={e => stopEvent((e as any) as Event)}>
				<Button
					plaintext
					tooltip={{ text: 'Copied!', trigger: 'click' }}
					onClick={() => copyToClipboard(normalizedCopy)}
					className="code-with-copy__copy"
				>
					<FaClipboard color={color as string} />
				</Button>
			</span>
		</Wrapper>
	);
};

export default asRendition<CodeWithCopyProps>(Base, [], ['color']);
