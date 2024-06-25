import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useState } from "react";
import _ from "lodash";

export default function MovieList({ type, title, emoji }) {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]); //필터링한 영화데이터
  const [minRating, setMinRating] = useState(0); //평점
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=a052248bc1c540aa3eb5e214e2efd1cc&language=ko`
    );
    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results); //처음엔 모든 영화를 입력
  };
  const handleFilter = (rate) => {
    if (minRating === rate) {
      setMinRating(0); //평점을 0점 이상으로
      setFilterMovies(movies); // 처음으로 되돌림(모든 영화)
    } else {
      setMinRating(rate); //평점을 업데이트
      //필터함수로 영화평점이 지정한 평점보다 높은 경우에만 남김
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };
  const handleSort = (e) => {
    const { name, value } = e.target; //옵션값이 바뀌면 이벤트객체로 이름과 값을 가져옴
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  console.log(sort);
  //시작시 한번 영화를 불러옴
  useEffect(() => {
    fetchMovies();
  }, []);
  //sort값이 업데이트 될때마다 정렬
  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]);
  return (
    <section className="movie_list" id={`${type}`}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title} <img src={emoji} alt="fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li
              onClick={() => handleFilter(8)}
              className={
                minRating === 8
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
            >
              8+ Star
            </li>
            <li
              onClick={() => handleFilter(7)}
              className={
                minRating === 7
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
            >
              7+ Star
            </li>
            <li
              onClick={() => handleFilter(6)}
              className={
                minRating === 6
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
            >
              6+ Star
            </li>
          </ul>

          <select
            name="by"
            id="by"
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id="order"
            onChange={handleSort}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
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
