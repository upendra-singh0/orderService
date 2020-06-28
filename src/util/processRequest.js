export default (req) => ({
  data: req.body,
  queryParams: req.query,
  pathParams: req.params,
});
