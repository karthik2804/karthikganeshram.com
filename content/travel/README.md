---
build:
  render: never
  list: never
---

# Adding a travel note

Create a draft from the project root:

```bash
hugo new travel/my-new-trip.md
```

Edit the new file in `content/travel/`. The fields you need are the title, date, country, one or more activities, and a short description. Write the story below the second `---`. Set `draft: false` when it is ready to publish.

If you know only the month or year, use the first day of that period in `date` for sorting and set `date_precision: "month"` or `date_precision: "year"`. The site then displays only the known part of the date. For example, a trip in June 2022 can use `date: 2022-06-01` and `date_precision: "month"`.

For a trip with several places, add names in visit order:

```yaml
places: ["Ghent", "Knokke-Heist", "Bruges", "Ghent"]
```

The page shows these as a simple sequence. A single-place note can use one name or leave `places` empty. No map coordinates are needed.

An optional cover photo makes the journal card and note more visual. Put the image in `static/`, then add:

```yaml
cover_image: "/my-trip.jpg"
cover_image_alt: "A short description of the photo"
```

Without a photo, the journal card uses a colored country panel. Common activity labels are `workcation`, `offsite`, `holiday`, `cycling`, `hiking`, `camping`, and `conference`. Use `travel` if the purpose of a trip is not recorded yet.

## Linking cycling rides on Strava

Copy each ride's link from Strava and add it to the trip's frontmatter. You can list several rides for one vacation:

```yaml
strava_activities:
  - title: "Ghent to Bruges coastal loop"
    url: "https://www.strava.com/activities/1234567890"
  - title: "Another day on the bike"
    url: "https://www.strava.com/activities/2345678901"
```

The links appear on the trip page. Leave the field out for trips without recorded rides. The linked activity must be visible to visitors who open it; check its Strava privacy setting before sharing. No Strava API keys or automatic sync are needed.

For a longer note, write ordinary Markdown below the frontmatter. The `travel-callout`, `travel-day`, `travel-gallery`, and `travel-stat` shortcodes are also available. For example:

```go-html-template
{{</* travel-gallery images="/one.jpg,/two.jpg" alt="Cycling beside the coast" */>}}
```
