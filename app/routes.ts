import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/public-layout.tsx", [
    index("./routes/home.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
    route("forgot-password", "routes/auth/forgot-password.tsx")
  ]),
] satisfies RouteConfig;
