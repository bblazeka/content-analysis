# content-analysis

This is a web page project for analysis of content on twitter and various news articles. Key intention of this project is to apply web technologies, natural language processing [(NLP)](https://en.wikipedia.org/wiki/Natural_language_processing) to demonstrate connection between social media and news, topics that are popular and places where they are popular. Work on this project is still in progress.

There are two primary ways to represent data:

![Landing](doc/landing.jpg)

- Topic - a term or a personal name, related news and tweets are shown

![Topic](doc/topic.jpg)

- Place - place on Earth, local or relevant news and tweets are shown

![Place](doc/place.jpg)

Every tweet or news article has a link of related terms for an easier navigation. Images of an application are in the root folder of this project.

### Data sources

Most notable APIs used on this project are Mapbox, NewsAPI and Twitter. In addition, some data is fetched from Wikipedia to show Wikipedia summaries for each topic.

No data is stored in a database and therefore there is no need to have an available database. Everything is fetched from above mentioned sources.

### Running

In order to run an application, it is important to install all required packages, make sure all APIkeys are available and stored in proper folder and files. Last step is to run two commands.

in server folder: `flask run`, in web folder: `npm start`