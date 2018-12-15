let token = null

const blogs = [
  {
    _id:"5c0ea276306fe73ce8e74912",
    title: "paras blogi",
    author: "Juha Ritakoski",
    url: "JuhaRitablogi.com",
    likes: 40000023,
    user: {
      _id: "5c0e6b54a3d1172ae508f464",
      username: "Jhem",
      name: "Juha"
    }
  },
  {
    _id: "5c0ea5c7306fe73ce8e74913",
    title: "tokaks paras blogi",
    author: "Juha Ritakoski",
    url: "www.JuhaBlogikoski.com",
    likes: 19,
    user: {
      _id: "5c0e6b54a3d1172ae508f464",
      username: "Jhem",
      name: "Juha"
    }
  },
  {
    _id: "5c0ea5e1306fe73ce8e74914",
    title: "kolmanneks paras blogi",
    author: "Juha Ritakoski",
    url: "www.RitaBlogiKoski.com",
    likes: 9,
    user: {
      _id: "5c0e6b54a3d1172ae508f464",
      username: "Jhem",
      name: "Juha"
    }
  },
  {
    _id: "5c0fa9b6e7179a2e27066399",
    title: "no user",
    author: "Juha Ritakoski",
    url: "www.JuhaBlogikoski.com",
    likes: 20
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }