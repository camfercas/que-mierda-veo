export default async function handler(req, res) {
  const { type, query } = req.query;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.THEMOVIEDB_API_KEY}&query=${query}&language=es-MX&page=1&include_adult=false`
  );
  const data = await response.json();
  if (data?.results) {
    let results = [];
    data.results
      .sort(function (a, b) {
        return b.popularity - a.popularity;
      })
      .slice(0, 5)
      .map(({ id, name, title, profile_path, poster_path, release_date }) => {
        if (name) {
          results.push({
            id,
            name,
            img: process.env.THEMOVIEDB_URL + profile_path,
          });
        } else {
          const year = new Date(release_date).getFullYear();
          results.push({
            id,
            name: title,
            img: process.env.THEMOVIEDB_URL + poster_path,
            year,
          });
        }
      });
    res.status(200).json(results);
  } else {
    res.status(500).json({
      error: "No se encontraron datos.",
    });
  }
}
