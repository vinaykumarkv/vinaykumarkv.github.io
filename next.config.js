const repoName = "vinaykumarkv.github.io";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";

module.exports = {
  output: "export",
  transpilePackages: ["lucide-react"],
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
};
