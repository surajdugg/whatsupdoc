# WhatsUpDoc
WhatsupDoc is a lightweight document signing app built with React.js and Next.js

## Installation
Create a project folder.

` mkdir document-sign && cd document-sign `

Clone the repo to your local machine inside the document-sign folder.

`git clone git@bitbucket.org:pixelmatter/document-sign.git .`

Use the package manager yarn to install.

`yarn install`
Or use the package manager npm to install.

`npm install`

## Usage

This project uses next.js. The main entry file is in ./pages/index.tsx. This is for next.js to server-side render the page and create a route /.

The container <App /> is wrapped inside this page and is our main application code. This makes it easy to drop next.js and not dependant on it.

 ./pages/index.tsx
```
import Head from "next/head";
import App from "../src/containers/App";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </>
  );
}

```
You will see that each component in the app is made purely with functional components.

## App.tsx
App.tsx is the main component that sets up the general layout for the app. Below is the structure of the app at a high level. The component tree is a mix of functional components and styled components

./src/App.tsx
```
<Container>
  <SidebarView />
  <main>
    <Toolbar />
    <DocumentsView />
  </main>
</Container>
```

### Container
Container is a styled component that is a flex-box. Its job is to set the sidebar and the main component side by side.

### SidebarView
The sidebar

### Main
The main wrapper which handles document scrolling and semantics.

### Toolbar
The top component which contains actions. The two main actions are the tools the user can select from and the ability to export.

### DocumentsView
This is where all the fancy UX stuff happens. I will elaborate on this soon.

### Modal
Will elaborate more soon

### More Documentation
Using TypeDoc I have generated more in depth documentation for this project. Look inside the /docs folder. Find the index.html, right click the file and open with Chrome. From there you will see the typescript generated documentation.
