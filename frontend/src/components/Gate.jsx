import { Link } from "wouter";

function Gate() {
  return (
    <>
      <p>You must be logged in to continue.</p>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </>
  )
}

export default Gate;
