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
		// save the value in local storage.
		var id = event.target.id;
        var val = event.target.value;
        localStorage.setItem(id, val);
	}

	render() {
		// Find out which CSS class is to be set on the note style.
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
						<SVG src={block} width={`1rem`}/>
						<label htmlFor="title" />
						<input  id={`noteHeader${this.props.id}`} onKeyUp={this.saveValue} type="text" defaultValue={this.props.headerContent} name="title" className={classes.Title}/>
						<SVG src={drag} width={`1rem`}/>
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
