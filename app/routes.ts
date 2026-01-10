import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

// export default [
//   layout("./layouts/public-layout.tsx", [
//     index("./routes/home.tsx"),
//     route("login", "routes/auth/login.tsx"),
//     route("sign-up", "routes/auth/sign-up.tsx"),
//     route("forgot-password", "routes/auth/forgot-password.tsx")
//   ]),
// ] satisfies RouteConfig;

export default [
  // Public Routes (Accessible by everyone)
  layout("./layouts/public-layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
    route("forgot-password", "routes/auth/forgot-password.tsx"),

    // Protected Routes (Require Login)
    layout("./layouts/protected-layout.tsx", [
      index("./routes/home.tsx"),
      // Add other protected routes here like "dashboard", "settings", etc.
    ]),
  ]),
] satisfies RouteConfig;