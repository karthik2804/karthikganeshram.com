---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}

# Add one or more: workcation | offsite | holiday | cycling | hiking | conference
activities:
  - "cycling"
country: "France"

description: "Short 1-2 sentence overview of this journey."

# Primary pin (for global map overview)
latitude: 48.0794
longitude: 7.3585
location: "Colmar, France"

# Cycling waypoints & route path (latitude, longitude)
locations:
  - name: "Start City"
    latitude: 48.9566
    longitude: 4.3644
  - name: "End City"
    latitude: 48.0794
    longitude: 7.3585

# Optional polyline path coordinates: [lat, lng]
route:
  - [48.9566, 4.3644]
  - [48.0794, 7.3585]

draft: true
---

Write notes about your trip here...
