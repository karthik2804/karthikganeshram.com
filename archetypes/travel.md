---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
country: ""
# If only the month or year is known, use the first day in `date` for sorting
# and set date_precision to "month" or "year" so the site shows only what is known.
# date_precision: "month"
# Choose one or more: workcation, offsite, holiday, cycling, hiking, camping, conference, travel.
activities: []
description: ""
# Optional. Add place names in the order you visited them.
places: []
# Optional. Put the photo in static/ and use a path such as /my-trip.jpg.
# cover_image: "/my-trip.jpg"
# cover_image_alt: "A short description of the photo"
# Optional for cycling notes. Add one entry per public Strava activity.
# strava_activities:
#   - title: "Coastal ride"
#     url: "https://www.strava.com/activities/1234567890"
---

Write your travel note here.
