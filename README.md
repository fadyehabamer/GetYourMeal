<p align='center'>
  <img src='sc.png'>
</p>


# Get Your Meal

Type a meal name and matching recipes from [TheMealDB](https://www.themealdb.com/api.php) appear as you type. Open a result to read its category, instructions and (when available) a YouTube cooking video.

**Live demo:** https://getyourmeal.vercel.app/

## Run locally

Plain HTML/CSS/JavaScript with no build step and no API key (it uses TheMealDB's free test key `1`). Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html`: markup (Font Awesome 5 from cdnjs)
- `main.js`: search (`search.php?s=`) and recipe lookup (`lookup.php?i=`) against TheMealDB
- `style.css`: styles

## License

[MIT](LICENSE)
