import React, {Component} from 'react';
import Movie from './Movie';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            movies: [],
            search: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=2b3d06fab7ca7be5bb30264a8ec1b775&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
        .then(res => res.json())
        .then(res => this.setState({movies: res.results, isLoading: false}))
        .catch(err => console.log(err));
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick(event) {
        if(this.state.search.length > 0){
            this.setState({isLoading: true});
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=2b3d06fab7ca7be5bb30264a8ec1b775&language=en-US&query=${this.state.search}&page=1&include_adult=true`)
            .then(res=>res.json())
            .then(res=> this.setState({movies: res.results, isLoading: false}))
            .catch(err=>console.log(err));
        }
    }

    render() {
        const movies = this.state.movies.length > 0 ? this.state.movies.map((item)=>{
            return <Movie
                    className="col-md-3" 
                    image={item.poster_path}
                    title={item.title}
                    rating={item.vote_average}
                    description={item.overview}
                    date={item.release_date}
                    popular={item.popularity}
                    votes={item.vote_count}
                    originalTitle={item.original_title}
                    language={item.original_language}
                    adult={item.adult}
                    />
        }): "Could not find any movie";

        return (
            <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Movie Explorer</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                    <div class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" value={this.state.search} name="search" placeholder="Search" aria-label="Search" onChange={this.handleChange} />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleClick}>Search</button>
                    </div>
            </nav>

                <p style={{fontSize: "2rem"}}>{this.state.isLoading ? 'Loading...' : ""}</p>
                {movies}
            </div>
        )
    }
}

export default Header;