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

Run `hugo new recipes/my-recipe.md`. In the new file, set a category such as `Breakfast`, `Mains`, `Baking`, or `Drinks`; recipes are grouped by category automatically. Fill in the `ingredients` list and write the method below the frontmatter. Prep time, cook time, servings, and an image from `static/` are optional. Set `draft: false` when the recipe is ready to appear on `/recipes/`.
