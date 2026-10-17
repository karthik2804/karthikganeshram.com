# karthikganeshram.com

My personal website which is hosted [here](https://karthikganeshram.com).

## Building

Install dependencies with `npm install`, then run `npm start` for local development.

Use `npm run check` for the same warning-free production build used to validate changes.

## Publishing a post

Create a draft with `hugo new blog/reflections/2026/my-post.md` (change the category folder, year, and filename as needed). Edit its title, date, description, category, and optional cover image. Set `draft: false` when it is ready to publish. Put cover images in `static/` and use a path such as `/my-post.jpg`. Add `header_image_alt` when the cover conveys information beyond the post title.

## Updating the reading list

Edit the `books` entries at the top of `content/reading.md`. Each book has a `status` of `reading`, `want`, or `finished`; finished books can also have a `year`. Change one status to move a book to another section.

## Adding a travel note

Run `hugo new travel/my-new-trip.md`, then edit the title, date, country, activities, description, and story. Add an optional `places` list to show stops in order, and an optional `cover_image` from `static/`. Set `draft: false` to publish. No coordinates are needed; see [the travel guide](content/travel/README.md) for an example.

For cycling trips, add `strava_activities` with a title and public activity URL for each ride you want to link. The trip page will show them automatically.

## Adding a recipe

Keep the recipe collection meat- and fish-free; egg recipes are included.

Run `hugo new recipes/my-recipe.md`. Set `category` to `Cooking`, `Cookies`, or `Desserts`. Cookies and desserts appear together under **Sweet things**; any other category appears under **More recipes**. You can add a short `recipe_type` label such as `Indian cooking` or `Air fryer`. Fill in `ingredients` and write the method below the frontmatter. Prep time, cook time, servings, and an image from `static/` are optional. Set `draft: false` when the recipe is ready to appear on `/recipes/`.

For recipes with separate parts, use `ingredient_groups` instead of `ingredients`; each group has a `name` and an `items` list. Leave `draft: true` while you are still writing the recipe.

The recipe page can be searched by title, description, recipe label, and ingredients, then narrowed by category or eggless availability. Set `eggless: true` for a recipe that can be made without eggs, including one with an eggless variation, so it appears in the eggless filter.
