import { RouteOptions } from "./types";

class Routes {
  private withQuery(path: string, options?: RouteOptions) {
    if (!options || Object.keys(options).length === 0) {
      return path;
    }

    let url = path;

    if (options.query) {
      const query = new URLSearchParams();
      for (const [key, value] of Object.entries(options.query)) {
        if (Array.isArray(value)) {
          value.forEach((child) => query.append(key, child));
        } else {
          query.append(key, value);
        }
      }
      url += `?${query.toString()}`;
    }

    if (options.fragment) {
      url += `#${encodeURIComponent(options.fragment)}`;
    }

    return url;
  }

  private entries() {
    return "/entries";
  }

  home(options?: RouteOptions) {
    return this.withQuery("/", options);
  }

  login(options?: RouteOptions) {
    return this.withQuery("/login", options);
  }

  register(options?: RouteOptions) {
    return this.withQuery("/register", options);
  }

  verifyEmail(options?: RouteOptions) {
    return this.withQuery("/verify-email", options);
  }

  profile(options?: RouteOptions) {
    return this.withQuery("/profile", options);
  }

  search(options?: RouteOptions) {
    return this.withQuery("/search", options);
  }

  entry(entryId: number, options?: RouteOptions) {
    return this.withQuery(`${this.entries()}/${entryId}`, options);
  }

  entryEdit(entryId: number, options?: RouteOptions) {
    return this.withQuery(`${this.entries()}/${entryId}/edit`, options);
  }

  entryCreate(options?: RouteOptions) {
    return this.withQuery(`${this.entries}/create`, options);
  }

  tags(options?: RouteOptions) {
    return this.withQuery("/tags", options);
  }
}

export const routes = new Routes();
