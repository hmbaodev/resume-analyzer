import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/public-layout.tsx", [
    index("./routes/home.tsx"),
    route("sign-in", "routes/auth/sign-in.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx")
  ]),
] satisfies RouteConfig;
