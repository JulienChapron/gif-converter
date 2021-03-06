# Gif-converter

<a href="https://github.com/JulienChapron/gif-converter/main/LICENSE">
 <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="gif-converter is released under the Public License v3.0." />
</a>

[![Total alerts](https://img.shields.io/lgtm/alerts/g/JulienChapron/gif-converter.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JulienChapron/gif-converter/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/JulienChapron/gif-converter.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JulienChapron/gif-converter/context:javascript)
![Known Vulnerabilities](https://snyk.io/test/github/JulienChapron/gif-converter/badge.svg)
[![Code Climate](https://codeclimate.com/github/JulienChapron/gif-converter/badges/gpa.svg)](https://codeclimate.com/github/JulienChapron/gif-converter)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d5e1dd566dcd49ee9de2a5cbd0f05b7f)](https://www.codacy.com/gh/JulienChapron/gif-converter/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JulienChapron/gif-converter&amp;utm_campaign=Badge_Grade)

## Application

![alt text](https://raw.githubusercontent.com/JulienChapron/gif-converter/main/readme/gif-converter-1.png)
![alt text](https://raw.githubusercontent.com/JulienChapron/gif-converter/main/readme/gif-converter-2.png)

## Project Description
Application to convert videos to gif using web assembly

## Tech Stack
![image](https://img.shields.io/badge/react.js-FFFFFF?style=for-the-badge&logo=react&logoColor=blue)
![image](https://img.shields.io/badge/mui-FFFFFF?style=for-the-badge&logo=mui&logoColor=blue)
![image](https://img.shields.io/badge/web_assembly-FFFFFF?style=for-the-badge&logo=webassembly&logoColor=purple)

## Installation
### First step

Create a .env file, generate a token here https://developer.chrome.com/origintrials/#/trials/active to autorize SharedArrayBuffers in non-isolated page in Chrome and add this code in .env file:

```env
REACT_APP_ORIGIN_TRIALS=YOURTOKEN
```

### Download and start your app

Download the app:

```bash
git clone https://github.com/JulienChapron/gif-converter.git
```

Start the app:

```bash
cd gif-converter
```

```bash
yarn install && docker build -t gif-converter .
```


