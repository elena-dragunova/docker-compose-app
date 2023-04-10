const routes = {
  '/auth/login': {
    'handler': 'auth',
    'action': 'login'
  }
}

class Router {
    static find(path) {
      for (let route in routes) {
        if (path === route) return routes[route];
      }
      return false;
    }
  }
  
module.exports = Router;