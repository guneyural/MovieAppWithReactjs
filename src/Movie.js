import React, {Component} from 'react';

class Movie extends Component {
    constructor() {
        super();
        this.state = {
            showMore: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        const {showMore} = this.state;
        this.setState({showMore: !showMore});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                        <div className="card shadow-sm p3" style={{width:'18rem'}}>
                            <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${this.props.image}`} className="card-img-top" alt={this.props.title} />
                            <div className="card-body">
                                <div className="mb-4 d-flex justify-conten-between">
                                    <h4 className="card-title">{this.props.title}</h4>
                                    <p className="mr-0" style={this.props.rating > 5 ? {color:'red', fontWeight: 'bold'} : {color:'black'}}>{this.props.rating}</p>
                                </div>

                                <p className="card-text">{this.props.description}</p>
                                <p className="text-muted">{this.props.date}</p>
                                {this.state.showMore ? details(this.props) : ""}
                                <input type="submit" value={this.state.showMore ? 'Show Less' : 'Show More'} onClick={this.handleClick} className="btn btn-primary" />
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

function details(props){
    return (
        <div>
            <p>Popularity: {props.popular}</p>
            <p>Votes: {props.votes}</p>
            <p>Original Title: {props.originalTitle}</p>
            <p>Language: {props.language}</p>
            <p>For Adults: {props.adult ? "yes" : "no"}</p>
        </div>
    );
}

export default Movie;