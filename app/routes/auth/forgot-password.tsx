import type { Route } from "./+types/forgot-password";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Resumind | Forgot Password" }];
}

const ForgotPassword = () => {
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword