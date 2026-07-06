const repoName = "vinaykumarkv.github.io";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const isUserPagesSite = repoName.endsWith(".github.io");
const pagesBasePath = isGithubPages && !isUserPagesSite ? `/${repoName}` : "";

module.exports = {
  output: "export",
  transpilePackages: ["lucide-react"],
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath,
  images: {
    unoptimized: true,
  },
};
