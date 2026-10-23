# Enterprise Application Development — rewritten bite-sized lessons

55 lessons that replace the Copilot-generated files of the same names in:
src/content/docs/lessons/enterprise-application-development/

Same folder names and file names are used, so copying this tree over the repository overwrites those lessons in place.
Module index.md files, the course overview and csharp-basics-and-blazor.md are not touched.

Differences from the previous set:
- fuller explanations, with the pitfall each lesson teaches
- expected output hand-checked against the fixtures
- relative links between lessons (no leading slash), so they work under the /SDEV-Resources base path
- lesson numbers match the titles ("12. Lambdas and Where")

Not done in this environment: the Astro build, and compiling the C# / Razor snippets. Run `npm run build`
and paste each fixture into a throwaway console project before publishing.
