## Small project made using

<img src=".erb/img/erb-banner.svg" width="100%" />

<br>

i have nothing else to say for now

How to develop

inside src there are two folders

- main
- renderer

Main is the electron part, with node and stuff,
renderer is just a react application.

install all deps using

```
yarn install
```

run this command to start developing

```
yarn start
```

Once everything is set, dont forget to change the project version, or you wont be able to publish your new version.

run this command to just build and check the executable file

```
yarn package
```

run this command to build and publish, default is set to windows, but you can change it on package.json

```
yarn package:publish
```
