import HelpArticleContent from "./components/HelpArticleContent";

const VendorProductPage = async ({
  params,
}: {
  params: Promise<{
    articleId: string;
  }>;
}) => {
  const { articleId } = await params;

  return (
    <div className="container mx-auto px-4 py-8 mb-28">
      {articleId && <HelpArticleContent articleId={articleId} />}
    </div>
  );
};

export default VendorProductPage;
