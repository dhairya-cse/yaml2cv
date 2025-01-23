# Yaml2cv

### Introduction

Yaml2cv is personal project that streamlines resume creation using yaml and powerful CSS properties for print media.

### Purpose and Inspiration

Formatting resume to make it look nicer is a hard and word is a terrible software to do it! 

Previously I had a great template in LaTeX where I could use some custom commands to create the resume that is not terrible to look at. While I really loved the pdf generated from this template, I felt using LaTeX is a bit of overkill and it looks a bit clunky.

In one of the professional situation, I had to generate PDFs for account statements. I utilised [iText](https://mvnrepository.com/artifact/com.itextpdf/html2pdf) for converting an html page to pdf for the task in hand. It was fun to learn to use CSS to make sure that the pdf looks nice and there aren't any unexpected breaks in paragraphs. 

This inspired me to make a very simple application that utilises the print media related CSS properties to create the resume in pdf format.

### Technology

This project utilises React for reusable components creation and tailwind for styling. While it is possible to do it with a standalone command, I have decided to make it more fun and create a web page with live editing feature.

### Configurations

There are some default configurations specified by `${YAML2CV_DATA}/config.yaml` file which would be used for every resume file.

The configs can also be overridden by defining them in your `resume.yaml` file.

```yaml

```

### Resume file


### Data directory ${YAML2CV_DATA}


### Known limitations


### Future Work
- [ ] Add zoom out effect
- [ ] Add edit and hide button
- [ ] Load file for user and save it
- [ ] Show error gracefully and parse the file only if it is an valid yaml file
- [ ] 