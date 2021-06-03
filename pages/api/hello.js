// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/131631?api_key=2accc2f0de9255effef68a764c9fbee2&append_to_response=videos,alternative_titles`
  );
  const data = await movies.json();
  res.status(200).json(data);
};
