import React from "react";
import classes from "./home.module.scss";

export default function StickyNotesHome() {
	return (
		<div className={classes.st}>

			<div className={classes.Sticky}>
				<div className={classes.Header}>
					<label for="title" />
	  				<input type="text"  name="title" placeholder="title" className={classes.title} />
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
