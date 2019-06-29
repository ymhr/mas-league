import { createContext } from 'react';
const FirebaseAuthContext = createContext<firebase.auth.Auth | null>(null);

export default FirebaseAuthContext;
