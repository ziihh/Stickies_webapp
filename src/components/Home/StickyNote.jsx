import React from "react";
import classes from "./StickyNote.module.scss";

/* SVG files */
import SVG from 'react-inlinesvg';
import block from "../../media/SVG/block.svg";
import drag from "../../media/SVG/drag.svg";

class StickyNote extends React.Component {
	render() {
		return (
			<div className={classes.YellowNote} id={classes.defaultNoteStyle}>

				<div className={classes.Sticky}>
					<div className={classes.Header}>
						<SVG src={block} />
						<label for="title" />
						<input type="text"  name="title" placeholder="title" className={classes.title} />
						<SVG src={drag} />
					</div>
					<div className="NoteArea">
						<textarea className={classes.content} rows="4" cols="50">
							hellow
						</textarea>
					</div>
				</div>
			</div>
		);
	}
}
export default StickyNote;
