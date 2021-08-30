import Head from 'next/head';
import styled from 'styled-components';
import { useState } from 'react';
import Property from '../components/Property';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 50px auto 30px;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0em 2rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5rem;
  }
`;

const Main = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  overflow: auto;

  & > div {
    overflow: hidden;

    display: flex;
    flex-direction: column;
    height: 100%;

    border: 1px solid #d1d5db;

    header {
      color: #fff;
      padding: 0.5rem;
      background: #6b7280;
    }

    main {
      flex: 1 1 auto;
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`;

const TextArea = styled.textarea.attrs({ id: 'textArea', spellCheck: false })`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-family: inherit;
`;

const Input = styled.div``;

const Output = styled.div`
  margin-left: 10px;
  user-select: none;
  main {
    overflow: auto;
  }
`;

const PropertyWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const initialObject = { name: 'Gordon Freeman' };

export default function Home() {
  const [val, setVal] = useState(JSON.stringify(initialObject, null, 2));
  const [json, setJson] = useState(initialObject);
  const [filter, setFilter] = useState('');

  const change = (val) => {
    console.log('change');
    setVal(val);
    try {
      setJson(JSON.parse(val));
    } catch (e) {
      setJson({ error: e.toString() });
    }
  };

  const formatJSON = () => {
    try {
      console.log(typeof json);
      const parsed = JSON.parse(val);
      setVal(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Head>
        <base href="/" />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>JSON Fiddle - parse, format & inspect json</title>
        <meta name="description" content="Parse, format, filter & inspect json with this online editor" />
        <meta
          name="keywords"
          content="JSON, json, online, editor, filter, inspect, fiddle, parse, parser, pretty, print, pretty print, format, formatter, object, key, val, value, byte"
        />

        <meta name="author" content="Johnny Blomgren, Tommy Wallberg" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimal-scale=1.0, minimal-ui"
        />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:title" content="JSON Fiddle" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="The ultimate tool for parsing, formatting, filtering & inspecting json"
        />
        <meta property="og:site_name" content="JSON Fiddle" />

        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/manifest.json" />
      </Head>
      <Header>
        <h1>JSON Fiddle</h1>
      </Header>
      <Main>
        <Input>
          <header>
            <div onClick={formatJSON}>Format JSON</div>
          </header>
          <main>
            <TextArea value={val} onChange={(e) => change(e.target.value)} />
          </main>
        </Input>
        <Output>
          <header>Result</header>
          <main>
            <PropertyWrapper>
              <Property input={json} filter={filter} />
            </PropertyWrapper>
          </main>
        </Output>
      </Main>
      <Footer>Author: Johnny Blomgren & Tommy Wallberg</Footer>
    </Wrapper>
  );
}
