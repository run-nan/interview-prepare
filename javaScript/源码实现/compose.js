export const compose = (middlewares) => (context, next) => {
    // last called middleware #
    let index = -1
    const dispatch = (i) => {
      if (i <= index) {
        return Promise.reject(new Error(Errors.multipleCalledNextFn()))
      }
      index = i
      let fn = middlewares[i]
      if (i === middlewares.length) {
        fn = next
      }
      if (!fn) {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }