export default class GroupImage {
  constructor(data) {
    this.name = data.alt_description
    this.imageURL = modifyURL(data.urls.regular)
    this.photographer = data.user.name
    this.color = data.color
  }
}
function modifyURL(url) {
  url = url.slice(0, -9)
  url += '100&w=1080'
  return url
}
