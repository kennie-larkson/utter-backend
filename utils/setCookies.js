function setCookie(res, _id) {
  try {
    res.cookie("_id", _id, { maxAge: 180000, httpOnly: true });
    console.log("Cookie has been set");
  } catch (error) {
    console.log(`Cookie was not set : ${error}`);
    res.status(400).send('Cookie was not set')
  }
}

export default setCookie;
