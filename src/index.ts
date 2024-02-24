import { Hono } from 'hono'

const getContent = (element: Element): string => {
  return element.getAttribute("content") ?? "";
}

const app = new Hono()

app.get('/api/ogp', async (c) => {
  const siteUrl = c.req.query('url');
  if (!siteUrl) {
    return c.body('url query is required', 400)
  }

  const sitePage = await fetch(decodeURIComponent(siteUrl));
  if (!sitePage.ok) {
    return c.body('Not found site page', 404)
  }

  const responseBody = {
    title: '',
    description: '',
    image: '',
    siteName: '',
  }

  await new HTMLRewriter().on("meta[property^='og:']", { element: (element: Element): void => {
    switch (element.getAttribute("property")) {
      case "og:title":
        responseBody.title = getContent(element);
        break;
      case "og:description":
        responseBody.description = getContent(element);
        break;
      case "og:image":
        responseBody.image = getContent(element);
        break;
      case "og:site_name":
        responseBody.siteName = getContent(element);
    }
  }}).transform(sitePage).text();

  c.header('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600, stale-if-error=3600');
  return c.json(responseBody);
})

export default app
