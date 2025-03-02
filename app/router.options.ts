export default {
  scrollBehavior(to, from, savedPosition) {
    // If the route has a hash, scroll to the element with that id
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset for fixed header
      }
    }
    
    // If savedPosition exists (browser back/forward), use that
    if (savedPosition) {
      return savedPosition
    }
    
    // Otherwise, scroll to top
    return { top: 0 }
  }
}