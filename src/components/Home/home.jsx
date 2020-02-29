import React, {useState} from "react";

import classes from "./home.module.scss";
import StickyNote from "../StickyNote/StickyNote.jsx";

/* SVG files */
import SVG from 'react-inlinesvg';
import plus from "../../media/SVG/plus.svg";
import file from "../../media/SVG/file.svg";
import trash from "../../media/SVG/trash.svg";
import draw from "../../media/SVG/draw.svg";
class Home extends React.Component {

	constructor(props) {
		super(props);

		this.addNote = this.addNote.bind(this);
		this.deleteAllNotes = this.deleteAllNotes.bind(this);
		this.onChangeColorSelection = this.onChangeColorSelection.bind(this);
		this.onPageUnload = this.onPageUnload.bind(this);
		this.getInitState = this.getInitState.bind(this);

		this.state = this.getInitState();

		window.onbeforeunload = this.onPageUnload();


	}

	addNote() {
		this.setState({
			nrOfNotes: this.state.nrOfNotes + 1
		});
	}

	deleteAllNotes(){
		this.setState({
		  nrOfNotes: 0,
		  notes: [],
		  selectedColor: "YELLOWNOTE"
		});
	}

	getInitState() {
		var selectColor = "YELLOWNOTE";
		var nrOfNotes = 0;
		var notes = [];

		if(localStorage.getItem("SelectColor")) {
			selectColor = localStorage.getItem("SelectColor")
		}
		if(localStorage.getItem("NrOfNotes")) {
			nrOfNotes = localStorage.getItem("NrOfNotes")
		}
		if(localStorage.getItem("Notes")) {
		//	notes = JSON.parse(localStorage.getItem("Notes") || "[]").notes;
		}

		return {
			selectedColor: selectColor,
			nrOfNotes: nrOfNotes,
			notes: notes
		};
	}

	onChangeColorSelection(event){
		this.state.selectedColor = event.target.value;
	}

	onPageUnload() {
		localStorage.clear();

		localStorage.setItem("NrOfNotes", this.state.nrOfNotes);
		localStorage.setItem("SelectColor", this.state.selectedColor);
		localStorage.setItem("Notes", JSON.stringify({notes: this.state.notes}));
	}

	render() {
		var renderNotes = []
		if (this.state.nrOfNotes != 0) {
			for (var i = (this.state.nrOfNotes - 1); i < this.state.nrOfNotes; i += 1) {
				this.state.notes.push({
					id: i,
					color: this.state.selectedColor
				});
				renderNotes.push(<StickyNote color={this.state.selectedColor} />);
			};
		}
		return (
			<div>
				<div className={classes.HeaderContainer}>
					<div className={classes.Wrapper}>
						<SVG src={file}  width={`2rem`} />
						<p className={classes.NonClickHeading}>{this.state.nrOfNotes}</p>
					</div>
					<div className={classes.Wrapper} onClick={this.addNote} >
						<SVG src={plus} width={`1.5rem`}  />
						<p className={classes.Heading}>Add Note</p>
					</div>
					<div className={classes.Wrapper} onClick={this.deleteAllNotes} >
						<SVG src={trash} width={`1.5rem`}  />
						<p className={classes.Heading}>Delete all notes</p>
					</div>

					<div className={classes.Wrapper} onClick={this.onChangeColorSelection} >
						<SVG src={draw} width={`2rem`}  />
						<p>Color</p>
						<select className={classes.ColorOption}>
							<option value="YELLOWNOTE">Yellow</option>
							<option value="BLACKNOTE">Black</option>
							<option value="BLUENOTE">Blue</option>
						</select>
					</div>

				</div>
				<div className={classes.HomeContainer}>
					{renderNotes}
				</div>
			</div>
		);
	}
}

export default Home;