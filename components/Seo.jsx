import Head from 'next/head';

export default function Seo({
  title,
  description = 'Watcher is a web for see popular, top rated, upcoming and new movies',
  image = '/images/background.jpg',
  keywords = 'Movies, Actors, Synopsis, Trailers, Cast',
  path = ''
}) {

  const url = process.env.SITE_URL + path;

  return (
    <Head>
      <title>{title} | Watcher</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />

      {/* OpenGraph */}
      <meta property="og:site_name" content="Watcher" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en" />

      {/* Twitter */}
      <meta name="twitter:site" content="@dapintor8" />
      <meta name="twitter:creator" content="@dapintor8" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
