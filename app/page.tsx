'use client';

import React, { useState, FormEvent } from 'react';

import { Button } from "@/components/ui/button"

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/getApiKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setApiKey(data.apiKey);
        console.log(data.apiKey);
      } else {
        throw new Error(data.error || 'Failed to get API key');
      }
    } catch (error) {
      console.error('Error getting API key:', error);
    }
  };

  return (
    <div className="container mt-9 mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Get X API Key</h1>
      <p className="mt-9 text-center"><strong>Fill out the form below to get your API key.</strong></p>
      <p className="mt-9 text-center">This website uses your twitter credentials to generate an api key - the api key can be used to access your account remotely.</p>
      <p className="mt-9 text-center"><strong>If you ever want to invalidate this key, just change your password.</strong></p>
      <p className="text-center">Avoid generating too many keys or X will consider it spam.</p>
      <p className="mt-9 text-center">No one of this is stored if you don't store it.</p>
      <p className="mt-9 mb-9 text-center">(don't take my word for it - read the website code <a href="https://github.com/xonack/x-api-key-nextjs"><u>here</u></a>)</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <Button type="submit" variant="default">Get API Key</Button>
      </form>
      {apiKey && (
        <div className="mt-9">
          <h2 className="text-xl font-bold">API Key:</h2>
          <p className="mt-2 p-2 rounded break-words">{apiKey}</p>
        </div>
      )}
    </div>
  );
}