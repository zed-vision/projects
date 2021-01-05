import versions from "@zedvision/code/dist/versions";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const v = versions();
  const url = new URL(request.url);
  const { searchParams, pathname } = url;

  const cache = caches.default;
  //  await cache.delete(request)
  let response = await cache.match(request);

  if (
    !response ||
    response.url !==
      `https://unpkg.com/@zedvision/code@${v.code}/ipfs.html`
  ) {
    response = await fetch(
      `https://unpkg.com/@zedvision/code@${v.code}/ipfs.html`,
    );
    await cache.put(request, response.clone());
  }
  if (response.status > 399) {
    response = new Response(response.statusText, { status: response.status });
  }
  return response;
}
