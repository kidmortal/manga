import { render } from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './App';

Sentry.init({
  dsn: 'https://6fed25978f5a48fcad32eea7b21877d6@o1086666.ingest.sentry.io/6258371',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

render(<App />, document.getElementById('root'));
