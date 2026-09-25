---
build:
  render: never
  list: never
---

# Travel Log Maintenance Guide

Adding and maintaining travel notes on your website is simple and automated.

## 1. Add a New Travel Entry
Run this command in your terminal from the project root:

```bash
hugo new travel/my-new-trip.md
```

This generates a pre-formatted markdown file in `content/travel/` pre-loaded with template metadata.

## 2. Edit Frontmatter Metadata

Open the generated markdown file and fill in your details:

```yaml
---
title: "Rotterdam → Amsterdam Coastal Ride"
date: 2026-08-06

# Add one or more: workcation | offsite | holiday | cycling | hiking | conference
activities: ["holiday", "cycling"]
country: "Netherlands"
description: "Coastal dune ride along the North Sea."

# Main map pin for global map overview
latitude: 52.0705
longitude: 4.3007
location: "The Hague, Netherlands"

# Optional sub-locations & route path for cycling/tours
locations:
  - name: "Rotterdam"
    latitude: 51.9244
    longitude: 4.4777
  - name: "The Hague"
    latitude: 52.0705
    longitude: 4.3007
  - name: "Amsterdam"
    latitude: 52.3676
    longitude: 4.9041

route:
  - [51.9244, 4.4777]
  - [52.0705, 4.3007]
  - [52.3676, 4.9041]

draft: false
---

Write your trip story or reflections here...
```

Use one or more values in `activities`. The current set is `workcation`, `offsite`, `holiday`, `cycling`, `hiking`, and `conference`; new values automatically become filter buttons.

## 3. How the Map Works

- The SVG overview groups entries by country and links to every journey in that country.
- A journey page draws its route from `locations` and `route`.
- Entries without usable coordinates remain in the journal list and are omitted from the map.
- The coastline is generated from Natural Earth 1:110m land data. To refresh it, download `ne_110m_land.geojson` and run:

  ```bash
  node scripts/generate-world-map.mjs ne_110m_land.geojson themes/karthik-www-theme/layouts/partials/world-map-land.html
  ```

## 4. Optional Story Components

Use the `travel-callout`, `travel-day`, `travel-gallery`, and `travel-stat` shortcodes to structure longer entries. Add meaningful `alt` text when using a gallery:

```go-html-template
{{</* travel-gallery images="/one.jpg,/two.jpg" alt="Cycling beside the coast" */>}}
```
