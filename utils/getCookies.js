function getCookies(req, cookieName) {
    const myCookie = req.cookies[cookieName]
  if(myCookie) {
    console.log(`Cookie found : ${myCookie}`)
    return myCookie
  }else {
    console.log('No cookie found')
    return
  }
}

export default getCookies;