import React, { Component } from "react";
import axios from 'axios';
import Nav from "./nav";
import Couch from "../images/couch.png";
import Car from "../images/car.png";
import Results from "./results";
import "../App.css";
require ('date-format-lite');

class Search extends Component {
	constructor() {
		super();
		this.state = {
			searchType: "new",
			zip: '',
			date: '',
			movieData: [
    {
        "tmsId": "MV010222660000",
        "rootId": "14373731",
        "subType": "Feature Film",
        "title": "Professor Marston & the Wonder Women",
        "releaseYear": 2017,
        "releaseDate": "2017-09-09",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": [
            "Biography",
            "Historical drama"
        ],
        "longDescription": "If behind every great man is a great woman, then Harvard psychologist and inventor Dr. William Moulton Marston has the good fortune of having two -- his wife Elizabeth and their mutual lover Olive Byrne. In addition to helping him perfect the lie detector test, the two women also inspire him to create one of the greatest female superheroes of all time -- the beloved comic book character Wonder Woman.",
        "shortDescription": "Two women inspire Dr. William Moulton Marston to create the comic book character Wonder Woman.",
        "topCast": [
            "Luke Evans",
            "Rebecca Hall",
            "Bella Heathcote"
        ],
        "directors": [
            "Angela Robinson"
        ],
        "qualityRating": {
            "ratingsBody": "TMS",
            "value": "3"
        },
        "ratings": [
            {
                "body": "Motion Picture Association of America",
                "code": "R"
            }
        ],
        "advisories": [
            "Adult Language",
            "Adult Situations",
            "Nudity",
            "Strong Sexual Content"
        ],
        "runTime": "PT01H48M",
        "preferredImage": {
            "width": "240",
            "height": "360",
            "caption": {
                "content": "Professor Marston & the Wonder Women (2017)",
                "lang": "en"
            },
            "uri": "assets/p14373731_p_v5_aa.jpg",
            "category": "Poster Art",
            "text": "yes",
            "primary": "true"
        },
        "showtimes": [
            {
                "theatre": {
                    "id": "11401",
                    "name": "Syndicated"
                },
                "dateTime": "2017-11-17T18:45",
                "barg": false
            }
        ]
    },
    {
        "tmsId": "MV009826690000",
        "rootId": "13844679",
        "subType": "Feature Film",
        "title": "Logan Lucky",
        "releaseYear": 2017,
        "releaseDate": "2017-08-18",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": [
            "Comedy"
        ],
        "longDescription": "West Virginia family man Jimmy Logan teams up with his one-armed brother Clyde and sister Mellie to steal money from the Charlotte Motor Speedway in North Carolina. Jimmy also recruits demolition expert Joe Bang to help them break into the track's underground system. Complications arise when a mix-up forces the crew to pull off the heist during a popular NASCAR race while also trying to dodge a relentless FBI agent.",
        "shortDescription": "Three siblings team up with a demolition expert to steal money from the Charlotte Motor Speedway.",
        "topCast": [
            "Channing Tatum",
            "Adam Driver",
            "Farrah Mackenzie"
        ],
        "directors": [
            "Steven Soderbergh"
        ],
        "officialUrl": "http://www.loganluckymovie.com/",
        "qualityRating": {
            "ratingsBody": "TMS",
            "value": "3"
        },
        "ratings": [
            {
                "body": "Motion Picture Association of America",
                "code": "PG-13"
            }
        ],
        "advisories": [
            "Adult Language",
            "Adult Situations",
            "Violence"
        ],
        "runTime": "PT01H59M",
        "preferredImage": {
            "width": "240",
            "height": "360",
            "uri": "assets/p13844679_v_v5_ac.jpg",
            "category": "VOD Art",
            "text": "yes",
            "primary": "true"
        },
        "showtimes": [
            {
                "theatre": {
                    "id": "11401",
                    "name": "Syndicated"
                },
                "dateTime": "2017-11-17T21:20",
                "barg": false
            }
        ]
    },
    {
        "tmsId": "MV000162640000",
        "rootId": "7834",
        "subType": "Feature Film",
        "title": "Videodrome",
        "releaseYear": 1983,
        "releaseDate": "1983-01-28",
        "titleLang": "en",
        "descriptionLang": "en",
        "entityType": "Movie",
        "genres": [
            "Horror"
        ],
        "longDescription": "As the president of a trashy TV channel, Max Renn (James Woods) is desperate for new programming to attract viewers. When he happens upon \"Videodrome,\" a TV show dedicated to gratuitous torture and punishment, Max sees a potential hit and broadcasts the show on his channel. However, after his girlfriend (Deborah Harry) auditions for the show and never returns, Max investigates the truth behind Videodrome and discovers that the graphic violence may not be as fake as he thought.",
        "shortDescription": "The manager (James Woods) of a Toronto cable-TV station tracks an unlisted torture/death show.",
        "topCast": [
            "James Woods",
            "Deborah Harry",
            "Sonja Smits"
        ],
        "directors": [
            "David Cronenberg"
        ],
        "qualityRating": {
            "ratingsBody": "TMS",
            "value": "2.5"
        },
        "ratings": [
            {
                "body": "Motion Picture Association of America",
                "code": "R"
            }
        ],
        "advisories": [
            "Adult Language",
            "Adult Situations",
            "Graphic Violence",
            "Nudity"
        ],
        "runTime": "PT01H30M",
        "preferredImage": {
            "width": "240",
            "height": "360",
            "uri": "assets/p7834_v_v5_ab.jpg",
            "category": "VOD Art",
            "text": "yes",
            "primary": "true"
        },
        "showtimes": [
            {
                "theatre": {
                    "id": "11401",
                    "name": "Syndicated"
                },
                "dateTime": "2017-11-17T23:59",
                "barg": false
            }
        ]
    }],
			tvData: []
		};
		this.getDate = this.getDate.bind(this);
		this.getMovies = this.getMovies.bind(this);
	}

	componentDidMount(){
		this.getDate();
		console.log(this.state.movieData);
	}

	getDate() {
		const d = new Date();
		console.log("The original format ", d);
		const newDate = d.format("YYYY-MM-DD");
		this.setState({ date: newDate });
	}

	newSearch() {
		this.setState({ searchType: "new" });
	}

	searchIn() {
		this.setState({ searchType: "searchIn" });
		console.log("Showing search results for option one");
		this.getTv();
	}

	searchOut() {
		this.setState({ searchType: "searchOut" });
		console.log("Showing search results for option one");
	}

	getZip(e, input) {
		const zip = e.target.value;
		this.setState({ zip: zip });
		console.log("Zipcode is ", this.state.zip);
		console.log("Time of search is ", this.state.date);
	}

	getMovies(event){
	// get all movies with time and zip code
		event.preventDefault();
		axios.get(`${this.props.url}/movies/${this.state.zip}/${this.state.date}`).then(res => {
			console.log(res.data);
			this.setState({ movieData: res.data });
			// this.props.history.push(`/results`);
		}).catch(err => {
			console.log("Error fetching movie data");
		})
	}

	// getTv(){
	// 	get all tv shows with time
	// 	axios(`${this.props.url}/tv`).then(res => {
	// 		this.setState({ tvData: response.data.tv });
	// 		this.props.history.push(`/results`);
	// 	}).catch(err => {
	// 		console.log("Error fetching TV data");
	// 	})
	// }


	render() {
		return <Results movieData={this.state.movieData}/>
	}
	// render() {
	// 	return (
	// 		<div className="search-content">
	// 		{this.state.searchType === "new" && (
	// 			<div className="search-header">
	// 			<p className="search-text">How bored are you?</p>
	// 			<Nav logoutUser={this.props.logoutUser} />
	// 			</div>
	// 			)}
	// 		{this.state.searchType === "searchOut" && (
	// 			<div className="search-header">
	// 			<div className="results-text-content">
	// 			<p className="results-logo">Bored</p>
	// 			<p className="results-location">& leaving the house</p>
	// 			</div>
	// 			<Nav logoutUser={this.props.logoutUser} newSearch={this.newSearch.bind(this)}/>
	// 			</div>
	// 			)}

	// 		{this.state.searchType === "new" && (
	// 					<div className="search-body">
	// 					<div className="search-body-buttons">
	// 						<div className="couch-button" onClick={this.searchIn.bind(this)}>
	// 							<img src={Couch} alt="Couch"/>
	// 						</div>
	// 						<p>I'm parked on the couch</p>
	// 					</div>
	// 					<div className="search-body-buttons" onClick={this.searchOut.bind(this)}>
	// 						<div className="car-button">
	// 							<img src={Car} alt="Car" />
	// 						</div>
	// 						<p>I need to leave the house</p>
	// 					</div>
	// 				</div>
	// 			)}
	// 		{this.state.searchType === "searchOut" && (
	// 			<div className="search-out-body">
	// 			<p className="search-res-text">Where are you?</p>
	// 			<form onSubmit={this.getMovies}>
	// 			<input type="text" placeholder="i.e. 11237" value={this.state.zip} onChange={e => this.getZip(e, "zip")}/>
	// 			<input type="submit" value="Search"/>
	// 			</form>
	// 			</div>
	// 			)}
	// 		</div>
	// 	);
	// }
}

export default Search;