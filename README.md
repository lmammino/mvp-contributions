# mvp-contributions

Automates contribution submissions to the Microsoft MVP (Most Valuable Professional) portal.

Status: **Alpha quality** (manually tested, bugs are expected)

## Rationale

The MVP website is slow and it's tedious to submit a lot of stuff by hand. This tool should be able to automate most of the hard work.


## Authentication

Go to your browser of choice and head to [mvp.microsoft.com](https://mvp.microsoft.com/). Do a login. Inspect your cookies and copy the value for the cookie `.AspNet.Cookies`.


## Usage

- Clone
- run `npm i`
- populate the sample `content.yml` with your content
- run `npm start -- content.yml <your_session_cookie>` (replace `<your_session_cookie>` with your actual cookie). Alternatively, the session cookie can also be specified using the `MVP_COOKIE` environment variable (recommended).


## Automation

The goal of this project is to be able to come up with ways of fetching all the content activities from one or more sources and convert them to the expected YAML contribution format.

Some examples are available on how you might be able to fetch and convert data from various sources:

  - [YouTube videos from a channel](/docs/automation/youtube.md)


Feel free to submit your examples here.


## Schema

TODO: describe schema for `content.yml`





## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/mvp-contributions/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.