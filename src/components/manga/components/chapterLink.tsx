// React imports
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

// Interfaces
interface chapterLinkProps {
	label: string;
	slug: string
}

// Components
const ChapterLink: FunctionComponent<chapterLinkProps> = ({ label, slug }) => {
	return (
		<Link className="chapterLink fwDoPadding" to={slug}>
			{label}
		</Link>
	)
}

export default ChapterLink;
