export class CookieHelper {

  static getValue(req, res, name, defaultValue) {
    const cookieValue = req.cookies[name];
    const paramValue = req.query[name];

    if (!paramValue && !cookieValue) {
      res.cookie(name, defaultValue);
      return defaultValue;
    }
    if (paramValue && paramValue !== cookieValue) {
      res.cookie(name, paramValue);
      return paramValue
    }

    return cookieValue;
  }
}
