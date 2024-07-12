import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the RAG Application</h1>
      <nav>
        <ul>
          <li>
            <Link href="/ingest">Ingest Data</Link>
          </li>
          <li>
            <Link href="/rag">Generate Response</Link>
          </li>
          <li>
            <Link href="/auth/signup">Sign Up</Link>
          </li>
          <li>
            <Link href="/payment">Make a Payment</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
