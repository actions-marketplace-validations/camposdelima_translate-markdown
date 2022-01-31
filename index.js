const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { join, basename, dirname } = require("path");
const core = require("@actions/core");
const $ = require("@k3rn31p4nic/google-translate-api");
const unified = require("unified");
const parse = require("remark-parse");
const stringify = require("remark-stringify");
const visit = require("unist-util-visit");
const simpleGit = require("simple-git");
const git = simpleGit();

const toAst = (markdown) => {
  return unified().use(parse).parse(markdown);
};

const toMarkdown = (ast) => {
  return unified().use(stringify).stringify(ast);
};

const mainDir = core.getInput("PATH") || ".";
let README = readdirSync(mainDir).includes("readme.md")
  ? "readme.md"
  : "README.md";
const lang = core.getInput("LANG") || "pt";
const filepath = (core.getInput("FILEPATH") || join(mainDir, README));
console.log(`FILEPATH: ${filepath}`);
let newFilepath = join(dirname(filepath), `${basename(filepath)}.${lang}.md`);
console.log(`NEW FILE PATH: ${filepath}`);
const readme = readFileSync(filepath, { encoding: "utf8" });
const readmeAST = toAst(readme);
console.log("AST CREATED AND READ");

let originalText = [];

visit(readmeAST, async (node) => {
  if (node.type === "text") {
    originalText.push(node.value);
    node.value = (await $(node.value, { to: lang })).text;
  }
});

const translatedText = originalText.map(async (text) => {
  return (await $(text, { to: lang })).text;
});

async function writeToFile() {
  await Promise.all(translatedText);
  writeFileSync(
    newFilepath,
    toMarkdown(readmeAST),
    "utf8"
  );
  console.log(`${newFilepath} written`);
}

async function commitChanges(lang) {
  console.log("commit started");
  await git.add("./*");
  await git.addConfig("user.name", "github-actions[bot]");
  await git.addConfig(
    "user.email",
    "41898282+github-actions[bot]@users.noreply.github.com"
  );
  await git.commit(
    `docs: Added ${basename(filepath)}.${lang}.md translation via https://github.com/camposdelima/translate-markdown`
  );
  console.log("finished commit");
  await git.push();
  console.log("pushed");
}

async function translateReadme() {
  try {
    await writeToFile();
    await commitChanges(lang);
    console.log("Done");
  } catch (error) {
    throw new Error(error);
  }
}

translateReadme();
