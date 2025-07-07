import { useState } from 'react';
import { login, register } from '../../services/auth';
import { useRouter } from 'next/router';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      await register(username, password);
      alert("Registered! Now login.");
      setIsRegister(false);
    } else {
      await login(username, password);
      router.push('/board');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      <p onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New user? Register'}
      </p>
    </form>
  );
}
