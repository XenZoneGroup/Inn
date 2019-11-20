import * as React from 'react';

import './styles.scss';

interface Quote {
  name: string;
  description: string;
  content: string;
}

const quotes: Quote[] = [
  {
    name: 'Jessie',
    content: "It means a lot to know Kooth is there even if others can't be",
    description: '12 years old',
  },
  {
    name: 'Leon',
    content: 'Thank you so much, I was talking to my friend about how you were such a great counsellor, and advised her to talk to you.',
    description: '16 years old',
  },
  {
    name: 'Harry',
    content: 'It\'s really helped to feel like a weight has lifted',
    description: '17 years old',
  }
];

interface KoothQuotesProps {
  quotes: Quote[];
}

interface QuoteItemProps {
  quote: Quote;
  index: number;
}

const QuoteItem : React.FC<QuoteItemProps> = ({ quote, index }) => {
  return (
    <li key={ index }>
      <span className="quote-content">{ quote.content }</span>
      <span className="quote-by-line">{ quote.name } - { quote.description }</span>
    </li>
  )
}

const KoothQuotes: React.FC<KoothQuotesProps> = ({ quotes }) => {
  return (
    <section className="content-box quotes">
      <div className="content-box-container">
        <h2>How Kooth helps people</h2>
        <ul>
          { quotes.map((q : Quote, i : number) => <QuoteItem key={i} quote={q} index={i} />) }
        </ul>
      </div>
    </section>
  );
};

export {
  KoothQuotes,
  quotes
}
