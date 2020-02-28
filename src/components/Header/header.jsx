import React, {useState} from "react";

import classes from "./header.module.scss";
import StickyNote from "../Home/StickyNote.jsx";

/* SVG files */
import SVG from 'react-inlinesvg';
import plus from "../../media/SVG/plus.svg";

class Header extends React.Component {

	constructor(props) {
		super(props);

		this.addNote = this.addNote.bind(this);

		this.state = {
		  nrOfNotes: 0
		};
	}

	addNote() {
		this.setState({
			nrOfNotes: this.state.nrOfNotes + 1
		});
	}
	render() {
	  	const notes = [];

		for (var i = 0; i < this.state.nrOfNotes; i += 1) {
			notes.push(<StickyNote />);
		};

		return (
			<div>
				<div className={classes.HeaderContainer}>
					<div className={classes.AddNote}>
						<SVG src={plus} width={`2rem`} onClick={this.addNote} />
					</div>
				</div>
				<div>
					{notes}
				</div>
			</div>
		);
	}
}

export default Header;