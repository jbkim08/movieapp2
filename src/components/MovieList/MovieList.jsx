import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]); //필터링한 영화데이터
  const [minRating, setMinRating] = useState(0); //평점
  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=a052248bc1c540aa3eb5e214e2efd1cc&language=ko"
    );
    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results); //처음엔 모든 영화를 입력
  };
  const handleFilter = (rate) => {
    setMinRating(rate); //평점을 업데이트
    //필터함수로 영화평점이 지정한 평점보다 높은 경우에만 남김
    const filtered = movies.filter((movie) => movie.vote_average >= rate);
    setFilterMovies(filtered);
  };
  //시작시 한번 영화를 불러옴
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          인기순 <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li
              onClick={() => handleFilter(8)}
              className="movie_filter_item active"
            >
              8+ Star
            </li>
            <li onClick={() => handleFilter(7)} className="movie_filter_item">
              7+ Star
            </li>
            <li onClick={() => handleFilter(6)} className="movie_filter_item">
              6+ Star
            </li>
          </ul>

          <select name="" id="" className="movie_sorting">
            <option value="">SortBy</option>
            <option value="">Date</option>
            <option value="">Rating</option>
          </select>
          <select name="" id="" className="movie_sorting">
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}
