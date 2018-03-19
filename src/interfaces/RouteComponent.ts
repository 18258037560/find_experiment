/**
 * Created by jiangyukun on 2017/11/17.
 */
type RouterLocation = {
  hash: string
  pathname: string
  search: string
  state: any
}

interface RouteComponent {
  history: {
    action: string
    go: (string) => void
    goBack: () => void
    push: (string) => void
    goForward: () => void
    replace: (string) => void
    listen: any
    block: () => void
    location: RouterLocation
    createHref: (location) => any
  }
  location: RouterLocation
  match: {
    path: string
    url: string
    params: any
  }
  staticContext: any
}

export default RouteComponent
