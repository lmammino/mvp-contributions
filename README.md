# mvp-contributions

Automates contribution submissions to the Microsoft MVP (Most Valuable Professional) portal.

Status: ⚠️ **Work in progress**

## Rationale

The MVP website is slow and it's tedious to submit a lot of stuff by hand. This tool should be able to automate most of the hard work


## Authentication

Go to your browser of choice and head to [mvp.microsoft.com](https://mvp.microsoft.com/). Do a login. Inspect your cookies and copy the value for the cookie `.AspNet.Cookies`.


## Usage

- Clone
- run `npm i`
- populate the sample `content.yml` with your content
- run `npm start -- content.yml <your_session_cookie>` (replace `<your_session_cookie>` with your actual cookie)


## Schema

TODO: describe schema for `content.yml`


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/mvp-contributions/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.