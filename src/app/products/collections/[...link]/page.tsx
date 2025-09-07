import Collection from "./Collection";

export default async function Page({
  params,
}: {
  params: Promise<{ link: string[] }>;
}) {
  const { link } = await params;
  console.log("link", link[0]);
  // replace %20 with empty string
  // cut off characters after the first %

  const formatLink = link[0]?.replace(/%20/g, "").split("%")[0];
  console.log("formatLink", formatLink);
  return <Collection  formatLink={formatLink} />;
}
