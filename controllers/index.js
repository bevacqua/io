import links from '../dat/buildfirst/links.json'

function expand (req, res, next) {
  var key = req.params.key
  var link = links[key]
  if (link){
    to(link.url)(req, res, next)
    return
  }
  next()
}

function to (url, status) {
  return (req, res) => res.status(status || 302).redirect(url)
}

export default function (app) {
  app.get('/consulting', to('mailto:consulting@bevacqua.io'))
  app.get('/blog', to('http://ponyfoo.com'))
  app.get('/career', to('http://careers.stackoverflow.com/bevacqua'))

  // TODO: turn this into a view highlighting some projects
  app.get('/opensource', to('https://github.com/bevacqua'))

  app.get('/code', to('https://github.com/bevacqua'))
  app.get('/github', to('https://github.com/bevacqua/bevacqua.io'))
  app.get('/stackoverflow', to('http://stackoverflow.com/users/389745/nico'))
  app.get('/twitter', to('https://twitter.com/nzgb'))
  app.get('/bf', to('/buildfirst', 301))
  app.get('/bf/resources', to('/buildfirst/resources', 301))
  app.get('/bf/:key', expand, to('/buildfirst/resources'))

  app.get('/buildfirst/resources', require('./buildfirst/resources'))
}
