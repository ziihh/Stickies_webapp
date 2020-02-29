import React from "react";
import $ from "jquery";

import classes from "./home.module.scss";
import StickyNote from "../StickyNote/StickyNote.jsx";

/* SVG files */
import SVG from 'react-inlinesvg';
import plus from "../../media/SVG/plus.svg";
import file from "../../media/SVG/file.svg";
import trash from "../../media/SVG/trash.svg";
import draw from "../../media/SVG/draw.svg";
import arrow from "../../media/SVG/arrow.svg";
class Home extends React.Component {

	constructor(props) {
		super(props);

		this.addNote = this.addNote.bind(this);
		this.deleteAllNotes = this.deleteAllNotes.bind(this);
		this.onChangeColorSelection = this.onChangeColorSelection.bind(this);
		this.onPageUnload = this.onPageUnload.bind(this);
		this.getInitState = this.getInitState.bind(this);
		this.onHashChange = this.onHashChange.bind(this);

		// Get the initial state.
	    this.state = this.getInitState();

	}

	componentDidMount() {
		// Set the selected color and event on page.
		this.state.selectedColor = window.location.hash.split('#')[1];
      	window.addEventListener("beforeunload", this.onPageUnload);
      	window.addEventListener("hashchange", this.onHashChange);
    }

	addNote() {
		// Increase the nr of notes by 1.
		this.setState({
			nrOfNotes: this.state.nrOfNotes + 1
		});
	}

	deleteAllNotes(){
		// Reset the state as it was new.
		this.setState({
		  nrOfNotes: 0,
		  notesData: [],
		  renderNotes: [],
		  selectedColor: "YELLOWNOTE"
		});
	}

	getInitState() {
		var selectColor = "YELLOWNOTE";
		var nrOfNotes = 0;
		var notesData = [];
		var renderNotes = [];

		// Get the stored note data in local storage.
		if(localStorage.getItem("SelectColor")) {
			selectColor = localStorage.getItem("SelectColor")
		}
		if(localStorage.getItem("NrOfNotes")) {
			nrOfNotes = localStorage.getItem("NrOfNotes")
		}
		if(localStorage.getItem("NotesData")) {
			notesData = JSON.parse(localStorage.getItem("NotesData") || "[]").notesData;
		}
		if(localStorage.getItem("RenderNotes")) {
			renderNotes = JSON.parse(localStorage.getItem("RenderNotes") || "[]").renderNotes;
		}

		return {
			selectedColor: selectColor,
			nrOfNotes: parseInt(nrOfNotes, 10),
			notesData: notesData,
			renderNotes: renderNotes,
			isReloaded: true
		};
	}

	onChangeColorSelection(event){
		this.state.selectedColor = event.target.value;
	}

	onHashChange(event) {
		this.state.selectedColor = window.location.hash.split('#')[1];
	}

	onPageUnload(event) {
		// On refresh store the data in local storage.
		for (var i = 0; i < this.state.nrOfNotes; i++) {
			this.state.notesData[i].headerContent = localStorage.getItem(this.state.notesData[i].noteHeaderId);
			this.state.notesData[i].bodyContent = localStorage.getItem(this.state.notesData[i].noteBodyId);
		}

		localStorage.setItem("NrOfNotes", this.state.nrOfNotes);
		localStorage.setItem("SelectColor", this.state.selectedColor);
		localStorage.setItem("NotesData", JSON.stringify({notesData: this.state.notesData}));
		localStorage.setItem("RenderNotes", JSON.stringify({renderNotes: this.state.renderNotes}));

		// Chrome requires returnValue to be set
  		event.returnValue = '';
	}

	render() {
		var noOfNotesToRender = 0;

		// has page been reloaded?
		if(this.state.isReloaded) {
			noOfNotesToRender = 0;		// Render all notes.
			this.state.isReloaded = false;	// Reset the isReloaded.

			// Loop through the nr of notes to be rendered.
			for (var i = noOfNotesToRender; i < this.state.nrOfNotes; i += 1) {

				// Fill the array with Note component to be rendered.
				this.state.renderNotes.push(
					<StickyNote
						color={this.state.notesData[i].color}
						headerContent={this.state.notesData[i].headerContent}
						bodyContent={this.state.notesData[i].bodyContent}
						id={i}
						key={"sticky-note-" + i}
					/>
				);
			};
		} else {	// Page has not been refreshed.
			// Only the last note is to be rendered.
			noOfNotesToRender = (this.state.nrOfNotes - 1); // Render only the last note added.
			if (this.state.nrOfNotes != 0) {

				// JUST NOTICED I DONT NEED A LOOP,
				// But this would create note data and push a Note component to the TOBE rendered array.
				for (var i = noOfNotesToRender; i < this.state.nrOfNotes; i += 1) {
					this.state.notesData.push({
						key: "sticky-note-" + i,
						noteHeaderId: "noteHeader" + i,
						noteBodyId: "noteBody" + i,
						headerContent: "Title",
						bodyContent: "Content",
						color: this.state.selectedColor
					});
					this.state.renderNotes.push(
						<StickyNote
							color={this.state.selectedColor}
							headerContent={this.state.notesData[i].headerContent}
							bodyContent={this.state.notesData[i].bodyContent}
							id={i}
							key={"sticky-note-" + i}
						/>
					);
				};
			}
		}

		return (
			<div className={classes.Home}>
				<div className={classes.HeaderContainer}>
					<div className={classes.Wrapper}>
						<h1 className={classes.Header}>Stickiess app</h1>
					</div>
					<div className={classes.Wrapper}>
						<SVG className={classes.DefaultSVGStyle} src={file}  width={`2rem`} />
						<p className={classes.NonClickHeading}>{this.state.nrOfNotes}</p>
					</div>
					<div className={classes.Wrapper} onClick={this.addNote} >
						<SVG className={classes.DefaultSVGStyle} src={plus} width={`1.5rem`}  />
						<p className={classes.Heading}>Add Note</p>
					</div>
					<div className={classes.Wrapper} onClick={this.deleteAllNotes} >
						<SVG className={classes.DefaultSVGStyle} src={trash} width={`1.5rem`}  />
						<p className={classes.Heading}>Delete all notes</p>
					</div>

					<div className={classes.Wrapper} onClick={this.onChangeColorSelection} >
						<SVG className={classes.DefaultSVGStyle} src={draw} width={`2rem`}  />
						<p className={classes.Heading}>Color</p>
						<div className={classes.DropdownColor}>

						    <SVG className={classes.DropdownArrow} src={arrow} width={`1rem`}  />
							<div className={classes.DropdownColorContent}>
						      <a className={classes.YellowBackGround} href="#YELLOWNOTE">Yellow</a>
						      <a className={classes.BlueBackGround} href="#BLUENOTE">Blue</a>
						      <a className={classes.BlackBackGround} href="#BLACKNOTE">Black</a>
						    </div>
						</div>
					</div>

				</div>
				<div className={classes.HomeContainer}>
					{this.state.renderNotes}
				</div>
			</div>
		);
	}
}

export default Home;