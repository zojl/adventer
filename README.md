# Adventer — bot that helps you to create your own advent calendars
### Prerequisites:
* You'll need a docker with docker compose

### Setup:
1. Set your timezone, your secret command (helps you to view tomorrow gift and its location) and telegram token in `.env` file
2. Fill the `conf/hints.json` with your data. Use `yyyy-mm-dd` format for dates.
Also feel free to translate messages and commands (defined in the first lines of app/bot.js), if you need
3. Start it with `docker compose up -d`

You can read more about this project [in my blog](https://danis.one/advient-svoimi-rukami-v-xxi-veke/)