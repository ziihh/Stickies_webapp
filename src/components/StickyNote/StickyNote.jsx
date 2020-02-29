import React from "react";
import classes from "./StickyNote.module.scss";

/* SVG files */
import SVG from 'react-inlinesvg';
import block from "../../media/SVG/block.svg";
import drag from "../../media/SVG/drag.svg";

class StickyNote extends React.Component {
	constructor(props) {
		super(props);

		this.saveValue = this.saveValue.bind(this);
	}

	saveValue(event) {
		var id = event.target.id;  // get the sender's id to save it .
        var val = event.target.value; // get the value.
        localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override .
	}

	render() {
		var colorStyles = "YellowNote";
		if(this.props.color === "YELLOWNOTE"){
			colorStyles = "" + classes.YellowNote;
		} else if (this.props.color === "BLUENOTE") {
			colorStyles = "" + classes.BlueNote;
		} else {
			colorStyles = "" + classes.BlackNote;
		}
		return (
			<div className={colorStyles} id={classes.defaultNoteStyle} ref={`sticky-note-${this.props.id}`}>
				<div className={classes.Sticky}>
					<div className={classes.Header}>
						<SVG src={block} />
						<label htmlFor="title" />
						<input  id={`noteHeader${this.props.id}`} onKeyUp={this.saveValue} type="text" defaultValue={this.props.headerContent} name="title" className={classes.Title}/>
						<SVG src={drag} />
					</div>
					<div className="NoteArea">
						<textarea id={`noteBody${this.props.id}`} onKeyUp={this.saveValue} className={classes.Content} rows="4" cols="50" ref="stNoteBody" defaultValue={this.props.bodyContent}>
						</textarea>
					</div>
				</div>
			</div>
		);
	}
}
export default StickyNote;
