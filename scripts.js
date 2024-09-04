/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"1oaCBxd7s6KmzSwX","label":"College","bookmarks":[{"id":"3u4yWvo38VOYeGza","label":"Classroom","url":"https://classroom.google.com/u/3/?pli=1"},{"id":"XCCrDkaRJ12Yfg7o","label":"localhost","url":"http://localhost/phpmyadmin/index.php?route=/database/structure&db=faculty_data"},{"id":"nP7W7RsyJw7mkTl5","label":"Gmail","url":"https://mail.google.com/mail/u/2/#inbox"}]},{"id":"dtrvLFFLFnrQjkG2","label":"Coding","bookmarks":[{"id":"82w1knOLi8eXsGLz","label":"GitHub","url":"https://github.com/"},{"id":"ofNYK1iWv2WXQk7D","label":"ChatGPT","url":"https://chatgpt.com/?oai-dm=1"},{"id":"DNZqAsQIJVGCnil5","label":"BlackBox","url":"https://www.blackbox.ai/"},{"id":"Bz71CEQ9UFYwvn0Y","label":"DSA","url":"https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"}]},{"id":"5Cc7gCky2uNaU6Fv","label":"smth","bookmarks":[{"id":"jcnDu8UQkbnfGT9j","label":"Letterboxd","url":"https://letterboxd.com/Sanatan_dive/"},{"id":"vKx2DoVwiJUJugVQ","label":"GoodReads","url":"https://www.goodreads.com/"},{"id":"98fzSFAqJjfWGRJc","label":"Reddit","url":"https://www.reddit.com/"}]},,{"id":"i9omsaxoVWK4oT6w","label":"entertainment","bookmarks":[{"id":"DpLqzmkY5MRtLT08","label":"Twitter","url":"https://x.com/home"},{"id":"kUHGSDQaey4uoGG8","label":"Amazon","url":"https://www.amazon.in/"},{"id":"uemzWv4PgtifncYo","label":"Monkeytype","url":"https://monkeytype.com/"},{"id":"kS0LvOAhRcIaI9PS","label":"Pinterest","url":"https://monkeytype.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
