/**
 * Created by jiangyukun on 2017/7/26.
 */
interface List<T> {
  loaded: boolean
  loading: boolean
  hasMore: boolean
  list: T[]
}

export default List
