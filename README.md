<h1 align="center">
   <img
        alt="PlantManager"
        title="PlantManager"
        src=".github/logo.svg"
        width="300"
    />
</h1>

<p align="center">
  <a href="https://github.com/carloseduardobanjar" target="_blank">
    <img src="https://img.shields.io/badge/author-carloseduardobanjar-32b768" alt="Author">
  </a>

  <img src="https://img.shields.io/badge/license-MIT-%2332B768" alt="License">
  
  <img src="https://img.shields.io/github/forks/carloseduardobanjar/plantmanager?color=32b768" alt="Forks">     

  <img src="https://img.shields.io/github/stars/carloseduardobanjar/plantmanager?color=32b768" alt="Stars">
</p>

> Plant manager to help you remember to take care of your plants according to each type of plant. Organized by [Rocketseat](https://rocketseat.com.br/).

## 🔗 Table of contents
- [Functionalities](#functionalities)
- [Technologies](#technologies)
- [Installation](#installation)
- [Getting start](#start)
- [License](#license)

## 🔨 Functionalities <a name="functionalities"/>
- Authentication
- Notification
- Dark mode
- Autocomplete
- Search filter
- Save and remove data

## 📌 Technologies <a name="technologies"/>

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://expo.io/)
- [Styled Components](https://styled-components.com/)

## 📂 Installation <a name="installation"/>

First of all, it is important that you have installed [Yarn](https://yarnpkg.com/) and [Expo](https://expo.io/).

So, run this command in terminal to clone the project via HTTPS:

```bash
git clone https://github.com/carloseduardobanjar/plantmanager.git
```

**Install dependencies**

```bash
yarn install
```

## 🚀 Getting started <a name="start"/>

First, you have to install Expo App on your smarthphone.

So, run the following command in terminal:

```bash
# Start the server
expo start
```

With Expo open on your smarthphone, scan the QR Code of Expo Server.

**Run API**

First, make sure to enter your IP address in following file:

```bash
./src/services/api.ts
```

So, run the following command in another terminal:

```bash
yarn json-server ./src/common/services/server.json --host YOUR_IP_ADDRESS --port 3333
```

## 📕 License <a name="license"/>

PlantManager is [MIT licensed](https://choosealicense.com/licenses/mit/).
