# Media Asset Reference

The widgets rely on a consistent set of showcase images stored inside `.src/`. This page documents which image belongs to which guide so you can maintain them easily while migrating to GitBook.

## Primary Visuals

* **Library hero**: `.assets/scriptable_mockup_wall.png`
* **App icon**: `.assets/scriptable_icon.png`

## Widget Previews

| Widget             | Image                         | Relative Path                                    |
| ------------------ | ----------------------------- | ------------------------------------------------ |
| 🌤️ Weather        | `weather_showcase_s.png`      | `.assets/weather/weather_showcase_s.png`         |
| ⏰ Countdown        | `countdow_showcase.png`       | `.assets/countdown/countdow_showcase.png`        |
| 📊 GitHub Stats    | `githubstats_showcase.png`    | `.assets/githubstats/githubstats_showcase.png`   |
| 🎂 Birthday        | `birthday_showcase.png`       | `.assets/birthday/birthday_showcase.png`         |
| 🌬️ AQI            | `openweatheraqi_showcase.png` | `.assets/aqi/openweatheraqi_showcase.png`        |
| 🕉️ Hindu Calendar | `hinduclrwear_showcase.png`   | `.assets/hinduclrwear/hinduclrwear_showcase.png` |
| 💭 Quote           | `quote_showcase_1.png`        | `.assets/quotes/quote_showcase_1.png`            |
| 📚 Schedule        | `schedule_showcase_1.png`     | `.assets/schedule/schedule_showcase_1.png`       |
| ⏳ Time Progress    | `timeprogress_showcase.png`   | `.assets/timeprogress/timeprogress_showcase.png` |
| 🚗 Toyota          | `toyota_l.png`                | `.assets/toyota/toyota_l.png`                    |

## Referencing Images in GitBook

Use GitHub raw links so GitBook always fetches the latest asset:

```
https://raw.githubusercontent.com/rushhiii/Scriptable-IOSWidgets/main/.assets/<folder>/<file>.png
```

Benefits:

* ✅ No manual uploads—images stay version controlled with the code.
* ✅ Fast delivery via GitHub's CDN.
* ✅ Automatic updates when assets change.

## Maintenance Tips

1. **Keep alt text descriptive** so GitBook pages remain accessible.
2. **Compress PNGs/WebP** before committing to keep pages lightweight.
3. **Batch new assets** in `.assets/<widget>/` to stay organized.
4. **Document additions here** whenever you add or rename an image.

With this reference you can cross-check every page before enabling GitHub ↔ GitBook sync and ensure all visuals resolve correctly.
