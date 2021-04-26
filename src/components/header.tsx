import { useAuth } from "@/context/auth";

export default function Header(): JSX.Element {
  const { user, signInWithGithub, signOut } = useAuth();

  return (
    <header className="px-3 mx-auto max-w-screen-xl">
      <button type="button" onClick={signInWithGithub}>
        Sign In
      </button>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>

      {user && <p>{user.email}</p>}
    </header>
  );
}
